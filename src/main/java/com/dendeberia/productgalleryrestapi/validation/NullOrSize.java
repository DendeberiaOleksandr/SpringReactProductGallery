package com.dendeberia.productgalleryrestapi.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(ElementType.FIELD)
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = NullOrSizeValidator.class)
public @interface NullOrSize {
    String message() default "{javax.validation.constraints.NullOrNotBlank.message}";
    Class<?>[] groups() default { };
    int min() default 0;
    int max() default Integer.MAX_VALUE;
    Class<? extends Payload>[] payload() default {};
}
