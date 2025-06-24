import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUserIdAsync, resetOrderFetchStatus, selectOrderFetchStatus, selectOrders } from '../OrderSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { Button, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import {Link} from 'react-router-dom'
import { addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice'
import Lottie from 'lottie-react'
import { loadingAnimation, noOrdersAnimation } from '../../../assets'
import { toast } from 'react-toastify'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {motion} from 'framer-motion'


export const UserOrders = () => {

    const dispatch=useDispatch()
    const loggedInUser = useSelector(selectLoggedInUser)
    const orders = useSelector(selectOrders)
    const cartItems = useSelector(selectCartItems)
    const orderFetchStatus = useSelector(selectOrderFetchStatus)


    const theme = useTheme()
    const is1200=useMediaQuery(theme.breakpoints.down("1200"))
    const is768=useMediaQuery(theme.breakpoints.down("768"))
    const is660=useMediaQuery(theme.breakpoints.down("660"))
    const is480=useMediaQuery(theme.breakpoints.down("480"))

    const cartItemAddStatus = useSelector(selectCartItemAddStatus)

    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior: 'instant'
        })
    },[])

    useEffect(() => {
        dispatch(getOrderByUserIdAsync(loggedInUser?._id))
    },[dispatch])

    useEffect(()=>{

        if(cartItemAddStatus==='fulfilled'){
            toast.success("Produs adaugat in cos")
        }

        else if(cartItemAddStatus==='rejected'){
            toast.error('Error adding product to cart, please try again later')
        }
    },[cartItemAddStatus])

    useEffect(() => {
        if(orderFetchStatus === 'rejected'){
            toast.error('Error fetching orders')
        }
    },[orderFetchStatus])

    useEffect(() => {
        return () => {
            dispatch(resetOrderFetchStatus())
            dispatch(resetCartItemAddStatus())
        }
    },[])

    const handleAddToCart = (product) => {
        const item = {user:loggedInUser._id, product:product._id, quantity:1}
        dispatch(addToCartAsync(item))
    }

    return (
        <Stack justifyContent={'center'} alignItems={'center'}>
            {
                orderFetchStatus==='pending'?
                <Stack width={is480?'auto':'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'}>
                    <Lottie animationData={loadingAnimation}/>
                </Stack>
                :
                <Stack width={is1200?"auto":"60rem"} p={is480?2:4} mb={'5rem'}>
                    
                    {/* antet & navigare */}
                    <Stack flexDirection={'row'} columnGap={2} >
                        {
                            !is480 && <motion.div whileHover={{x:-5}} style={{alignSelf:"center"}}>
                            <IconButton component={Link} to={"/"}><ArrowBackIcon fontSize='large'/></IconButton>
                        </motion.div>
                        }
        
    
                        <Stack rowGap={1} >
                            <Typography variant='h4' fontWeight={500}>Istoric comenzi</Typography>
                            <Typography sx={{wordWrap:"break-word"}} color={'text.secondary'}>Verifica status-ul comenzilor recente, gestioneaza returnari si descopera produse similare.</Typography>
                        </Stack>
    
                    </Stack>
    
                    {/* comenzi */}
                    <Stack mt={5} rowGap={5}>
    
                            {/* mapare comenzi */}
                            {
                                orders && orders.map((order)=>(
                                    <Stack p={is480?0:2} component={is480?"":Paper} elevation={1} rowGap={2}>
                                        
                                        {/* partea de sus */}
                                        <Stack flexDirection={'row'} rowGap={'1rem'}  justifyContent={'space-between'} flexWrap={'wrap'}>
                                            <Stack flexDirection={'row'} columnGap={4} rowGap={'1rem'} flexWrap={'wrap'}>
                                                <Stack>
                                                    <Typography>ID comanda</Typography>
                                                    <Typography color={'text.secondary'}>{order._id}</Typography>
                                                </Stack>
    
                                                <Stack>
                                                    <Typography>Data plasare</Typography>
                                                    <Typography color={'text.secondary'}>{new Date(order.createdAt).toDateString()}</Typography>
                                                </Stack>
    
                                                <Stack>
                                                    <Typography>Suma totala</Typography>
                                                    <Typography>{order.total} RON</Typography>
                                                </Stack>
                                            </Stack>
    
                                            <Stack>
                                                <Typography>Produs: {order.item.length}</Typography>
                                            </Stack>
                                        </Stack>
    
                                        {/* mijloc */}
                                        <Stack rowGap={2}>
    
                                            {
                                                order.item.map((product)=>(
                                                    
                                                    <Stack mt={2} flexDirection={'row'} rowGap={is768?'2rem':''} columnGap={4} flexWrap={is768?"wrap":"nowrap"}>
                                                        
                                                        <Stack>
                                                            <img style={{width:"100%",aspectRatio:is480?3/2:1/1,objectFit:"contain"}} src={product.product.images[0]} alt="" />
                                                        </Stack>
    
                                                        <Stack rowGap={1} width={'100%'}>
    
                                                            <Stack flexDirection={'row'} justifyContent={'space-between'}>
                                                                <Stack>
                                                                    <Typography variant='h6' fontSize={'1rem'} fontWeight={500}>{product.product.title}</Typography>
                                                                    <Typography variant='body1'  fontSize={'.9rem'}  color={'text.secondary'}>{product.product.brand.name}</Typography>
                                                                    <Typography color={'text.secondary'} fontSize={'.9rem'}>Qty: {product.quantity}</Typography>
                                                                </Stack>
                                                                <Typography>{product.product.price} RON</Typography>
                                                            </Stack>
    
                                                            <Typography color={'text.secondary'}>{product.product.description}</Typography>
    
                                                            <Stack mt={2} alignSelf={is480?"flex-start":'flex-end'} flexDirection={'row'} columnGap={2} >
                                                                <Button size='small' component={Link} to={`/product-details/${product.product._id}`} variant='outlined'>Vezi produs</Button>
                                                                {
                                                                    cartItems.some((cartItem)=>cartItem.product._id===product.product._id)?
                                                                    <Button  size='small' variant='contained' component={Link} to={"/cart"}>Deja in cos</Button>
                                                                    :<Button  size='small' variant='contained' onClick={()=>handleAddToCart(product.product)}>Cumpara din nou</Button>
                                                                }
                                                            </Stack>
    
                                                        </Stack>
    
    
    
                                                    </Stack>
                                                ))
                                            }
    
                                        </Stack>
    
                                        {/* partea de jos */}
                                        <Stack mt={2} flexDirection={'row'} justifyContent={'space-between'}>
                                            <Typography mb={2}>Status : {order.status}</Typography>
                                        </Stack>
                                            
                                    </Stack>
                                ))
    
                            }
                            
                            {/* animatie 0 comenzi */}
                            {
                            !orders.length && 
                                <Stack mt={is480?'2rem':0} mb={'7rem'} alignSelf={'center'} rowGap={2}>
    
                                    <Stack width={is660?"auto":'30rem'} height={is660?"auto":'30rem'}>
                                        <Lottie animationData={noOrdersAnimation}/>
                                    </Stack>
    
                                    <Typography textAlign={'center'} alignSelf={'center'} variant='h6' >Hopa! Se pare ca nu ai mai efectuat comenzi in ultima vreme!</Typography>
    
                                </Stack>
                            }
    
                    </Stack>
                
                </Stack>
            
            }
    
       </Stack>
    )
}