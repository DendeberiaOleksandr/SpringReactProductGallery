import {api} from "../index";

const CATEGORIES_ENDPOINT = "/categories"

export default class CategoryService {

    static async update(id, category){
        return await api.patch(CATEGORIES_ENDPOINT + `/${id}`, category)
    }

    static async getCategories(){

        return await api.get(CATEGORIES_ENDPOINT)

    }

    static async saveCategory(category){
        return await api.post(CATEGORIES_ENDPOINT, category)
    }

    static async deleteById(id){
        return await api.delete(CATEGORIES_ENDPOINT + `/${id}`)
    }

}