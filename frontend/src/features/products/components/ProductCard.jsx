import { FormHelperText, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import {selectWishlistItems} from '../../wishlist/WishlistSlice'
import {selectLoggedInUser} from '../../auth/AuthSlice'
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice'
import {motion} from 'framer-motion'
import { selectCurrentProductPage, selectSearchQuery } from '../ProductSlice';
export const ProductCard = ({ id, title, price, thumbnail, brand, category, stockQuantity, handleAddRemoveFromWishlist, isWishlistCard, isAdminCard }) => {

    const navigate = useNavigate()
    const wishlistItems = useSelector(selectWishlistItems)
    const loggedInUser = useSelector(selectLoggedInUser)
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const page = useSelector(selectCurrentProductPage);
    const searchQuery = useSelector(selectSearchQuery);
    let isProductAlreadyinWishlist = -1


    const theme = useTheme()
    const is1410 = useMediaQuery(theme.breakpoints.down(1410))
    const is932 = useMediaQuery(theme.breakpoints.down(932))
    const is752 = useMediaQuery(theme.breakpoints.down(752))
    const is500 = useMediaQuery(theme.breakpoints.down(500))
    const is608 = useMediaQuery(theme.breakpoints.down(608))
    const is488 = useMediaQuery(theme.breakpoints.down(488))
    const is408 = useMediaQuery(theme.breakpoints.down(408))

    isProductAlreadyinWishlist = wishlistItems.some((item) => item.product._id === id)

    const isProductAlreadyInCart = cartItems.some((item) => item.product._id === id)

    const handleAddToCart = async(e) => {
        e.stopPropagation()
        
        // pentru produse OSFA (palarii, accesorii)
        if (category === "65a7e24602e12c44f599442c" || category === "65a7e24602e12c44f5994435") {
            // adaugare in cos cumparaturi
            const data = {user: loggedInUser?._id, product: id, size: "OSFA"}
            dispatch(addToCartAsync(data))
        } else {
            navigate(`/product-details/${id}`)
        }
    }


    const handleClick = () => {
        navigate(`/product-details/${id}`, {
            state: { 
                returnToPage: page, 
                returnWithQuery: searchQuery || '' 
            }
        });
    }

    return (
    <>

    {

    isProductAlreadyinWishlist!==-1 ?
    <Stack component={isAdminCard?"":isWishlistCard?"":is408?'':Paper} mt={is408?2:0} elevation={1} p={2} width={is408?'auto':is488?"200px":is608?"240px":is752?"300px":is932?'240px':is1410?'300px':'340px'} sx={{cursor:"pointer"}} onClick={handleClick}>

        {/*  display imagine*/}
        <Stack>
            <img width={'100%'} style={{aspectRatio:1/1,objectFit:"contain"}} height={'100%'}  src={thumbnail} alt={`${title} photo unavailable`} />
        </Stack>

        {/* rubrica de jos */}
        <Stack flex={2} justifyContent={'flex-end'} spacing={1} rowGap={2}>

            <Stack>
                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h6' fontWeight={400}>{title}</Typography>
                    {
                    !isAdminCard && 
                    <motion.div whileHover={{scale:1.3,y:-10,zIndex:100}} whileTap={{scale:1}} transition={{duration:.4,type:"spring"}}>
                        <Checkbox onClick={(e)=>e.stopPropagation()} checked={isProductAlreadyinWishlist} onChange={(e)=>handleAddRemoveFromWishlist(e,id)} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'red'}} />} />
                    </motion.div>
                    }
                </Stack>
                <Typography color={"text.secondary"}>{brand}</Typography>
            </Stack>

            <Stack sx={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Typography>{price} RON</Typography>
                {
                    !isWishlistCard? isProductAlreadyInCart?
                    'Adaugat in cos'
                    :
                    !isAdminCard &&
                    <motion.button  whileHover={{scale:1.030}} whileTap={{scale:1}} onClick={(e)=>handleAddToCart(e)} style={{padding:"10px 15px",borderRadius:"3px",outline:"none",border:"none",cursor:"pointer",backgroundColor:"black",color:"white",fontSize:is408?'.9rem':is488?'.7rem':is500?'.8rem':'.9rem'}}>
                        <div style={{display:"flex",alignItems:"center",columnGap:".5rem"}}>
                            <p>Adauga in cos</p>
                        </div>
                    </motion.button>
                    :''
                }
                
            </Stack>
            {
                stockQuantity<=20 && (
                    <FormHelperText sx={{fontSize:".9rem"}} error>{stockQuantity===1?"Mai este un singur produs":"Grabeste-te! Mai sunt putine pe stoc!"}</FormHelperText>
                )
            }
        </Stack>
    </Stack> 
    :''
    
    
    }
    
    </>
  )

}