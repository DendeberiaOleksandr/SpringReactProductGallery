package com.dendeberia.productgalleryrestapi.service;

import com.dendeberia.productgalleryrestapi.api.dto.UserCreateDto;
import com.dendeberia.productgalleryrestapi.api.dto.UserUpdateDto;
import com.dendeberia.productgalleryrestapi.domain.Role;
import com.dendeberia.productgalleryrestapi.domain.User;
import com.dendeberia.productgalleryrestapi.repo.UserRepository;
import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RoleService roleService;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder, RoleService roleService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
    }

    public Page<User> findAll(int page,
                              int size,
                              String sort,
                              String filter){
        Specification<User> specification = RSQLJPASupport.<User>toSpecification(filter)
                .and(RSQLJPASupport.toSort(sort));
        try {
            return userRepository.findAll(specification, PageRequest.of(page, size));
        } catch (Exception e){
            log.error(e.getMessage());
        }
        throw new IllegalArgumentException("Invalid filter or sort syntax");
    }

    public User create(UserCreateDto userCreateDto){
        return userRepository.save(
                User.builder()
                        .username(userCreateDto.getUsername())
                        .password(passwordEncoder.encode(userCreateDto.getPassword()))
                        .registrationDate(new Date())
                        .roles(List.of(roleService.getUserRole()))
                        .build()
        );
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }

    public User update(Long id, UserUpdateDto userUpdateDto) {
        try {
            User user = findById(id);

            if (userUpdateDto.getUsername() != null){
                user.setUsername(userUpdateDto.getUsername());
            }

            if (userUpdateDto.getPassword() != null){
                user.setPassword(passwordEncoder.encode(userUpdateDto.getPassword()));
            }

            List<Long> rolesId = userUpdateDto.getRolesId();
            if (rolesId != null){
                if (!rolesId.isEmpty()){
                    List<Role> roles = rolesId.stream()
                            .map(roleService::findById)
                            .collect(Collectors.toList());
                    user.setRoles(roles);
                }
            }

            if (userUpdateDto.getRegistrationDate() != null){
                user.setRegistrationDate(userUpdateDto.getRegistrationDate());
            }

            return userRepository.save(user);

        } catch (Exception e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }
}
