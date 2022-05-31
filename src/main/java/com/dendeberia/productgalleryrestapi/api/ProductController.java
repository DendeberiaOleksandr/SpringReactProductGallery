package com.dendeberia.productgalleryrestapi.api;

import com.dendeberia.productgalleryrestapi.api.config.ApiConfig;
import com.dendeberia.productgalleryrestapi.api.dto.ProductCreateDto;
import com.dendeberia.productgalleryrestapi.api.dto.ProductUpdateDto;
import com.dendeberia.productgalleryrestapi.domain.Product;
import com.dendeberia.productgalleryrestapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(ApiConfig.API_PREFIX + "/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public Page<Product> products(@RequestParam(name = "size", defaultValue = "20") int size,
                                  @RequestParam(name = "page", defaultValue = "0") int page,
                                  @RequestParam(name = "sort", defaultValue = "addingDate,desc") String sort,
                                  @RequestParam(name = "filter", defaultValue = "id>=0") String filter){
        return productService.findAll(page, size, sort, filter);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable("id") Long id){
        try {
            Product product = productService.findById(id);
            return ResponseEntity.ok(product);
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public Product save(@RequestBody @Valid ProductCreateDto productDto){
        return productService.save(productDto);
    }

    @DeleteMapping
    public void deleteAll(){
        productService.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id){
        productService.deleteById(id);
    }

    @PatchMapping("/{id}")
    public Product update(@PathVariable("id") Long id, @RequestBody @Valid ProductUpdateDto productUpdateDto){
        return productService.update(id, productUpdateDto);
    }
}
