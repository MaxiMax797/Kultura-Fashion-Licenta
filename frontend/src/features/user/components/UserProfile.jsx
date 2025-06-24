import { Avatar, Button, Paper, Stack, Typography, useTheme, TextField, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, changePasswordAsync, selectChangePasswordStatus, selectChangePasswordError } from '../UserSlice'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Address } from '../../address/components/Address'
import { addAddressAsync, resetAddressAddStatus, resetAddressDeleteStatus, resetAddressUpdateStatus, selectAddressAddStatus, selectAddressDeleteStatus, selectAddressErrors, selectAddressUpdateStatus, selectAddresses, selectAddressStatus } from '../../address/AddressSlice'

export const UserProfile = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const userInfo = useSelector(selectUserInfo)
    const addresses = useSelector(selectAddresses)
    const [addAddress, setAddAddress] = useState(false)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const status = useSelector(selectAddressStatus)
    const changePasswordStatus = useSelector(selectChangePasswordStatus)
    const changePasswordError = useSelector(selectChangePasswordError)

    const addressAddStatus = useSelector(selectAddressAddStatus)
    const addressUpdateStatus = useSelector(selectAddressUpdateStatus)
    const addressDeleteStatus = useSelector(selectAddressDeleteStatus)

    const is900 = useMediaQuery(theme.breakpoints.down(900))
    const is480 = useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }, [])

    useEffect(() => {
        if (addressAddStatus === 'fulfilled') {
            toast.success('Address has been added ')
        }
        else if (addressAddStatus === 'rejected') {
            toast.error('Address has not been added ')
        }
    }, [addressAddStatus])

    useEffect(() => {
        if (addressUpdateStatus === 'fulfilled') {
            toast.success('Address has been updated ')
        }
        else if (addressUpdateStatus === 'rejected') {
            toast.error('Address has not been updated. Please try again later! ')
        }
    }, [addressUpdateStatus])

    useEffect(() => {
        if (addressDeleteStatus === 'fulfilled') {
            toast.success('Address has been deleted ')
        }
        else if (addressDeleteStatus === 'rejected') {
            toast.error('Address has not been deleted. Please try again later! ')
        }
    }, [addressDeleteStatus])

    useEffect(() => {
        console.log("Current user info:", userInfo);
        console.log("Is user logged in:", !!userInfo);
    }, [userInfo]);

    useEffect(() => {
        if (changePasswordStatus === 'fulfilled') {
            toast.success('Parola a fost schimbată cu succes!')
            setShowPasswordForm(false)
            reset()
        } else if (changePasswordStatus === 'rejected') {
            toast.error(changePasswordError?.message || 'Eroare la schimbarea parolei. Încercați din nou mai târziu.')
        }
    }, [changePasswordStatus, changePasswordError])



    useEffect(() => {
        return () => {
            dispatch(resetAddressAddStatus())
            dispatch(resetAddressUpdateStatus())
            dispatch(resetAddressDeleteStatus())
        }
    }, [])

    const handleAddAddress = (data) => {
        const address = { ...data, user: userInfo._id }
        dispatch(addAddressAsync(address))
        setAddAddress(false)
        reset()
    }

    const handleChangePassword = (data) => {
        console.log("Attempting to change password", { 
            oldPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            userInfo: userInfo 
        });
        
        // Check if user is logged in
        if (!userInfo) {
            toast.error("Nu sunteți logat!");
            return;
        }
        
        if (data.newPassword !== data.confirmPassword) {
            console.log("Password mismatch!");
            toast.error("Parolele noi nu se potrivesc!");
            return;
        }
        
        console.log("Dispatching changePasswordAsync");
        dispatch(changePasswordAsync({
            oldPassword: data.currentPassword,
            newPassword: data.newPassword
        }));
    }

    return (
        <Stack width={'100vw'} minHeight={'100vh'} alignItems={'center'} mt={8} mb={10}>
            <Stack width={is900 ? "95vw" : '45rem'} rowGap={3}>
                <Stack bgcolor={theme.palette.primary.light} color={theme.palette.primary.main} p={2} rowGap={1} borderRadius={'.6rem'} justifyContent={'center'} alignItems={'center'}>
                    <Avatar src='none' alt={userInfo?.name} sx={{ width: 70, height: 70 }}></Avatar>
                    <Typography>{userInfo?.name} {userInfo?.surname}</Typography>
                    <Typography>{userInfo?.email}</Typography>
                    
                    <Button 
                        onClick={() => setShowPasswordForm(!showPasswordForm)} 
                        variant="contained"
                        sx={{ mt: 1 }}
                    >
                        {showPasswordForm ? "Anulare" : "Schimba parola"}
                    </Button>
                </Stack>
                
                {showPasswordForm && (
                    <Stack component={Paper} elevation={3} p={3} rowGap={2}>
                        <Typography variant="h6" fontWeight={500}>Schimbarea parolei</Typography>
                        
                        <Stack 
                            component="form" 
                            onSubmit={handleSubmit(handleChangePassword)}
                            rowGap={2} 
                            noValidate
                        >
                            <Stack>
                                <Typography gutterBottom>Parola curenta</Typography>
                                <TextField 
                                    type="password"
                                    fullWidth
                                    {...register("currentPassword", { 
                                        required: "Parola curenta este obligatorie" 
                                    })}
                                />
                                {errors.currentPassword && (
                                    <Typography color="error" variant="caption">
                                        {errors.currentPassword.message}
                                    </Typography>
                                )}
                            </Stack>
                            
                            <Stack>
                                <Typography gutterBottom>Parola noua</Typography>
                                <TextField 
                                    type="password"
                                    fullWidth
                                    {...register("newPassword", { 
                                        required: "Parola noua este obligatorie",
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: "Parola trebuie sa contina cel putin 8 caractere, o litera mare, o litera mica si o cifra"
                                        }
                                    })}
                                />
                                {errors.newPassword && (
                                    <Typography color="error" variant="caption">
                                        {errors.newPassword.message}
                                    </Typography>
                                )}
                            </Stack>
                            
                            <Stack>
                                <Typography gutterBottom>Rescrieti parola noua</Typography>
                                <TextField 
                                    type="password"
                                    fullWidth
                                    {...register("confirmPassword", { 
                                        required: "Va rugam sa confirmati parola",
                                        validate: value => value === watch("newPassword") || "Parolele nu se potrivesc"
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <Typography color="error" variant="caption">
                                        {errors.confirmPassword.message}
                                    </Typography>
                                )}
                            </Stack>
                            
                            <Stack flexDirection="row" justifyContent="space-between" spacing={2}>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    onClick={() => {
                                        setShowPasswordForm(false);
                                        reset();
                                    }}
                                >
                                    Anulare
                                </Button>
                                <LoadingButton 
                                    type="submit"
                                    variant="contained"
                                    loading={changePasswordStatus === 'pending'}
                                >
                                    Reseteaza parola
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Stack>
                )}

                <Stack justifyContent={'center'} alignItems={'center'} rowGap={3}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={1}>
                        <Typography variant='h6' fontWeight={400}>Manage adrese</Typography>
                        <Button onClick={() => setAddAddress(true)} size={is480 ? 'small' : ""} variant='contained'>Adauga</Button>
                    </Stack>
                    
                    {addAddress ? (
                        <Stack width={'100%'} component={'form'} noValidate onSubmit={handleSubmit(handleAddAddress)} rowGap={2}>
                            <Stack>
                                <Typography gutterBottom>Tip adresa</Typography>
                                <TextField placeholder='Ex. Acasa, Serviciu' {...register("type", { required: true })} />
                            </Stack>
                            <Stack>
                                <Typography gutterBottom>Strada</Typography>
                                <TextField {...register("street", { required: true })} />
                            </Stack>
                            <Stack>
                                <Typography gutterBottom>Cod postal</Typography>
                                <TextField type='number' {...register("postalCode", { required: true })} />
                            </Stack>
                            <Stack>
                                <Typography gutterBottom>Tara</Typography>
                                <TextField {...register("country", { required: true })} />
                            </Stack>
                            <Stack>
                                <Typography gutterBottom>Numar de telefon</Typography>
                                <TextField type='number' {...register("phoneNumber", { required: true })} />
                            </Stack>
                            <Stack>
                                <Typography gutterBottom>Judet</Typography>
                                <TextField {...register("state", { required: true })} />
                            </Stack>
                            <Stack>
                                <Typography gutterBottom>Localitatea de resedinta</Typography>
                                <TextField {...register("city", { required: true })} />
                            </Stack>
                            <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
                                <LoadingButton loading={status === 'pending'} type='submit' size={is480 ? "small" : ""} variant='contained'>adauga</LoadingButton>
                                <Button color='error' onClick={() => setAddAddress(false)} variant={is480 ? "outlined" : "text"} size={is480 ? "small" : ""} >anuleaza</Button>
                            </Stack>
                        </Stack>
                    ) : ('')}

                    <Stack width={'100%'} rowGap={2}>
                        {addresses.length > 0 ? (
                            addresses.map((address) => (
                                <Address key={address._id} id={address._id} city={address.city} country={address.country} phoneNumber={address.phoneNumber} postalCode={address.postalCode} state={address.state} street={address.street} type={address.type} />
                            ))
                        ) : (
                            <Typography textAlign={'center'} mt={2} variant='body2'>Nu aveti adrese adaugate</Typography>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}