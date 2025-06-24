import {FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, Box, Button, useTheme} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters, selectCurrentProductFilters,
    selectCurrentProductSort,
    selectCurrentProductPage,
    setCurrentFilters,
    setCurrentSort,
    setCurrentPage, setSearchQuery} from '../ProductSlice'
import {ProductCard} from './ProductCard'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AddIcon from '@mui/icons-material/Add'
import { selectBrands} from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {selectCategories} from '../../categories/CategoriesSlice'
import Pagination from '@mui/material/Pagination'
import { ITEMS_PER_PAGE} from '../../../constants'
import {createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems} from '../../wishlist/WishlistSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import {toast} from 'react-toastify'
import {banner1, banner2, banner3, banner4, banner5, banner6, loadingAnimation} from '../../../assets'
import { resetCartItemAddStatus, selectCartItemAddStatus } from '../../cart/CartSlice'
import { motion } from 'framer-motion'
import { ProductBanner } from './ProductBanner'
import ClearIcon from '@mui/icons-material/Clear'
import Lottie from 'lottie-react'
import notFoundAnimation from '../../../assets/animations/notFoundPage.json';
import { selectSearchQuery } from '../ProductSlice';
import { useLocation } from 'react-router-dom';

const sortOptions = [
    {name:"Pret crescator", sort:"price", order: "asc"},
    {name:"Pret descrescator", sort:"price", order: "desc"},
    {name:"Rating crescator", sort:"rating", order: "asc"},
    {name:"Rating descrescator", sort:"rating", order: "desc"},
]

const bannerImages = [banner1, banner2, banner3, banner4, banner5, banner6]

export const ProductList = () => {
    const searchQuery = useSelector(selectSearchQuery);
    const theme = useTheme()
    const location = useLocation();

    const is1200=useMediaQuery(theme.breakpoints.down(1200))
    const is800=useMediaQuery(theme.breakpoints.down(800))
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const is600=useMediaQuery(theme.breakpoints.down(600))
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const is488=useMediaQuery(theme.breakpoints.down(488))

    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const products=useSelector(selectProducts)
    const totalResults=useSelector(selectProductTotalResults)
    const loggedInUser=useSelector(selectLoggedInUser)

    const productFetchStatus=useSelector(selectProductFetchStatus)

    const wishlistItems=useSelector(selectWishlistItems)
    const wishlistItemAddStatus=useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus=useSelector(selectWishlistItemDeleteStatus)

    const cartItemAddStatus=useSelector(selectCartItemAddStatus)

    const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

    const dispatch=useDispatch()

    const filters = useSelector(selectCurrentProductFilters); // preluare filtre din Redux
    const page = useSelector(selectCurrentProductPage);
    const sort = useSelector(selectCurrentProductSort);


    const handleBrandFilters = (e) => {
        // prelia filtre brand din redux state
        const currentBrands = filters.brand || [];
        const filterSet = new Set(currentBrands);
    
        if (e.target.checked) {
            filterSet.add(e.target.value);
        } else {
            filterSet.delete(e.target.value);
        }
    
        const filterArray = Array.from(filterSet);
        
    
        dispatch(setCurrentFilters({ ...filters, brand: filterArray }));
    }

    const handleCategoryFilters = (e) => {
        const currentCategories = filters.category || [];
        const filterSet = new Set(currentCategories);
    
        if (e.target.checked) {
            filterSet.add(e.target.value);
        } else {
            filterSet.delete(e.target.value);
        }
    
        const filterArray = Array.from(filterSet);
        
        dispatch(setCurrentFilters({ ...filters, category: filterArray }));
    }

    const handleGenderFilters = (e) => {
        const currentGenders = filters.gender || [];
        const filterSet = new Set(currentGenders);
        if (e.target.checked) {
            filterSet.add(e.target.value);
        } else {
            filterSet.delete(e.target.value);
        }
        const filterArray = Array.from(filterSet);
        dispatch(setCurrentFilters({ ...filters, gender: filterArray }));
    }


    const handleSortChange = (value) => {
        dispatch(setCurrentSort(value)); // parsat din JSON deja
    }

    const handlePageChange = (event, value) => {
        dispatch(setCurrentPage(value));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])

    useEffect(() => {
    const apiFilters = {
        brand: filters.brand || [],
        category: filters.category || [],
        gender: filters.gender || [],
        pagination: { page: page, limit: ITEMS_PER_PAGE },
        sort: sort,
        search: searchQuery || '', // includem searchQuery
    };

    if (!loggedInUser?.isAdmin) {
        apiFilters.user = true; // produsele nesterse sunt vizibile utilizatorilor clienti
    }

    dispatch(fetchProductsAsync(apiFilters));

}, [filters, page, sort, loggedInUser, searchQuery, dispatch]); 


    const handleAddRemoveFromWishlist=(e,productId)=>{
        if(e.target.checked){
            const data={user:loggedInUser?._id,product:productId}
            dispatch(createWishlistItemAsync(data))
        }

        else if(!e.target.checked){
            const index=wishlistItems.findIndex((item)=>item.product._id===productId)
            dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
        }
    }

    useEffect(()=>{
        if(wishlistItemAddStatus==='fulfilled'){
            toast.success("Produs adaugat in wishlist")
        }
        else if(wishlistItemAddStatus==='rejected'){
            toast.error("Error adding product to wishlist, please try again later")
        }

    },[wishlistItemAddStatus])

    useEffect(()=>{
        if(wishlistItemDeleteStatus==='fulfilled'){
            toast.success("Produs eliminat din wishlist")
        }
        else if(wishlistItemDeleteStatus==='rejected'){
            toast.error("Error removing product from wishlist, please try again later")
        }
    },[wishlistItemDeleteStatus])

    useEffect(()=>{
        if(cartItemAddStatus==='fulfilled'){
            toast.success("Produs adaugat in cosul de cumparaturi")
        }
        else if(cartItemAddStatus==='rejected'){
            toast.error("Error adding product to cart, please try again later")
        }
        
    },[cartItemAddStatus])

    useEffect(()=>{
        if(productFetchStatus==='rejected'){
            toast.error("Error fetching products, please try again later")
        }
    },[productFetchStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetProductFetchStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetCartItemAddStatus())
        }
    },[])


    const handleFilterClose=()=>{
        dispatch(toggleFilters())
    }

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [totalResults, dispatch]);


    useEffect(() => {
        if (location.state?.returnToPage) {
            dispatch(setCurrentPage(location.state.returnToPage));
            
            if (location.state.returnWithQuery && location.state.returnWithQuery !== searchQuery) {
                dispatch(setSearchQuery(location.state.returnWithQuery));
            }
        } else {
            const lastSearchPage = localStorage.getItem('lastSearchPage');
            const lastSearchQuery = localStorage.getItem('lastSearchQuery');
            
            if (lastSearchPage) {
                dispatch(setCurrentPage(parseInt(lastSearchPage)));
                
                if (lastSearchQuery && lastSearchQuery !== searchQuery) {
                    dispatch(setSearchQuery(lastSearchQuery));
                }
            }
        }
        
        localStorage.removeItem('lastSearchPage');
        localStorage.removeItem('lastSearchQuery');
    }, [dispatch, location.state, searchQuery]);

  return (
    <>
    {/*  side bar filtre */}

    {
        productFetchStatus==='pending'?
        <Stack width={is500?"35vh":'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} marginRight={'auto'} marginLeft={'auto'}>
            <Lottie animationData={loadingAnimation}/>
        </Stack>
        :
        <>
        <motion.div style={{position:"fixed",backgroundColor:"white",height:"100vh",padding:'1rem',overflowY:"scroll",width:is500?"100vw":"30rem",zIndex:500}}  variants={{show:{left:0},hide:{left:-500}}} initial={'hide'} transition={{ease:"easeInOut",duration:.7,type:"spring"}} animate={isProductFilterOpen===true?"show":"hide"}>

            {/* sectiune filtre */}
            <Stack mb={'5rem'}  sx={{scrollBehavior:"smooth",overflowY:"scroll"}}>

                    
                        <Typography variant='h4'>New Arrivals</Typography>


                            <IconButton onClick={handleFilterClose} style={{position:"absolute",top:15,right:15}}>
                                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                                    <ClearIcon fontSize='medium'/>
                                </motion.div>
                            </IconButton>


                    {/* filtre brand */}
                    <Stack mt={2}>
                        <Accordion>
                            <AccordionSummary expandIcon={<AddIcon />}  aria-controls="brand-filters-summary" id="brand-filters-header" > {}
                                    <Typography>Branduri</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{p:0}}>
                                <FormGroup>
                                    {brands?.map((brand) => (
                                        <motion.div key={brand._id} style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                            <FormControlLabel 
                                                sx={{ml:1}} 
                                                htmlFor={`brand-${brand._id}`}
                                                control={
                                                    <Checkbox 
                                                        id={`brand-${brand._id}`} // id unic pentru accesibilitate
                                                        checked={filters.brand?.includes(brand._id) || false}
                                                        onChange={handleBrandFilters}
                                                        value={brand._id}
                                                        whileHover={{scale:1.1}} 
                                                    />
                                                } 
                                                label={brand.name} 
                                            />
                                        </motion.div>
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>

                    {/* filtre categorii */}
                    <Stack mt={2}>
                        <Accordion>
                            <AccordionSummary expandIcon={<AddIcon />}  aria-controls="category-filters-summary" id="category-filters-header" > {/* tot id unic si aici */}
                                    <Typography>Categorii</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{p:0}}>
                                <FormGroup>
                                    {categories?.map((category) => (
                                    <motion.div key={category._id} style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                                        <FormControlLabel 
                                            sx={{ml:1}} 
                                            htmlFor={`category-${category._id}`}
                                            control={
                                                <Checkbox 
                                                    id={`category-${category._id}`} // id unic pentru accesibilitate
                                                    checked={filters.category?.includes(category._id) || false}
                                                    onChange={handleCategoryFilters}
                                                    value={category._id}
                                                    whileHover={{scale:1.1}} 
                                                />
                                            } 
                                            label={category.name} 
                                        />
                                    </motion.div>
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                    {/* filtre gen */}
                    <Accordion>
                        <AccordionSummary expandIcon={<AddIcon />} aria-controls="gender-filters-summary" id="gender-filters-header"> {/* tot id unic */}
                            <Typography>Gen</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormControlLabel 
                                    htmlFor="gender-men"
                                    control={
                                        <Checkbox 
                                            id="gender-men" // id unic pentru accesibilitate si aici
                                            checked={filters.gender?.includes('men') || false}
                                            onChange={handleGenderFilters} 
                                            value="men" 
                                        />
                                    } 
                                    label="Barbati" 
                                />
                                <FormControlLabel 
                                    htmlFor="gender-women"
                                    control={
                                        <Checkbox 
                                            id="gender-women"
                                            checked={filters.gender?.includes('women') || false}
                                            onChange={handleGenderFilters} 
                                            value="women" 
                                        />
                                    } 
                                    label="Femei" 
                                />
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

            </Stack>
        </motion.div>
        
        <Stack mb={'3rem'}>
            

                {/* sectiune banners */}
                {
                    !is600 && 
                
                <Stack sx={{
                    width: "100%",
                    height: is800 ? "300px" : is1200 ? "400px" : "500px",
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}>
                    <ProductBanner 
                        images={bannerImages} 
                        imageStyle={{
                            width: 'auto',
                            height: '100%',
                            objectFit: 'contain',
                            maxWidth: '100%'
                        }}
                    />
                </Stack>}

                {/* produse */}
                <Stack rowGap={5} mt={is600?2:0}>

                    {/* optiuni de sortare */}
                    <Stack flexDirection={'row'} mr={'2rem'} justifyContent={'flex-end'} alignItems={'center'} columnGap={5}>
                                        
                        {/* <Stack alignSelf={'flex-end'} width={'12rem'}>
                            <FormControl fullWidth>
                                    <InputLabel id="sort-dropdown">Sort</InputLabel>
                                    <Select
                                        variant='standard'
                                        labelId="sort-dropdown"
                                        label="Sort"
                                        onChange={(e)=>setSort(e.target.value)}
                                        value={sort}
                                    >
                                        <MenuItem bgcolor='text.secondary' value={null}>Reseteaza filtre</MenuItem>
                                        {
                                            sortOptions.map((option)=>(
                                                <MenuItem key={option} value={option}>{option.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                            </FormControl>
                        </Stack> */}

                        <Stack alignSelf={'flex-end'} width={'12rem'}>
                            <FormControl fullWidth>
                                <InputLabel id="sort-dropdown">Sorteaza</InputLabel>
                                {/* <Select
                                    variant='standard'
                                    labelId="sort-dropdown"
                                    label="Sort"
                                    value={sort || ''}
                                    onChange={handleSortChange}
                                >
                                    <MenuItem value={null}>Reseteaza</MenuItem>
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.name} value={option}>{option.name}</MenuItem>
                                    ))}
                                </Select> */}
                                <Select
                                    variant='standard'
                                    labelId="sort-dropdown"
                                    label="Sort"
                                    value={sort ? JSON.stringify(sort) : ''}
                                    onChange={(e) => handleSortChange(e.target.value ? JSON.parse(e.target.value) : null)}
                                >
                                    <MenuItem value="">Reseteaza</MenuItem>
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.name} value={JSON.stringify(option)}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    
                    </Stack>

                    {/* Daca search filter-ul nu returneaza niciun produs */}
                    {products.length === 0 && searchQuery ? (
                        <Stack 
                            width="100%" 
                            alignItems="center" 
                            justifyContent="center" 
                            spacing={3}
                            mt={5}
                        >
                            <Box sx={{ width: { xs: '200px', sm: '300px' } }}>
                                <Lottie animationData={notFoundAnimation} loop={true} />
                            </Box>
                            <Typography variant="h5" color="text.secondary" textAlign="center">
                                Nu exista rezultate pentru "{searchQuery}"
                            </Typography>
                            <Typography variant="body1" color="text.secondary" textAlign="center">
                                Cautati folosind alti termeni
                            </Typography>
                            <Button 
                                variant="contained" 
                                onClick={() => {
                                    dispatch(setSearchQuery(''));
                                }}
                            >
                                Curatare cautare
                            </Button>
                        </Stack>
                    ) : (
                        <>

                        {/* grid produse */}
                        <Grid gap={is700?1:2} container justifyContent={'center'} alignContent={'center'}>
                            {
                                products.map((product)=>(
                                    <ProductCard key={product._id} 
                                    id={product._id} 
                                    title={product.title} 
                                    thumbnail={product.thumbnail} 
                                    brand={product.brand.name} 
                                    category={product.category._id}
                                    price={product.price} 
                                    handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}/>
                                ))
                            }
                        </Grid>
                    
                        {/* paginare */}
                        <Stack alignSelf={is488?'center':'flex-end'} mr={is488?0:5} rowGap={2} p={is488?1:0}>
                            {/* <Pagination size={is488?'medium':'large'} page={page}  onChange={(e,page)=>setPage(page)} count={Math.ceil(totalResults/ITEMS_PER_PAGE)} variant="outlined" shape="rounded" /> */}
                            <Pagination
                                size={is488 ? 'medium' : 'large'}
                                page={page}
                                onChange={handlePageChange}
                                count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
                                variant="outlined"
                                shape="rounded"
                            />
                            <Typography textAlign={'center'}>{(page-1)*ITEMS_PER_PAGE+1} - {page*ITEMS_PER_PAGE>totalResults?totalResults:page*ITEMS_PER_PAGE} din {totalResults} de produse</Typography>
                        </Stack>    
                    </>
                )}
            </Stack>
                
        </Stack>
        </>
    }

    </>
  )
}
