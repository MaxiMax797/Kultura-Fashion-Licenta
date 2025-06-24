import {Box, FormHelperText, Stack, TextField, Typography, useMediaQuery, useTheme} from '@mui/material'
import React, {useEffect} from 'react'
import Lottie from 'lottie-react'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab'
import {toast } from 'react-toastify'
import {MotionConfig, motion} from 'framer-motion'
import { selectLoggedInUser, loginAsync, selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus } from '../AuthSlice'
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'


export const Login = () => {
    const dispatch=useDispatch()
    const status = useSelector(selectLoginStatus)
    const error = useSelector(selectLoginError)
    const loggedInUser = useSelector(selectLoggedInUser)
    const navigate = useNavigate()
    const theme = useTheme()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const is900 = useMediaQuery(theme.breakpoints.down(900))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        if (loggedInUser && loggedInUser?.isVerified) {
            navigate('/')
        }
        else if(loggedInUser && !loggedInUser?.isVerified){
            navigate('/verify-otp')
        }
    }, [loggedInUser])

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    useEffect(() => {
        if(status === 'fulfilled' && loggedInUser?.isVerified ===true)
        {
            toast.success('Login Successful')
            reset()
        }

        return () =>{
            dispatch(clearLoginError())
            dispatch(resetLoginStatus())
        }
    }, [status])

    const handleLogin = (data) => {
        const cred = {...data}
        delete cred.confirmPassword
        dispatch(loginAsync(cred))
    }

    return(
        <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{overflowY:"hidden"}}>
        
        {
          !is900 && 
       
        <Stack bgcolor={'black'} flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation}/>
        </Stack> 
        }

        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>

              <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>

                <Stack rowGap={'.4rem'}>
                  <Typography variant='h2' sx={{wordBreak:"break-word"}} fontWeight={600}>Kultura Fashion</Typography>
                  <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'> Alege ce-ti place!</Typography>
                </Stack>

              </Stack>

                <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>

                    <motion.div whileHover={{y:-5}}>
                      <TextField fullWidth {...register("email",{required:"Adresa de email este obligatorie",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Introduceti o adresa de mail valida"}})} placeholder='Email'/>
                      {errors.email && <FormHelperText sx={{mt:1}} error>{errors.email.message}</FormHelperText>}
                    </motion.div>

                    
                    <motion.div whileHover={{y:-5}}>
                      <TextField type='password' fullWidth {...register("password",{required:"Password is required"})} placeholder='Password'/>
                      {errors.password && <FormHelperText sx={{mt:1}} error>{errors.password.message}</FormHelperText>}
                    </motion.div>
                    
                    <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                      <LoadingButton fullWidth  sx={{height:'2.5rem'}} loading={status==='pending'} type='submit' variant='contained'>Login</LoadingButton>
                    </motion.div>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'} >

                      <MotionConfig whileHover={{x:2}} whileTap={{scale:1.050}}>
                          <motion.div>
                              <Typography mr={'1.5rem'} sx={{textDecoration:"none",color:"text.primary"}} to={'/forgot-password'} component={Link}>Am uitat parola</Typography>
                          </motion.div>

                          <motion.div>
                            <Typography sx={{textDecoration:"none",color:"text.primary"}} to={'/signup'} component={Link}>Nu ai cont? <span style={{color:theme.palette.primary.dark}}>Inregistreaza-te</span></Typography>
                          </motion.div>
                      </MotionConfig>

                    </Stack>

                </Stack>
        </Stack>
    </Stack>
    )
}