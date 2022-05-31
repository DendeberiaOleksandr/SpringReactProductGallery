package com.dendeberia.productgalleryrestapi.service;

import com.dendeberia.productgalleryrestapi.api.dto.ProductCreateDto;
import com.dendeberia.productgalleryrestapi.api.dto.ProductUpdateDto;
import com.dendeberia.productgalleryrestapi.domain.Category;
import com.dendeberia.productgalleryrestapi.domain.Product;
import com.dendeberia.productgalleryrestapi.repo.ProductRepository;
import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryService categoryService;

    @Autowired
    public ProductService(ProductRepository productRepository,
                          CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }


    public Page<Product> findAll(int page, int size, String sort, String filter) {
        Specification<Product> specification = RSQLJPASupport.<Product>toSpecification(filter)
                .and(RSQLJPASupport.toSort(sort));
        try {
            return productRepository.findAll(specification, PageRequest.of(page, size));
        } catch (Exception e){
            log.error(e.getMessage());
        }
        throw new IllegalArgumentException("Invalid filter or sort syntax");
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    public Product save(ProductCreateDto productDto) {
        Category category = categoryService.findById(productDto.getCategoryId());
        return productRepository.save(new Product(
                null,
                productDto.getName(),
                productDto.getPrice(),
                productDto.getDescription(),
                productDto.getImageUrl(),
                category,
                new Date()
        ));
    }

    public void deleteAll() {
        productRepository.deleteAll();
    }

    public void deleteById(Long id){
        productRepository.deleteById(id);
    }

    public Product update(Long id, ProductUpdateDto productUpdateDto) {
        try {
            if (productUpdateDto != null){
                Product product = findById(id);

                if (productUpdateDto.getName() != null){
                    product.setName(productUpdateDto.getName());
                }

                if (productUpdateDto.getPrice() != null){
                    product.setPrice(productUpdateDto.getPrice());
                }

                if (productUpdateDto.getDescription() != null){
                    product.setDescription(productUpdateDto.getDescription());
                }

                Long categoryId = productUpdateDto.getCategoryId();
                if (categoryId != null){
                    Category category = categoryService.findById(categoryId);
                    product.setCategory(category);
                }

                if (productUpdateDto.getImageUrl() != null){
                    product.setImageUrl(productUpdateDto.getImageUrl());
                }

                return productRepository.save(product);

            }
        } catch (Exception e){
            log.error(e.getMessage());
        }
        throw new IllegalArgumentException();
    }
}
