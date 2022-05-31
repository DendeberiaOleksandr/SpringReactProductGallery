package com.dendeberia.productgalleryrestapi.service;

import com.dendeberia.productgalleryrestapi.api.dto.RoleDto;
import com.dendeberia.productgalleryrestapi.domain.Role;
import com.dendeberia.productgalleryrestapi.domain.RoleName;
import com.dendeberia.productgalleryrestapi.repo.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role getUserRole(){
        return roleRepository.findByName(RoleName.ROLE_USER).orElseThrow();
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Role findById(Long id) {
        return roleRepository.findById(id).orElseThrow();
    }
}
