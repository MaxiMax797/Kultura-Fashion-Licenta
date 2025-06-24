import { Stack, TextField, Typography, Button, Grid, FormControl, Radio, Paper, IconButton, useTheme, useMediaQuery} from '@mui/material'
import React, {useState, useEffect} from 'react'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {addAddressAsync, selectAddressStatus, selectAddresses} from '../../address/AddressSlice'
import {selectLoggedInUser} from '../../auth/AuthSlice'
import {Link, useNavigate} from 'react-router-dom'
import {createOrderAsync, selectCurrentOrder, selectOrderStatus} from '../../order/OrderSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {SHIPPING, TAXES} from '../../../constants'
import {motion} from 'framer-motion'
import { resetCartByUserIdAsync, selectCartItems } from '../../cart/CartSlice'


export const Checkout = () => {

    const status = ''
    const addresses=useSelector(selectAddresses)
    const [selectedAddress,setSelectedAddress]=useState(addresses[0])
    const [selectedPaymentMethod,setSelectedPaymentMethod]=useState('cash')
    const { register, handleSubmit, reset } = useForm()
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const addressStatus=useSelector(selectAddressStatus)
    const navigate=useNavigate()
    const cartItems=useSelector(selectCartItems)
    const orderStatus=useSelector(selectOrderStatus)
    const currentOrder=useSelector(selectCurrentOrder)
    const orderTotal=cartItems.reduce((acc,item)=>(item.product.price*item.quantity)+acc,0)
    const theme=useTheme()
    const is900=useMediaQuery(theme.breakpoints.down(900))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    
    useEffect(()=>{
        if(addressStatus==='fulfilled'){
            reset()
        }
        else if(addressStatus==='rejected'){
            alert('Error adding your address')
        }
    },[addressStatus])

    useEffect(()=>{
        if(currentOrder && currentOrder?._id){
            dispatch(resetCartByUserIdAsync(loggedInUser?._id))
            navigate(`/order-success/${currentOrder?._id}`)
        }
    },[currentOrder])
    
    const handleAddAddress=(data)=>{
        const address={...data,user:loggedInUser._id}
        dispatch(addAddressAsync(address))
    }



    const handleCardPayment = (e) => {
        e.preventDefault();
        
        if (!selectedAddress) {
          toast.error('Va rugam să selectati o adresa de livrare');
          return;
        }
        
        const orderData = {
          user: loggedInUser._id,
          userId: loggedInUser._id,
          item: cartItems,
          address: selectedAddress,
          total: orderTotal + SHIPPING + TAXES
        };
        
        navigate('/card-payment', { state: { orderData } });
      };

    const handleCreateOrder = () => {
        if (!selectedAddress) {
            toast.error('Va rugam să selectati o adresa de livrare');
            return;
        }

        if (selectedPaymentMethod === 'CARD') {
            const orderData = {
                user: loggedInUser._id,
                userId: loggedInUser._id,
                item: cartItems,
                address: selectedAddress,
                total: orderTotal + SHIPPING + TAXES
            };
            
            // navigare catre pagina de plata card bancar
            navigate('/card-payment', { state: { orderData } });
            return;
        }
        const order = {
            user: loggedInUser._id,
            item: cartItems,
            address: selectedAddress,
            paymentMode: selectedPaymentMethod,
            total: orderTotal + SHIPPING + TAXES
        }
        dispatch(createOrderAsync(order))
    }

    return (
        <Stack flexDirection={'row'} p={2} rowGap={10} justifyContent={'center'} flexWrap={'wrap'} mb={'5rem'} mt={2} columnGap={4} alignItems={'flex-start'}>
          {/* cutia din stanga */}
          <Stack rowGap={4} width={is900 ? '100%' : 'auto'}>
            {/* antet */}
            <Stack flexDirection={'row'} columnGap={is480 ? 0.3 : 1} alignItems={'center'}>
              <motion.div whileHover={{x:-5}}>
                <IconButton component={Link} to={"/cart"}><ArrowBackIcon fontSize={is480 ? "medium" : 'large'}/></IconButton>
              </motion.div>
              <Typography variant='h4'>Informatii despre livrare</Typography>
            </Stack>
      
            {/* formular adresa */}
            <Stack component={'form'} noValidate rowGap={2} onSubmit={handleSubmit(handleAddAddress)}>
              <Stack>
                <Typography gutterBottom>Tipul de persoana</Typography>
                <TextField placeholder='Ex: Persoana fizica/juridica/PFA' {...register("type",{required:true})}/>
              </Stack>
      
              <Stack>
                <Typography gutterBottom>Strada</Typography>
                <TextField {...register("street",{required:true})}/>
              </Stack>
      
              <Stack>
                <Typography gutterBottom>Tara</Typography>
                <TextField {...register("country",{required:true})}/>
              </Stack>
      
              <Stack>
                <Typography gutterBottom>Numar de telefon</Typography>
                <TextField type='number' {...register("phoneNumber",{required:true})}/>
              </Stack>
      
              <Stack flexDirection={'row'}>
                <Stack width={'100%'}>
                  <Typography gutterBottom>Orasul</Typography>
                  <TextField {...register("city",{required:true})}/>
                </Stack>
                <Stack width={'100%'}>
                  <Typography gutterBottom>Judet</Typography>
                  <TextField {...register("state",{required:true})}/>
                </Stack>
                <Stack width={'100%'}>
                  <Typography gutterBottom>Cod postal</Typography>
                  <TextField type='number' {...register("postalCode",{required:true})}/>
                </Stack>
              </Stack>
      
              <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
                <LoadingButton loading={status==='pending'} type='submit' variant='contained'>Adauga</LoadingButton>
                <Button color='error' variant='outlined' onClick={()=>reset()}>Reseteaza</Button>
              </Stack>
            </Stack>
      
            {/* adrese existente */}
            <Stack rowGap={3}>
              <Stack>
                <Typography variant='h6'>Adresa</Typography>
                <Typography variant='body2' color={'text.secondary'}>Alege din adresele existente</Typography>
              </Stack>
      
              <Grid container gap={2} width={is900 ? "auto" : '50rem'} justifyContent={'flex-start'} alignContent={'flex-start'}>
                {addresses.map((address,index) => (
                  <FormControl key={address._id} item>
                    <Stack p={is480 ? 2 : 2} width={is480 ? '100%' : '20rem'} height={is480 ? 'auto' : '15rem'} rowGap={2} component={Paper} elevation={1}>
                      <Stack flexDirection={'row'} alignItems={'center'}>
                        <Radio checked={selectedAddress===address} name='addressRadioGroup' value={selectedAddress} onChange={(e)=>setSelectedAddress(addresses[index])}/>
                        <Typography>{address.type}</Typography>
                      </Stack>
                      <Stack>
                        <Typography>{address.street}</Typography>
                        <Typography>{address.state}, {address.city}, {address.country}, {address.postalCode}</Typography>
                        <Typography>{address.phoneNumber}</Typography>
                      </Stack>
                    </Stack>
                  </FormControl>
                ))}
              </Grid>
            </Stack>
            
            {/* metode de plata */}
            <Stack rowGap={3}>
              <Stack>
                <Typography variant='h6'>Metode de plata</Typography>
                <Typography variant='body2' color={'text.secondary'}>Selectati o metoda de plata</Typography>
              </Stack>
              
              <Stack rowGap={2}>
                <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                  <Radio value={selectedPaymentMethod} name='paymentMethod' checked={selectedPaymentMethod==='COD'} onChange={()=>setSelectedPaymentMethod('COD')}/>
                  <Typography>Cash</Typography>
                </Stack>
      
                <Stack flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                  <Radio value={selectedPaymentMethod} name='paymentMethod' checked={selectedPaymentMethod==='CARD'} onChange={()=>setSelectedPaymentMethod('CARD')}/>
                  <Typography>Card bancar</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
      
          <LoadingButton 
            fullWidth 
            loading={orderStatus==='pending'} 
            variant='contained' 
            onClick={handleCreateOrder} 
            size='large'
          >
            {selectedPaymentMethod === 'CARD' ? 'Catre pagina de plata' : 'Plateste si trimite comanda'}
          </LoadingButton>
        </Stack>
      )
}