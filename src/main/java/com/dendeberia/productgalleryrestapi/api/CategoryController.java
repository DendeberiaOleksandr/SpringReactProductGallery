package com.dendeberia.productgalleryrestapi.api;

import com.dendeberia.productgalleryrestapi.api.config.ApiConfig;
import com.dendeberia.productgalleryrestapi.api.dto.CategoryCreateDto;
import com.dendeberia.productgalleryrestapi.api.dto.CategoryUpdateDto;
import com.dendeberia.productgalleryrestapi.domain.Category;
import com.dendeberia.productgalleryrestapi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiConfig.API_PREFIX + "/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> categories(){
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> categoryById(@PathVariable("id") Long id){
        try {
            Category category = categoryService.findById(id);
            return ResponseEntity.ok(category);
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Category> save(@RequestBody @Valid CategoryCreateDto categoryDto){
        try {
            Category category = categoryService.save(categoryDto);
            return ResponseEntity.status(200).body(category);
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public void deleteAll(){
        categoryService.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id){
        categoryService.deleteById(id);
    }

    @PatchMapping("/{id}")
    public Category update(@PathVariable("id") Long id, @RequestBody @Valid CategoryUpdateDto categoryUpdateDto){
        return categoryService.update(id, categoryUpdateDto);
    }
}
