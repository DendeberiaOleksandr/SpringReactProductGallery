import {api} from "../index";
import RsqlService from "./rsql.service";

const PRODUCTS_ENDPOINT = "/products"

export default class ProductService {

    static async getProducts(filter, sort, page, size){
        let url = PRODUCTS_ENDPOINT + "?"

        if (filter){
            const filterRsql = RsqlService.buildProductFilterQuery(filter)
            url += "filter=" + filterRsql + "&"
        }

        if (sort){
            const sortRsql = RsqlService.buildSortQuery(sort)
            url += "sort=" + sortRsql + "&"
        }

        if (page){
            url += "page=" + page + "&"
        }

        if (size){
            url += "size=" + size + "&"
        }

        const lastChar = url.length - 1

        if (url.charAt(lastChar) === "&"){
            url = url.substring(0, lastChar)
        }

        return await api.get(url)
    }

    static async deleteById(id){
        return await api.delete(PRODUCTS_ENDPOINT + `/${id}`)
    }

    static async getById(id){
        return await api.get(PRODUCTS_ENDPOINT + `/${id}`)
    }

    static async saveProduct(product){
        return await api.post(PRODUCTS_ENDPOINT, product)
    }

    static async update(id, product){
        return await api.patch(PRODUCTS_ENDPOINT + `/${id}`, product)
    }
}