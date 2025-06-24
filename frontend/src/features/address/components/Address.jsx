import {LoadingButton} from '@mui/lab'
import {Button, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, {useState} from 'react'
import { useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddressByIdAsync, selectAddressErrors, selectAddressStatus, updateAddressByIdAsync } from '../AddressSlice'


export const Address = ({id,type,street,postalCode,country,phoneNumber,state,city}) => {

    const theme=useTheme()
    const dispatch=useDispatch()
    const {register,handleSubmit,watch,reset,formState: { errors }} = useForm()
    const [edit,setEdit]=useState(false)
    const [open, setOpen] = useState(false);
    const status=useSelector(selectAddressStatus)
    const error=useSelector(selectAddressErrors)
    
    const is480=useMediaQuery(theme.breakpoints.down(480))

    const handleRemoveAddress=()=>{
        dispatch(deleteAddressByIdAsync(id))
    }

    const handleUpdateAddress=(data)=>{
        const update={...data,_id:id}
        setEdit(false)
        dispatch(updateAddressByIdAsync(update))
    }


  return (
    <Stack width={'100%'} p={is480?0:1}>
                                        
        {/* tipul de adresa */}
        <Stack color={'whitesmoke'} p={'.5rem'} borderRadius={'.2rem'} bgcolor={theme.palette.primary.main}>
            <Typography>{type?.toUpperCase()}</Typography>
        </Stack>

        {/* detalii adresa */}
        <Stack p={2} position={'relative'} flexDirection={'column'} rowGap={1} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateAddress)}>

            {/* modul de edit este pe true*/}
            {
                edit?
                (   
                    // update formular adresa
                    <Stack rowGap={2}>
                        
                        <Stack>
                            <Typography gutterBottom>Tip adresa</Typography>
                            <TextField {...register("type",{required:true,value:type})}/>
                        </Stack>


                        <Stack>
                            <Typography gutterBottom>Strada</Typography>
                            <TextField {...register("street",{required:true,value:street})}/>
                        </Stack>

                        <Stack>
                            <Typography gutterBottom>Cod postal</Typography>
                            <TextField type='number' {...register("postalCode",{required:true,value:postalCode})}/>
                        </Stack>

                        <Stack>
                            <Typography gutterBottom>Tara</Typography>
                            <TextField {...register("country",{required:true,value:country})}/>
                        </Stack>

                        <Stack>
                            <Typography  gutterBottom>Numar de telefon</Typography>
                            <TextField type='number' {...register("phoneNumber",{required:true,value:phoneNumber})}/>
                        </Stack>

                        <Stack>
                            <Typography gutterBottom>Judet</Typography>
                            <TextField {...register("state",{required:true,value:state})}/>
                        </Stack>

                        <Stack>
                            <Typography gutterBottom>Localitate de resedinta</Typography>
                            <TextField {...register("city",{required:true,value:city})}/>
                        </Stack>
                    </Stack>
                ):(
                <>
                <Typography>Strada - {street}</Typography>
                <Typography>Cod postal- {postalCode}</Typography>
                <Typography>Tara - {country}</Typography>
                <Typography>Numar de telefon - {phoneNumber}</Typography>
                <Typography>Judet - {state}</Typography>
                <Typography>Localitate de resedinta - {city}</Typography>
                </>
                )
            }

            {/* butoane de actiune */}
            <Stack position={is480?"static":edit?"static":'absolute'} bottom={4} right={4} mt={is480?2:4} flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>

                {/* daca modul de editare este pe true, atunci butonul de salvare modificari va fi afisat in schimbul lui edit*/}
                {
                    edit?(<LoadingButton loading={status==='pending'} size='small' type='submit' variant='contained'>Salveaza schimbari</LoadingButton>
                    ):(<Button size='small' onClick={()=>setEdit(true)} variant='contained'>Editeaza</Button>)
                }

                {/* daca modul de editare este pe true, atunci butonul de cancel este afisat in schimbul lui remove */}
                {
                    edit?(
                        <Button size='small' onClick={()=>{setEdit(false);reset()}} variant='outlined' color='error'>Anuleaza</Button>
                    ):(
                        <LoadingButton loading={status==='pending'} size='small' onClick={handleRemoveAddress} variant='outlined' color='error' >Sterge</LoadingButton>
                    )
                }
            </Stack>
        </Stack>

    </Stack>
  )
}
