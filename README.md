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
### Category
| Method  | Name | Details |
| ------------- | ------------- | ------------- |
| GET  | /api/v1/categories  | | Fetch all items
| GET  | /api/v1/categories/{id}  | Fetch item by id |
| POST | /api/v1/categories | Create category. Requires body |
  
