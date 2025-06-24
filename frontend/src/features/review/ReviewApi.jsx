import {axiosi} from '../../config/axios'

export const createReview = async (review) => {
    try {
        const res = await axiosi.post('/reviews', review)
        return res.data
    } catch (error)
    {
        throw error.response.data
    }
}

export const fetchReviewsByProductId = async (Id) => {
    try {
        const res = await axiosi.get(`/reviews/product/${Id}`)
        return res.data
    } catch (error)
    {
        throw error.response.data
    }
}

export const updateReviewById = async (update) => {
    try {
        const res  =await axiosi.patch(`/reviews/${update._id}`, update)
        return res.data
    } catch (error)
    {
        throw error.response.data
    }
}

export const deleteReviewById = async (Id) => {
    try{
        const res = await axiosi.delete(`/reviews/${Id}`)
        return res.data
    }catch (error)
    {
        throw error.response.data
    }
}