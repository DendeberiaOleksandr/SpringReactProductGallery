package com.dendeberia.productgalleryrestapi.service;

import com.dendeberia.productgalleryrestapi.api.dto.CategoryCreateDto;
import com.dendeberia.productgalleryrestapi.api.dto.CategoryUpdateDto;
import com.dendeberia.productgalleryrestapi.domain.Category;
import com.dendeberia.productgalleryrestapi.repo.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow();
    }

    public Category save(CategoryCreateDto categoryDto) {
        return categoryRepository.save(new Category(null, categoryDto.getName(), null));
    }

    public void deleteAll() {
        categoryRepository.deleteAll();
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    public Category update(Long id, CategoryUpdateDto categoryUpdateDto) {
        try {
            if(categoryUpdateDto != null){
                Category category = findById(id);

                if (categoryUpdateDto.getName() != null){
                    category.setName(categoryUpdateDto.getName());
                }

                return categoryRepository.save(category);

            }
        } catch (Exception e){
            log.error(e.getMessage());
        }
        throw new IllegalArgumentException();
    }
}
