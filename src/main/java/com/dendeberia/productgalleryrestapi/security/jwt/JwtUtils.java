package com.dendeberia.productgalleryrestapi.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {

    private final Algorithm algorithm;

    @Value("${jwt.access.token.expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh.token.expiration}")
    private long refreshTokenExpiration;

    @Autowired
    public JwtUtils(Algorithm algorithm) {
        this.algorithm = algorithm;
    }

    public String createAccessToken(String username, List<String> roles){
        Date now = new Date();
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(now.getTime() + accessTokenExpiration))
                .withIssuedAt(now)
                .withClaim("roles", roles)
                .sign(algorithm);
    }

    public String createRefreshToken(String username){
        Date now = new Date();
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpiration))
                .withIssuedAt(now)
                .sign(algorithm);
    }

    public long getAccessTokenExpiration() {
        return accessTokenExpiration;
    }

    public void setAccessTokenExpiration(long accessTokenExpiration) {
        this.accessTokenExpiration = accessTokenExpiration;
    }

    public long getRefreshTokenExpiration() {
        return refreshTokenExpiration;
    }

    public void setRefreshTokenExpiration(long refreshTokenExpiration) {
        this.refreshTokenExpiration = refreshTokenExpiration;
    }
}
