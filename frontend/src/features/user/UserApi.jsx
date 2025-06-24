import {axiosi} from "../../config/axios"

export const fetchLoggedInUserById = async (id) => {
    try{
        const res = await axiosi.get(`/users/${id}`)
        return res.data
    }catch (error){
        throw error.response.data
    }
}

export const updateUserById = async (update) => {
    try{
        const res = await axiosi.patch(`/users/${update._id}`, update)
        return res.data
    }catch (error){
        throw error.response.data
    }
}


export const changePassword = async (data) => {
    try {
        console.log("Sending change password request:", data);
        const res = await axiosi.post('/users/change-password', data);
        console.log("Change password response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Change password error:", error);
        console.error("Error response:", error.response);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: "Network error or server not responding" };
        }
    }
}