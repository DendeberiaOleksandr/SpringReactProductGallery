package com.dendeberia.productgalleryrestapi.api;

import com.dendeberia.productgalleryrestapi.api.config.ApiConfig;
import com.dendeberia.productgalleryrestapi.domain.Role;
import com.dendeberia.productgalleryrestapi.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConfig.API_PREFIX + "/roles")
public class RoleController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<Role> roles(){
        return roleService.findAll();
    }

    @GetMapping("/{id}")
    public Role roleById(@PathVariable("id") Long id){
        return roleService.findById(id);
    }
}
