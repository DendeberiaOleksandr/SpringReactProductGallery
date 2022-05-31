package com.dendeberia.productgalleryrestapi.api;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.dendeberia.productgalleryrestapi.api.config.ApiConfig;
import com.dendeberia.productgalleryrestapi.domain.User;
import com.dendeberia.productgalleryrestapi.security.jwt.JwtUtils;
import com.dendeberia.productgalleryrestapi.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static com.dendeberia.productgalleryrestapi.api.config.ApiConfig.API_PREFIX;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping
public class AuthorizationController {

    private final UserService userService;

    private final JwtUtils jwtUtils;

    private final JWTVerifier jwtVerifier;

    @Autowired
    public AuthorizationController(UserService userService,
                                   JwtUtils jwtUtils,
                                   JWTVerifier jwtVerifier) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.jwtVerifier = jwtVerifier;
    }

    @GetMapping(API_PREFIX + "/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException, AuthenticationException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer ")){
            try {
                String refreshToken = header.split(" ")[1].trim();
                DecodedJWT decodedJWT = jwtVerifier.verify(refreshToken);
                String username = decodedJWT.getSubject();

                User user = userService.findByUsername(username);

                String accessToken = jwtUtils.createAccessToken(username, user.getRoles().stream().map(r -> r.getName().name()).collect(Collectors.toList()));

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception e){
                response.setHeader("error", e.getMessage());
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                Map<String, String> error = new HashMap<>();
                error.put("error_message", e.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }
        return ResponseEntity.status(401).body("Bad authentication token");
    }
}
