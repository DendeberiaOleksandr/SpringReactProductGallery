package com.dendeberia.productgalleryrestapi.api;

import com.dendeberia.productgalleryrestapi.api.config.ApiConfig;
import com.dendeberia.productgalleryrestapi.api.dto.UserCreateDto;
import com.dendeberia.productgalleryrestapi.api.dto.UserUpdateDto;
import com.dendeberia.productgalleryrestapi.domain.User;
import com.dendeberia.productgalleryrestapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(ApiConfig.API_PREFIX + "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<User> users(@RequestParam(name = "page", defaultValue = "0") int page,
                             @RequestParam(name = "size", defaultValue = "20") int size,
                             @RequestParam(name = "sort", defaultValue = "registrationDate,desc") String sort,
                             @RequestParam(name = "filter", defaultValue = "id>=0") String filter){
        return userService.findAll(page, size, sort, filter);
    }

    @PostMapping
    public User createUser(@RequestBody @Valid UserCreateDto userCreateDto){
        return userService.create(userCreateDto);
    }

    @DeleteMapping
    public void deleteAll(){
        userService.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id){
        userService.deleteById(id);
    }

    @PatchMapping("/{id}")
    public User update(@PathVariable("id") Long id, @RequestBody @Valid UserUpdateDto userUpdateDto){
        return userService.update(id, userUpdateDto);
    }
}
