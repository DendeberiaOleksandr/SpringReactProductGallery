package com.dendeberia.productgalleryrestapi.api.dto;

import com.dendeberia.productgalleryrestapi.domain.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RoleDto {
    private RoleName roleName;
}
