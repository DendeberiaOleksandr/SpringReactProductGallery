import {dateTimeFormatOption} from "../index";

export default class RsqlService {

    static buildUserFilterQuery(filter){
        let rsql = ""

        if (filter.username){
            rsql += "username==" + filter.username + ";"
        }

        if (filter.idFrom){
            rsql += "id>=" + filter.idFrom + ";"
        }

        if (filter.idTo){
            rsql += "id<=" + filter.idTo + ";"
        }

        if (filter.registrationDateFrom){
            rsql += "registrationDate>=" + filter.registrationDateFrom.toISOString().split('T')[0] + ";"
        }

        if (filter.registrationDateTo){
            rsql += "registrationDate<=" + filter.registrationDateTo.toISOString().split('T')[0] + ";"
        }

        const lastChar = rsql.length - 1

        if (rsql.charAt(lastChar) === ";"){
            rsql = rsql.substring(0, lastChar)
        }

        return rsql

    }

    static buildProductFilterQuery(filter){
        let rsql = ""

        if (filter.name){
            rsql += "name==" + filter.name + "*;"
        }

        if (filter.idFrom){
            rsql += "id>=" + filter.idFrom + ";"
        }

        if (filter.idTo){
            rsql += "id<=" + filter.idTo + ";"
        }

        if (filter.addingDateFrom){
            rsql += "addingDate>=" + filter.addingDateFrom.toISOString().split('T')[0] + ";"
        }

        if (filter.addingDateTo){
            rsql += "addingDate<=" + filter.addingDateTo.toISOString().split('T')[0] + ";"
        }

        if (filter.priceFrom){
            rsql += "price>=" + filter.priceFrom + ";"
        }

        if (filter.priceTo){
            rsql += "price<=" + filter.priceTo + ";"
        }

        if (filter.category){
            rsql += "category.id==" + filter.category + ";"
        }

        const lastChar = rsql.length - 1

        if (rsql.charAt(lastChar) === ";"){
            rsql = rsql.substring(0, lastChar)
        }

        return rsql

    }

    static buildSortQuery(sort){
        return sort.attribute + "," + sort.direction
    }
}