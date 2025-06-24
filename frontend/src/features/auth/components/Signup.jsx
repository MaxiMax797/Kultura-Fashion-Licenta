import React, {useEffect} from 'react'
import Lottie from 'lottie-react'
import  {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { toast} from 'react-toastify'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { FormHelperText, Stack, TextField, Typography, Box, useTheme, useMediaQuery } from '@mui/material'
import {MotionConfig, motion} from 'framer-motion'
import {selectLoggedInUser, signupAsync, selectSignupStatus, selectSignupError, clearSignupError, resetSignupStatus} from '../AuthSlice'
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';

export const Signup = () =>{
    const dispatch = useDispatch()
    const status = useSelector(selectSignupStatus)
    const error = useSelector(selectSignupError)
    const loggedInUser = useSelector(selectLoggedInUser)
    const navigate = useNavigate()
    const theme = useTheme()
    const [countryCode, setCountryCode] = useState("+40");
    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const is900 = useMediaQuery(theme.breakpoints.down(900))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() =>{
        if(loggedInUser && !loggedInUser?.isVerified)
        {
            navigate('/verify-otp')
        }
        else if(loggedInUser)
        {
            navigate('/')
        }
    },[loggedInUser])

    useEffect(() =>{
        if(error)
        {
            toast.error(error.message)
        }
    },[error])

    useEffect(() =>{
        if(status === 'fullfilled')
        {
            toast.success("Welcome to the platform! Verify email to start shopping on Kultura Fashion!")
            reset()
        }
        return() => {
            dispatch(clearSignupError())
            dispatch(resetSignupStatus())
        }
    },[status])

    const handleSignup = (data) =>{
        const cred = {...data}
        cred.phoneNumber = countryCode + data.phoneNumber
        delete cred.confirmPassword
        dispatch(signupAsync(cred))
    }

    return (
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

                <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleSignup)}>

                    <MotionConfig whileHover={{y:-5}}>

                      {/* <motion.div>
                        <TextField fullWidth {...register("name",{required:"Username-ul este necesar"})} placeholder='Username'/>
                        {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
                      </motion.div> */}

                      <motion.div>
                          <TextField 
                            fullWidth 
                            {...register("name", {
                              required: "Prenumele este obligatoriu"
                            })} 
                            placeholder='Prenume'
                          />
                          {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
                        </motion.div>

                        <motion.div>
                          <TextField 
                            fullWidth 
                            {...register("surname", {
                              required: "Numele de familie este obligatoriu"
                            })} 
                            placeholder='Nume de familie'
                          />
                          {errors.surname && <FormHelperText error>{errors.surname.message}</FormHelperText>}
                        </motion.div>


                      <motion.div>
                        <TextField fullWidth {...register("email",{required:"Email-ul este obligatoriu",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Introduceti un email valid"}})} placeholder='Email'/>
                        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                      </motion.div>

                      <motion.div>
                        <TextField type='password' fullWidth {...register("password",{required:"Parola este obligatorie",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message:`cel putin 8 caractere, cel putin o litera mare, o litera mica si un numar. Poate contine si caractere speciale`}})} placeholder='Parola'/>
                        {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
                      </motion.div>
                      
                      <motion.div>
                        <TextField type='password' fullWidth {...register("confirmPassword",{required:"Confirmarea parolei este obligatorie",validate:(value,fromValues)=>value===fromValues.password || "Parolele nu se potrivesc"})} placeholder='Confirma Parola'/>
                        {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
                      </motion.div>

                      <motion.div>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            size="small"
                            sx={{ width: '120px' }}
                          >
                            <MenuItem value="+40">🇷🇴 +40</MenuItem>
                            <MenuItem value="+1">🇺🇸 +1</MenuItem>
                            <MenuItem value="+44">🇬🇧 +44</MenuItem>
                            <MenuItem value="+49">🇩🇪 +49</MenuItem>
                            <MenuItem value="+33">🇫🇷 +33</MenuItem>
                            <MenuItem value="+39">🇮🇹 +39</MenuItem>
                            <MenuItem value="+34">🇪🇸 +34</MenuItem>
                            <MenuItem value="+36">🇭🇺 +36</MenuItem>
                          </Select>
                          <TextField 
                            fullWidth 
                            type="tel"
                            inputProps={{ 
                              inputMode: 'numeric', 
                              pattern: '[0-9]*' 
                            }}
                            {...register("phoneNumber", {
                              required: "Numarul de telefon este obligatoriu",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Te rugam sa introduci doar cifre"
                              }
                            })} 
                            placeholder="Numar de telefon"
                          />
                        </Stack>
                        {errors.phoneNumber && <FormHelperText error>{errors.phoneNumber.message}</FormHelperText>}
                      </motion.div>
                    
                    </MotionConfig>

                    <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                      <LoadingButton sx={{height:'2.5rem'}} fullWidth loading={status==='pending'} type='submit' variant='contained'>Inregistrare</LoadingButton>
                    </motion.div>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'}>
                        <MotionConfig whileHover={{x:2}} whileTap={{scale:1.050}}>
                            <motion.div>
                                <Typography mr={'1.5rem'} sx={{textDecoration:"none",color:"text.primary"}} to={'/forgot-password'} component={Link}>Am uitat parola</Typography>
                            </motion.div>

                            <motion.div>
                                <Typography sx={{textDecoration:"none",color:"text.primary"}} to={'/login'} component={Link}>Esti deja membru? <span style={{color:theme.palette.primary.dark}}>Logheaza-te</span></Typography>
                            </motion.div>
                        </MotionConfig>
                    </Stack>

                </Stack>


        </Stack>
    </Stack>
    )
}