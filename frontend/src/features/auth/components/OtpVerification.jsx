import {Button, FormHelperText, Paper, Stack, TextField, Typography} from '@mui/material'
import React, {useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LoadingButton} from '@mui/lab'
import {useNavigate} from 'react-router-dom'
import {useForm } from 'react-hook-form'
import {toast} from 'react-toastify'
import {clearOtpVerificationError, 
    clearResendOtpError, 
    clearResendOtpSuccessMessage, 
    resendOtpAsync, 
    resetOtpVerificationStatus, 
    resetResendOtpStatus,
    selectLoggedInUser, 
    selectOtpVerificationError, 
    selectOtpVerificationStatus, 
    selectResendOtpError, 
    selectResendOtpStatus, 
    selectResendOtpSuccessMessage,
    skipOtpVerificationAsync, 
    verifyOtpAsync} from '../AuthSlice'

export const OtpVerification =() => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedInUser = useSelector(selectLoggedInUser)
    const resendOtpStatus =  useSelector(selectResendOtpStatus)
    const resendOtpError = useSelector(selectResendOtpError)
    const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage)
    const otpVerificationStatus = useSelector(selectOtpVerificationStatus)
    const otpVerificationError = useSelector(selectOtpVerificationError)

    const handleSkipOtp = () => {
    if (loggedInUser?._id) {
        dispatch(skipOtpVerificationAsync(loggedInUser._id));
        }
    };

    useEffect(() => {
        if(!loggedInUser){
            navigate('/login')
        }
        else if(loggedInUser && loggedInUser?.isVerified){
            navigate('/')
        }
    },[loggedInUser])

    const handleSendOtp = () => {
        const data = { user: loggedInUser?._id }
        dispatch(resendOtpAsync(data))
    }

    const handleVerifyOtp = (data) => {
        const cred = {...data, userId: loggedInUser?._id}
        dispatch(verifyOtpAsync(cred))
    }

    useEffect(() => {
        if(resendOtpError){
            toast.error(resendOtpError.message)
        }
        return () => {
            dispatch(clearResendOtpError())
        }
    },[resendOtpError])

    useEffect(() => {
        if(resendOtpSuccessMessage){
            toast.success(resendOtpSuccessMessage.message)
        }
        return () => {
            dispatch(clearResendOtpSuccessMessage())
        }
    },[resendOtpSuccessMessage])

    useEffect (() => {
        if(otpVerificationError){
            toast.error(otpVerificationError.message)
        }
        return () => {
            dispatch(clearOtpVerificationError())
        }
    },[otpVerificationError])

    useEffect (() => {
        if(otpVerificationStatus === 'fulfilled')
        {
            toast.success('Email verificat! OTP verificat cu succes!')
            dispatch(resetResendOtpStatus())
        }
        return ()=>{
            dispatch(resetOtpVerificationStatus())
        }
    },[otpVerificationStatus])

    return (
    <Stack width={'100vw'} height={'100vh'} noValidate flexDirection={'column'} rowGap={3} justifyContent="center" alignItems="center" >

        
        <Stack component={Paper} elevation={1} position={'relative'} justifyContent={'center'} alignItems={'center'} p={'2rem'} rowGap={'2rem'}>
            
            <Typography mt={4} variant='h5' fontWeight={500}>Verifica adresa de email</Typography>

            {
                resendOtpStatus==='fullfilled'?(
                    <Stack width={'100%'} rowGap={'1rem'} component={'form'} noValidate onSubmit={handleSubmit(handleVerifyOtp)}>
                        <Stack rowGap={'1rem'}> 
                            <Stack>
                                <Typography  color={'GrayText'}>Introduceti codul OTP de 4 cifre primit pe email</Typography>
                                <Typography fontWeight={'600'} color={'GrayText'}>{loggedInUser?.email}</Typography>
                            </Stack>
                            <Stack>
                                <TextField {...register("otp",{required:"OTP este obligatoriu",minLength:{value:4,message:"Va rugam introduceti codul OTP de 4 cifre"}})} fullWidth type='number' />
                                {errors?.otp && <FormHelperText sx={{color:"red"}}>{errors.otp.message}</FormHelperText>}
                            </Stack>
                       </Stack>
                        <LoadingButton loading={otpVerificationStatus==='pending'}  type='submit' fullWidth variant='contained'>Verifica</LoadingButton>
                    </Stack>
                ):
                <>
                <Stack>
                    <Typography color={'GrayText'}>Iti vom trimite un cod OTP pe </Typography>
                    <Typography fontWeight={'600'} color={'GrayText'}>{loggedInUser?.email}</Typography>
                    <Button 
                        onClick={handleSkipOtp} 
                        variant='outlined' 
                        color="secondary" 
                        sx={{ mt: 2 }}
                    >
                        Treci peste OTP
                    </Button>
                </Stack>
                <LoadingButton onClick={handleSendOtp} loading={resendOtpStatus==='pending'} fullWidth variant='contained'>Preia OTP</LoadingButton>
                </>
             }

        </Stack>
    </Stack>
    )
}