import {axiosi} from '../../config/axios'

export const signup = async(cred) => 
{
    try{
        const res = await axiosi.post('/auth/signup', cred)
        return res.data
    }catch(error)
    {
        throw error.response.data
    }
}

export const login = async(cred) =>
{
    try{
        const res = await axiosi.post("auth/login", cred)
        return res.data
    }catch (error)
    {
        throw error.response.data
    }
}

export const verifyOtp = async(cred) => {
    try {
        const res = await axiosi.post("auth/verify-otp", cred)
        return res.data
    }catch (error){
        throw error.response.data
    }
}

export const resendOtp=async(cred)=>{
    try {
        const res=await axiosi.post("auth/resend-otp",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const skipOtpVerification = async(userId) => {
    try {
        const res = await axiosi.post("auth/skip-otp-verification", { userId });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const forgotPassword = async(cred) => {
  try {
    console.log("Sending forgot password request:", cred);
    const res = await axiosi.post("auth/forgot-password", cred);
    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error.response?.data || { message: "Network error" };
  }
}

export const resetPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/reset-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const checkAuth=async(cred)=>{
    try {
        const res=await axiosi.get("auth/check-auth")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const logout=async()=>{
    try {
        const res=await axiosi.get("auth/logout")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}