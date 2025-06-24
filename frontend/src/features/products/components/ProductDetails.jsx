import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearSelectedProduct, fetchProductByIdAsync, resetProductFetchStatus, selectProductFetchStatus, selectSelectedProduct } from '../ProductSlice'
import { Box, Checkbox, Rating, Stack, Typography, useMediaQuery, Button, Paper } from '@mui/material'
import { addToCartAsync, resetCartItemAddStatus, selectCartItemAddStatus, selectCartItems } from '../../cart/CartSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { fetchReviewsByProductIdAsync, resetReviewFetchStatus, selectReviewFetchStatus, selectReviews } from '../../review/ReviewSlice'
import { Reviews } from '../../review/components/Reviews'
import { toast } from 'react-toastify'
import { MotionConfig, motion } from 'framer-motion'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import Favorite from '@mui/icons-material/Favorite'
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems } from '../../wishlist/WishlistSlice'
import { useTheme } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import MobileStepper from '@mui/material/MobileStepper'
import Lottie from 'lottie-react'
import { loadingAnimation } from '../../../assets'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export const ProductDetails = () => {
    const { id } = useParams()
    const product = useSelector(selectSelectedProduct)
    const loggedInUser = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const cartItemAddStatus = useSelector(selectCartItemAddStatus)
    const [quantity, setQuantity] = useState(1)
    const reviews = useSelector(selectReviews)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const theme = useTheme()
    const is1420 = useMediaQuery(theme.breakpoints.down(1420))
    const is990 = useMediaQuery(theme.breakpoints.down(990))
    const is840 = useMediaQuery(theme.breakpoints.down(840))
    const is500 = useMediaQuery(theme.breakpoints.down(500))
    const is480 = useMediaQuery(theme.breakpoints.down(480))
    const is387 = useMediaQuery(theme.breakpoints.down(387))
    const is340 = useMediaQuery(theme.breakpoints.down(340))

    const handleGoBack = () => {
        const lastSearchPage = localStorage.getItem('lastSearchPage');
        const lastSearchQuery = localStorage.getItem('lastSearchQuery');
        
        if (lastSearchPage) {
            navigate('/', { state: { 
                returnToPage: parseInt(lastSearchPage),
                returnWithQuery: lastSearchQuery || '' 
            }});
        } else {
            navigate('/');
        }
    };

    const wishlistItems = useSelector(selectWishlistItems)

    const [selectedSize, setSelectedSize] = useState('')
    const [productSizes, setProductSizes] = useState({
        'XS': { available: false, quantity: 0 },
        'S': { available: true, quantity: 3 },
        'M': { available: true, quantity: 5 },
        'L': { available: true, quantity: 4 },
        'XL': { available: true, quantity: 2 }
    })
    const [totalAvailableQuantity, setTotalAvailableQuantity] = useState(0)



    useEffect(() => {
        if (product) {
            
            const isHatOrAccessory = 
                product.category._id === "65a7e24602e12c44f599442c" || // Sepci
                product.category._id === "65a7e24602e12c44f5994435" || // Palarii
                product.category._id === "65a7e24602e12c44f5994433";   // Rucsacuri
            
            let sizes = {};
            
            if (isHatOrAccessory) {
                // pentru palarii/sepci, se va afisa numai OSFA
                sizes = {
                    'OSFA': { 
                        available: product.stockQuantity > 0, 
                        quantity: product.stockQuantity 
                    }
                };
            } else {
                if (product.sizeInventory) {
                    sizes = {
                        'XS': { available: product.sizeInventory.XS > 0, quantity: product.sizeInventory.XS },
                        'S': { available: product.sizeInventory.S > 0, quantity: product.sizeInventory.S },
                        'M': { available: product.sizeInventory.M > 0, quantity: product.sizeInventory.M },
                        'L': { available: product.sizeInventory.L > 0, quantity: product.sizeInventory.L },
                        'XL': { available: product.sizeInventory.XL > 0, quantity: product.sizeInventory.XL }
                    };
                } else {
                    // daca atributul sizeInventory nu este valabil (anomalii), aplicam distributie uniforma in functie de marimi
                    sizes = {
                        'XS': { available: product.stockQuantity > 0, quantity: Math.floor(product.stockQuantity * 0.1) },
                        'S': { available: product.stockQuantity > 0, quantity: Math.floor(product.stockQuantity * 0.2) },
                        'M': { available: product.stockQuantity > 0, quantity: Math.floor(product.stockQuantity * 0.3) },
                        'L': { available: product.stockQuantity > 0, quantity: Math.floor(product.stockQuantity * 0.25) },
                        'XL': { available: product.stockQuantity > 0, quantity: Math.floor(product.stockQuantity * 0.15) }
                    };
                }
            }
            
            // calcul cantitate totala
            const total = Object.values(sizes).reduce((sum, size) => 
                sum + (size.available ? size.quantity : 0), 0);
            
            setProductSizes(sizes);
            setTotalAvailableQuantity(total);
            
            // automat se face selectia pe prima marime a carei cantitate este diferita de 0
            const firstAvailableSize = Object.keys(sizes).find(size => sizes[size].available);
            if (firstAvailableSize) {
                setSelectedSize(firstAvailableSize);
            }
        }
    }, [product]);

    const isProductWithSizeInCart = cartItems.some((item) => item.product._id === id && item.size === selectedSize)
    const isProductAlreadyinWishlist = wishlistItems.some((item) => item.product._id === id)

    const productFetchStatus = useSelector(selectProductFetchStatus)
    const reviewFetchStatus = useSelector(selectReviewFetchStatus)

    const totalReviewRating = reviews.reduce((acc, review) => acc + review.rating, 0)
    const totalReviews = reviews.length
    const averageRating = parseInt(Math.ceil(totalReviewRating / totalReviews))

    const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
    
    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id))
            dispatch(fetchReviewsByProductIdAsync(id))
        }
    }, [id])

    useEffect(() => {
        if (cartItemAddStatus === 'fulfilled') {
            toast.success("Produs adaugat in cos")
        }
        else if (cartItemAddStatus === 'rejected') {
            toast.error('Error adding product to cart, please try again later')
        }
    }, [cartItemAddStatus])

    useEffect(() => {
        if (wishlistItemAddStatus === 'fulfilled') {
            toast.success("Produs adaugat in wishlist")
        }
        else if (wishlistItemAddStatus === 'rejected') {
            toast.error("Error adding product to wishlist, please try again later")
        }
    }, [wishlistItemAddStatus])

    useEffect(() => {
        if (wishlistItemDeleteStatus === 'fulfilled') {
            toast.success("Produs eliminat din wishlist")
        }
        else if (wishlistItemDeleteStatus === 'rejected') {
            toast.error("Error removing product from wishlist, please try again later")
        }
    }, [wishlistItemDeleteStatus])

    useEffect(() => {
        if (productFetchStatus === 'rejected') {
            toast.error("Error fetching product details, please try again later")
        }
    }, [productFetchStatus])

    useEffect(() => {
        if (reviewFetchStatus === 'rejected') {
            toast.error("Error fetching product reviews, please try again later")
        }
    }, [reviewFetchStatus])

    useEffect(() => {
        return () => {
            dispatch(clearSelectedProduct())
            dispatch(resetProductFetchStatus())
            dispatch(resetReviewFetchStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetCartItemAddStatus())
        }
    }, [])

    const handleAddToCart = () => {
        const item = { user: loggedInUser._id, product: id, quantity, size: selectedSize }
        dispatch(addToCartAsync(item))
        setQuantity(1)
    }

    const handleDecreaseQty = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)
        }
    }
    
    const handleIncreaseQty = () => {
        if (selectedSize && quantity < productSizes[selectedSize].quantity && quantity < 20) {
            setQuantity(quantity + 1)
        }
    }

    const handleSizeSelect = (size) => {
        if (productSizes[size].available) {
            setSelectedSize(size)
            // resetare cantitate la 1 atunci cand se schimba marimea
            setQuantity(1)
        }
    }

    const handleAddRemoveFromWishlist = (e) => {
        if (e.target.checked) {
            const data = { user: loggedInUser?._id, product: id }
            dispatch(createWishlistItemAsync(data))
        }
        else if (!e.target.checked) {
            const index = wishlistItems.findIndex((item) => item.product._id === id)
            dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id))
        }
    }

    const [activeStep, setActiveStep] = React.useState(0)
    const maxSteps = product?.images.length

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleStepChange = (step) => {
        setActiveStep(step)
    }

    useEffect(() => {
        console.log("Product fetch status:", productFetchStatus);
        console.log("Review fetch status:", reviewFetchStatus);
        console.log("Product data:", product);
    }, [productFetchStatus, reviewFetchStatus, product]);
    
return (
    <>
        {!(productFetchStatus === 'rejected' && reviewFetchStatus === 'rejected') && 
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', mb: '2rem', rowGap: "2rem" }}>
                {(productFetchStatus === 'pending' || reviewFetchStatus === 'pending' || !product) ?
                    <Stack width={is500 ? "35vh" : '25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'}>
                        <Lottie animationData={loadingAnimation} />
                    </Stack>
                    :
                    <Stack key={product?._id}>

                    <Button 
                        startIcon={<ArrowBackIcon />} 
                        onClick={handleGoBack} 
                        sx={{ alignSelf: 'flex-start', mb: 2 }}
                    >
                        Inapoi catre pagina principala
                    </Button>

                        {/* detalii produse */}
                        <Stack 
                            width={is480 ? "auto" : is1420 ? "auto" : '88rem'} 
                            p={is480 ? 2 : 0} 
                            height={is840 ? "auto" : "50rem"} 
                            rowGap={5} 
                            mt={is840 ? 0 : 5} 
                            justifyContent={'center'} 
                            mb={5} 
                            flexDirection={is840 ? "column" : "row"} 
                            columnGap={is990 ? "2rem" : "5rem"}
                        >
                            {/* containerul de imagini din partea dreapta */}
                            <Stack sx={{ flexDirection: "row", columnGap: "2.5rem", alignSelf: "flex-start", height: "100%" }}>
                                {/* selectarea unei imagini */}
                                {!is1420 && product && product.images && product.images.length > 0 && (
                                    <Stack sx={{ display: "flex", rowGap: '1.5rem', height: "100%", overflowY: "scroll" }}>
                                        {product.images.map((image, index) => (
                                            <motion.div 
                                                key={index}
                                                whileHover={{ scale: 1.1 }} 
                                                whileTap={{ scale: 1 }} 
                                                style={{ width: "200px", cursor: "pointer" }} 
                                                onClick={() => setSelectedImageIndex(index)}
                                            >
                                                <img 
                                                    style={{ width: "100%", objectFit: "contain" }} 
                                                    src={image} 
                                                    alt={`${product.title} image ${index + 1}`} 
                                                />
                                            </motion.div>
                                        ))}
                                    </Stack>
                                )} 
                                
                                {/* imaginea selectata */}
                                <Stack mt={is480 ? "0rem" : '5rem'}>
                                    {is1420 ?
                                        (product && product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                                            <Stack 
                                                width={is480 ? "100%" : is990 ? '400px' : "500px"}
                                                height={is480 ? "300px" : is990 ? '400px' : "500px"}
                                                sx={{ 
                                                    border: '1px solid transparent',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <AutoPlaySwipeableViews 
                                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} 
                                                    index={activeStep} 
                                                    onChangeIndex={handleStepChange} 
                                                    enableMouseEvents
                                                    style={{
                                                        height: '100%',
                                                        width: '100%'
                                                    }}
                                                >
                                                    {product.images.map((image, index) => (
                                                        <div key={index} style={{ 
                                                            width: "100%", 
                                                            height: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            {Math.abs(activeStep - index) <= 2 ? (
                                                                <Box 
                                                                    component="img" 
                                                                    sx={{ 
                                                                        maxWidth: "100%", 
                                                                        maxHeight: "100%", 
                                                                        objectFit: "contain",
                                                                        display: 'block'
                                                                    }} 
                                                                    src={image} 
                                                                    alt={`${product.title} image ${index + 1}`} 
                                                                />
                                                            ) : null}
                                                        </div>
                                                    ))}
                                                </AutoPlaySwipeableViews>

                                                <MobileStepper 
                                                    steps={maxSteps} 
                                                    position="static" 
                                                    activeStep={activeStep} 
                                                    nextButton={
                                                        <Button 
                                                            size="small" 
                                                            onClick={handleNext} 
                                                            disabled={activeStep === maxSteps - 1}
                                                        >
                                                            Next
                                                            {theme.direction === 'rtl' ? (<KeyboardArrowLeft />) : (<KeyboardArrowRight />)}
                                                        </Button>
                                                    } 
                                                    backButton={
                                                        <Button 
                                                            size="small" 
                                                            onClick={handleBack} 
                                                            disabled={activeStep === 0}
                                                        >
                                                            {theme.direction === 'rtl' ? (<KeyboardArrowRight />) : (<KeyboardArrowLeft />)}
                                                            Back
                                                        </Button>
                                                    }
                                                />
                                            </Stack>
                                        ) : <Typography>Nu sunt imagini disponibile.</Typography>
                                        ) : (
                                        (product && product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[selectedImageIndex]) ? (
                                            <div style={{ 
                                                width: "100%",
                                                height: is480 ? "300px" : "500px",
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid transparent'
                                            }}> 
                                                <img 
                                                    style={{ 
                                                        maxWidth: "100%", 
                                                        maxHeight: "100%", 
                                                        objectFit: "contain"
                                                    }} 
                                                    src={product.images[selectedImageIndex]} 
                                                    alt={`${product.title} image`} 
                                                />
                                            </div>
                                        ) : <Typography>Nu exista imagine selectata sau valabila.</Typography>
                                        )
                                    }
                                </Stack>
                            </Stack>

                            {/* partea din dreapta - informatii despre produs */}
                            <Stack rowGap={"1.5rem"} width={is480 ? "100%" : '25rem'}>
                                {/* titlu & rating & pret */}
                                <Stack rowGap={".5rem"}>
                                    <Typography variant='h4' fontWeight={600}>{product?.title}</Typography>
                                    <Stack sx={{ flexDirection: "row", columnGap: is340 ? ".5rem" : "1rem", alignItems: "center", flexWrap: 'wrap', rowGap: '1rem' }}>
                                        <Rating value={averageRating} readOnly />
                                        <Typography>
                                            ({totalReviews === 0 ? "No reviews" : totalReviews === 1 ? `${totalReviews} Review` : `${totalReviews} Reviews`})
                                        </Typography>
                                        <Typography 
                                            color={product?.stockQuantity <= 10 ? "error" : product?.stockQuantity <= 20 ? "orange" : "green"}
                                        >
                                            {product?.stockQuantity <= 10 ? 
                                                `Doar ${product?.stockQuantity} ramase in total` : 
                                                product?.stockQuantity <= 20 ? "Doar cateva ramase. Grabeste-te!" : "In Stoc"
                                            }
                                        </Typography>
                                    </Stack>
                                    <Typography variant='h5'>{product?.price} RON</Typography>
                                </Stack>

                                <Stack rowGap={".8rem"}>
                                    <Typography>{product?.description}</Typography>
                                    <hr />
                                </Stack>
                                
                                {!loggedInUser?.isAdmin &&
                                    <Stack sx={{ rowGap: "1.3rem" }} width={'fit-content'}>
                                        <Stack flexDirection={'row'} alignItems={'center'} columnGap={is387 ? '5px' : '1rem'} width={'fit-content'}>
                                            <Typography>Marimea: </Typography>
                                            <Stack flexDirection={'row'} columnGap={is387 ? ".5rem" : "1rem"}>
                                                {Object.keys(productSizes).map((size) => (
                                                    <motion.div 
                                                        key={size}
                                                        onClick={() => productSizes[size]?.available && handleSizeSelect(size)} 
                                                        whileHover={{ scale: productSizes[size]?.available ? 1.050 : 1 }}
                                                        whileTap={{ scale: productSizes[size]?.available ? 1 : 1 }}
                                                        style={{
                                                            border: selectedSize === size ? '' : "1px solid grayText",
                                                            borderRadius: "8px",
                                                            width: "30px",
                                                            height: "30px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            cursor: productSizes[size]?.available ? "pointer" : "not-allowed",
                                                            padding: "1.2rem",
                                                            backgroundColor: selectedSize === size ? "#DB4444" : 
                                                                        !productSizes[size]?.available ? "#e0e0e0" : "whitesmoke",
                                                            color: selectedSize === size ? "white" : 
                                                                !productSizes[size]?.available ? "#a0a0a0" : "",
                                                            opacity: productSizes[size]?.available ? 1 : 0.5
                                                        }}
                                                    >
                                                        <p>{size}</p>
                                                    </motion.div>
                                                ))}
                                            </Stack>
                                        </Stack>

                                        {selectedSize && productSizes[selectedSize] && (
                                            <Typography color={productSizes[selectedSize].quantity <= 5 ? "error" : "green"}>
                                                {productSizes[selectedSize].quantity <= 5 
                                                    ? `Doar ${productSizes[selectedSize].quantity} ramase pentru marimea ${selectedSize}`
                                                    : `In stoc (${productSizes[selectedSize].quantity} disponibile)`
                                                }
                                            </Typography>
                                        )}

                                        <Stack rowGap={".8rem"}>
                                            <Typography variant="body2" sx={{ mt: 0.5 }}>SKU: {product?.sku}</Typography>
                                            <hr />
                                        </Stack>

                                        <Stack flexDirection={"row"} columnGap={is387 ? ".3rem" : "1.5rem"} width={'100%'}>
                                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                                <MotionConfig>
                                                    <motion.button 
                                                        whileHover={{ scale: 1.050 }} whileTap={{ scale: 1 }}
                                                        onClick={handleDecreaseQty} 
                                                        style={{
                                                            padding: "10px 15px",
                                                            fontSize: "1.050rem",
                                                            backgroundColor: "",
                                                            color: "black",
                                                            outline: "none",
                                                            border: '1px solid black',
                                                            borderRadius: "8px"
                                                        }}
                                                    >-</motion.button>
                                                    <p style={{ margin: "0 1rem", fontSize: "1.1rem", fontWeight: '400' }}>{quantity}</p>
                                                    <motion.button 
                                                        whileHover={{ scale: 1.050 }} whileTap={{ scale: 1 }}
                                                        onClick={handleIncreaseQty} 
                                                        style={{
                                                            padding: "10px 15px",
                                                            fontSize: "1.050rem",
                                                            backgroundColor: "black",
                                                            color: "white",
                                                            outline: "none",
                                                            border: 'none',
                                                            borderRadius: "8px"
                                                        }}
                                                    >+</motion.button>
                                                </MotionConfig>
                                            </Stack>
                                            
                                            {isProductWithSizeInCart ? (
                                                <button 
                                                    style={{
                                                        padding: "10px 15px",
                                                        fontSize: "1.050rem",
                                                        backgroundColor: "black",
                                                        color: "white",
                                                        outline: "none",
                                                        border: 'none',
                                                        borderRadius: "8px"
                                                    }} 
                                                    onClick={() => navigate("/cart")}
                                                >Marimea este in cos</button>
                                            ) : (
                                                <motion.button 
                                                    whileHover={{ scale: 1.050 }} 
                                                    whileTap={{ scale: 1 }} 
                                                    onClick={handleAddToCart} 
                                                    style={{
                                                        padding: "10px 15px",
                                                        fontSize: "1.050rem",
                                                        backgroundColor: "black",
                                                        color: "white",
                                                        outline: "none",
                                                        border: 'none',
                                                        borderRadius: "8px"
                                                    }}
                                                    disabled={!selectedSize || (selectedSize && productSizes[selectedSize] && productSizes[selectedSize].quantity === 0)}
                                                >Adauga in cos</motion.button>
                                            )}

                                            <motion.div style={{ border: "1px solid grayText", borderRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Checkbox 
                                                    checked={isProductAlreadyinWishlist} 
                                                    onChange={(e) => handleAddRemoveFromWishlist(e)} 
                                                    icon={<FavoriteBorder />} 
                                                    checkedIcon={<Favorite sx={{ color: 'red' }} />} 
                                                />
                                            </motion.div>
                                        </Stack>
                                    </Stack>
                                }

                                <Stack mt={3} sx={{ justifyContent: "center", alignItems: 'center', border: "1px grayText solid", borderRadius: "7px" }}>
                                    <Stack p={2} flexDirection={'row'} alignItems={"center"} columnGap={'1rem'} width={'100%'} justifyContent={'flex-start'}>
                                        <Box>
                                            <LocalShippingOutlinedIcon />
                                        </Box>
                                        <Stack>
                                            <Typography>Livrare gratuita</Typography>
                                            <Typography>Introdu codul postal pentru a estima timpul livrarii</Typography>
                                        </Stack>
                                    </Stack>
                                    <hr style={{ width: "100%" }} />
                                    <Stack p={2} flexDirection={'row'} alignItems={"center"} width={'100%'} columnGap={'1rem'} justifyContent={'flex-start'}>
                                        <Box>
                                            <CachedOutlinedIcon />
                                        </Box>
                                        <Stack>
                                            <Typography>Politica de returnare</Typography>
                                            <Typography>Retur gratis timp de 30 de zile de la achizitie</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* reviews */}
                        { product && id && averageRating !== undefined && (
                        <Stack width={is1420 ? "auto" : '88rem'} p={is480 ? 2 : 0}>
                            <Reviews productId={id} averageRating={averageRating} />       
                        </Stack>
                        )}
                    </Stack>
                }
            </Stack>
        }
    </>
);
}