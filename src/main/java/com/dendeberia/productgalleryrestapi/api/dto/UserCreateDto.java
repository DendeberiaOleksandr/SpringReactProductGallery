package com.dendeberia.productgalleryrestapi.api.dto;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class UserCreateDto {

    @Size(min = 3, max = 20)
    private String username;

    @Size(min = 8, max = 20)
    private String password;
}
