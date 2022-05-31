package com.dendeberia.productgalleryrestapi.api.dto;

import com.dendeberia.productgalleryrestapi.validation.NullOrSize;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ProductUpdateDto {

    @NullOrSize(min = 1)
    private String name;

    private Integer price;

    @NullOrSize(min = 1)
    private String description;

    @NullOrSize(min = 1)
    private String imageUrl;

    private Long categoryId;

}
