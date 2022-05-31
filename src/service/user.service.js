import {api} from "../index";
import RsqlService from "./rsql.service";

const USERS_ENDPOINT = "/users"

export default class UserService {

    static async getUsers(filter, sort, page, size){
        let url = USERS_ENDPOINT + "?"

        if (filter){
            const filterRsql = RsqlService.buildUserFilterQuery(filter)
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
        return api.delete(USERS_ENDPOINT + `/${id}`)
    }

}