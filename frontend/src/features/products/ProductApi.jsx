import { axiosi } from "../../config/axios"

export const addProduct = async (data) => {
    try {
        const res = await axiosi.post('/products', data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchProducts = async (filters) => {
    let queryString = ''

    if(filters.searchQuery) {
        queryString += `search=${encodeURIComponent(filters.searchQuery)}&`;
    }

    if(filters.brand){
        filters.brand.map((brand) => {
            queryString += `brand=${brand}&`
        })
    }

    if(filters.category) {
        filters.category.map((category) => {
            queryString += `category=${category}&`
        })
    }

    if(filters.gender && Array.isArray(filters.gender) && filters.gender.length > 0) {
        filters.gender.forEach((genderValue) => {
            queryString += `gender=${genderValue}&`
        })
    }

    if(filters.pagination) {
        queryString += `page=${filters.pagination.page}&limit=${filters.pagination.limit}&`
    }

    if(filters.sort){
        queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`
    }

    if(filters.user) {
        queryString+=`user=${filters.user}&`
    }

    try {
        const res = await axiosi.get(`/products?${queryString}`)
        const totalResults = await res.headers.get('X-Total-Count')
        return {data:res.data, totalResults:totalResults}
    }catch (error) {
        throw error.response.data
    }
}


export const fetchProductById = async(id) => {
    try {
        const res = await axiosi.get(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateProductById = async (update) => {
    try {
        const res = await axiosi.patch(`/products/${update._id}`, update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const undeleteProductById = async (id) => {
    try {
        const res = await axiosi.patch(`/products/undelete/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const deleteProductById = async (id) => {
    try {
        const res = await axiosi.delete(`/products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}