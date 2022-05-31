package com.dendeberia.productgalleryrestapi.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductCreateDto {

    @NotBlank
    private String name;

    @NotNull
    private Integer price;

    @NotBlank
    private String description;

    @NotBlank
    private String imageUrl;

    @NotNull
    private Long categoryId;
}
