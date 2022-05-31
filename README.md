# Backend
Server provides REST API for application.

## Entities
1. Category
    - id
    - name
    - products
2. Product
    - id
    - name
    - price
    - description
    - imageUrl
    - category
    - addingDate
3. User
    - id
    - username
    - password
    - registrationDate
    - roles
4. Role
    - id
    - name
  
## API
### Dto
1. CategoryCreateDto
    - name
2. CategoryUpdateDto
    - name
3. ProductCreateDto
    - name
    - price
    - description
    - imageUrl
    - categoryId
4. ProductUpdateDto
    - name
    - price
    - description
    - imageUrl
    - categoryId
5. RoleDto
    - roleName
6. UserCreateDto
    - username
    - password
7. UserUpdateDto
    - username
    - password
    - registrationDate
    - roleId
## Endpoints
### Authentication
Authentication is provided by JWT. To get token request `POST /api/v1/login` with params `username`, `password`. To refresh `access_token` request `GET /api/v1/token/refresh` with `refreshToken` in `Authorization` Header.
### Sort and Filter
Some resources can be filtered and sorted. [Documentaion](https://github.com/perplexhub/rsql-jpa-specification) of library for sort and filter. Format of sort and filter params is **RSQL**.
### User
| Method  | Name | Details | Permission |
| ------------- | ------------- | ------------- | ------------- |
| **GET**  | /api/v1/users  | Fetch users page. Request params: page, size, sort, filter | ROLE_ADMIN |
| **POST** | /api/v1/users | Create user. Request Body: UserCreateDto | Permit All |
| **DELETE** | /api/v1/users | Delete all items | ROLE_ADMIN |
| **DELETE** | /api/v1/users/{id} | Delete item by id | ROLE_ADMIN |
| **PATCH** | /api/v1/users/{id} | Update by id. Request Body: UsersUpdateDto | ROLE_ADMIN |
### Category
| Method  | Name | Details | Permission |
| ------------- | ------------- | ------------- | ------------- |
| **GET**  | /api/v1/categories  | Fetch all items | ROLE_USER |
| **GET**  | /api/v1/categories/{id}  | Fetch item by id | ROLE_USER |
| **POST** | /api/v1/categories | Create category. Request Body: CategoryCreateDto | ROLE_ADMIN |
| **DELETE** | /api/v1/categories | Delete all items | ROLE_ADMIN |
| **DELETE** | /api/v1/categories/{id} | Delete item by id | ROLE_ADMIN |
| **PATCH** | /api/v1/categories/{id} | Update by id. Request Body: CategoryUpdateDto | ROLE_ADMIN |
### Role
| Method  | Name | Details | Permission |
| ------------- | ------------- | ------------- | ------------- |
| **GET**  | /api/v1/roles  | Fetch all items | ROLE_ADMIN |
| **GET**  | /api/v1/roles/{id}  | Fetch item by id | ROLE_ADMIN |
### Product
| Method  | Name | Details | Permission |
| ------------- | ------------- | ------------- | ------------- |
| **GET**  | /api/v1/products  | Fetch products page. Request params: page, size, sort, filter | ROLE_USER |
| **GET**  | /api/v1/products/{id}  | Fetch item by id | ROLE_USER |
| **POST** | /api/v1/products | Create product. Request Body: ProductCreateDto | ROLE_ADMIN |
| **DELETE** | /api/v1/products | Delete all items | ROLE_ADMIN |
| **DELETE** | /api/v1/products/{id} | Delete item by id | ROLE_ADMIN |
| **PATCH** | /api/v1/products/{id} | Update by id. Request Body: ProductsUpdateDto | ROLE_ADMIN |

  
