import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab'
import {toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import { Button, FormHelperText, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { clearForgotPasswordError, forgotPasswordAsync, selectForgotPasswordError, selectForgotPasswordStatus, selectForgotPasswordSuccessMessage } from '../AuthSlice'

export const ForgotPassword = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const status = useSelector(selectForgotPasswordStatus)
    const error = useSelector(selectForgotPasswordError)
    const successMessage = useSelector(selectForgotPasswordSuccessMessage)
    const theme = useTheme()
    const is500 = useMediaQuery(theme.breakpoints.down(500))
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if (error) {
            toast.error(error?.message)
            dispatch(clearForgotPasswordError())
        }
    }, [error, dispatch])
    
    useEffect(() => {
        if(status === 'fulfilled') {
            setShowSuccess(true)
        }
    }, [status])

    const handleForgotPassword = async (data) => {
        dispatch(forgotPasswordAsync(data))
        reset()
    }

    return (
        <Stack width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Stack rowGap={'1rem'}>
                {(status === 'fulfilled' || showSuccess) ? (
                    <Stack 
                        component={Paper} 
                        elevation={3} 
                        p={4} 
                        maxWidth={is500 ? "95vw" : "600px"}
                        alignItems="center" 
                        spacing={3}
                    >
                        <Typography variant='h5' fontWeight={600} color="primary" textAlign="center">
                            Parola a fost resetata cu succes!
                        </Typography>
                        
                        <Typography variant='body1' color={'text.secondary'} textAlign="center" paragraph>
                            Parola dumneavoastra a fost resetata la default123. Este recomandat sa o modificati cat mai repede. Acest lucru se poate face in pagina profilului dumneavoastra, dupa ce va logati.
                        </Typography>
                        
                        <Button 
                            variant='contained'
                            component={Link}
                            to="/login"
                            size="large"
                            fullWidth={is500}
                            sx={{ mt: 2 }}
                        >
                            Inapoi la pagina de login
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Stack component={Paper} elevation={2}>
                            <Stack component={'form'} width={is500 ? "95vw" : '30rem'} p={is500 ? "1rem" : '1.5rem'} rowGap={'1rem'} noValidate onSubmit={handleSubmit(handleForgotPassword)}>
                                
                                <Stack rowGap={'.4rem'}>
                                    <Typography variant='h5' fontWeight={600}>
                                        Ai uitat parola?
                                    </Typography>
                                    <Typography color={'text.secondary'} variant='body2'>
                                        Introdu adresa de email pentru a-ti reseta parola. Dupa ce apasati butonul de resetare parola, parola dumneavoastra va fi resetata la "default123". Este recomandat sa o modificati cat mai repede. Acest lucru se poate face in pagina profilului dumneavoastra, dupa ce va logati.
                                    </Typography>
                                </Stack>
                                
                                <motion.div whileHover={{y:-2}}>
                                    <TextField 
                                        fullWidth 
                                        sx={{mt:1}} 
                                        {...register("email", {
                                            required: "Adresa de email este obligatorie",
                                            pattern: {
                                                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                                message: "Introduceti o adresa de email valida"
                                            }
                                        })} 
                                        placeholder='Adresa de email'
                                    />
                                    {errors.email && <FormHelperText sx={{fontSize:".9rem",mt:1}} error>{errors.email.message}</FormHelperText>}
                                </motion.div>

                                <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                                    <LoadingButton 
                                        sx={{height:'2.5rem'}} 
                                        fullWidth 
                                        loading={status==='pending'} 
                                        type='submit' 
                                        variant='contained'
                                    >
                                        Reseteaza parola
                                    </LoadingButton>
                                </motion.div>
                            </Stack>
                        </Stack>
                        
                        <motion.div whileHover={{x:2}} whileTap={{scale:1.050}}>
                            <Typography 
                                sx={{textDecoration:"none",color:"text.primary",width:"fit-content"}} 
                                mt={2} 
                                to={'/login'} 
                                variant='body2' 
                                component={Link}
                            >
                                Inapoi la <span style={{color:theme.palette.primary.dark}}>login</span>
                            </Typography>
                        </motion.div>
                    </>
                )}
            </Stack>
        </Stack>
    )
}
