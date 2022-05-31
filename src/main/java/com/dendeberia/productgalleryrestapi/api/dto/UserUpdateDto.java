package com.dendeberia.productgalleryrestapi.api.dto;

import com.dendeberia.productgalleryrestapi.validation.NullOrSize;
import lombok.Data;

import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Data
public class UserUpdateDto {

    @NullOrSize(min = 3, max = 20)
    private String username;

    @NullOrSize(min = 8, max = 20)
    private String password;

    private Date registrationDate;

    private List<Long> rolesId;
}
