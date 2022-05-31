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
### Category
| Method  | Name | Details | Permission |
| ------------- | ------------- | ------------- | ------------- |
| **GET**  | /api/v1/categories  | Fetch all items | ROLE_USER |
| **GET**  | /api/v1/categories/{id}  | Fetch item by id | ROLE_USER |
| **POST** | /api/v1/categories | Create category. Request Body: CategoryCreateDto | ROLE_ADMIN |
| **DELETE** | /api/v1/categories | Delete all items | ROLE_ADMIN |
| **DELETE** | /api/v1/categories/{id} | Delete item by id | ROLE_ADMIN |
| **PATCH** | /api/v1/categories/{id} | Update by id. Request Body: CategoryUpdateDto | ROLE_ADMIN |
  
