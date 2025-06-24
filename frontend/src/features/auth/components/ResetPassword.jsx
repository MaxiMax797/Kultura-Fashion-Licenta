import { FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import {clearResetPasswordError, clearResetPasswordSuccessMessage, resetPasswordAsync, resetResetPasswordStatus, selectResetPasswordError, selectResetPasswordStatus, selectResetPasswordSuccessMessage } from '../AuthSlice'
import { LoadingButton } from '@mui/lab'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {MotionConfig,motion} from 'framer-motion'

export const ResetPassword = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const status = useSelector(selectResetPasswordStatus)
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const navigate = useNavigate()
    const successMessage = useSelector(selectResetPasswordSuccessMessage)
    const error = useSelector(selectResetPasswordError)
    const {userId, passwordResetToken} = useParams()
    const is500 = useMediaQuery(theme.breakpoints.down(500))

    useEffect(() => {
        if(error)
        {
            toast.error(error.message)
        }
        return () =>{
            dispatch(clearResetPasswordError())
        }
    }, [error])

    useEffect(() =>{
        if(status === 'fulfilled')
        {
            toast.success(successMessage?.message)
            navigate("/login")
        }
        return () => {
            dispatch(clearResetPasswordSuccessMessage())
        }
    },[status])

    useEffect(() =>{
        return () => {
            dispatch(resetResetPasswordStatus())
        }
    },[])

    const handleResetPassword = async (data) =>{
        const cred = {...data, userId:userId, token:passwordResetToken}
        delete cred.confirmPassword
        dispatch(resetPasswordAsync(cred))
        reset()
    }

    return (
    <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>

        <Stack>

            <Stack component={Paper} elevation={2}>
                <Stack component={'form'} width={is500?"95vw":'30rem'} p={'1rem'} rowGap={'1rem'} noValidate onSubmit={handleSubmit(handleResetPassword)}>

                        <Stack rowGap={'.3rem'}>
                            <Typography variant='h4' fontWeight={600}>Resetare parola</Typography>
                            <Typography color={'GrayText'}>Introduceti si confirmati noua parola</Typography>
                        </Stack>
                        
                        <Stack rowGap={'.5rem'}>
                            <MotionConfig whileHover={{y:-2}}>

                                <motion.div>
                                    <TextField type='password' fullWidth sx={{mt:1}} {...register("password",{required:"Please enter a password",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message:`at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`}})} placeholder='New Password'/>
                                    {errors.password && <FormHelperText sx={{mt:1}} error>{errors.password.message}</FormHelperText>}
                                </motion.div>
                                
                                <motion.div>
                                    <TextField type='password' fullWidth sx={{mt:1}} {...register("confirmPassword",{required:"Please Confirm the password",validate:(value,formValues)=>value===formValues.password || "Passwords dosen't match"})} placeholder='Confirm New Password'/>
                                    {errors.confirmPassword && <FormHelperText sx={{mt:1}} error>{errors.confirmPassword.message}</FormHelperText>}
                                </motion.div>
                                
                            </MotionConfig>
                        </Stack>

                        <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                            <LoadingButton sx={{height:"2.5rem"}} fullWidth loading={status==='pending'} type='submit' variant='contained'>Resetare parola</LoadingButton>
                        </motion.div>
                </Stack>
            </Stack>

        </Stack>
    </Stack>
    )
}