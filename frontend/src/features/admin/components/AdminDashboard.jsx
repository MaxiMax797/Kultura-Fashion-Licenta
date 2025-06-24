import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Select, Stack, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, Box, DialogContentText, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import { ProductCard } from '../../products/components/ProductCard'
import { deleteProductByIdAsync, fetchProductsAsync, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters, undeleteProductByIdAsync, selectCurrentProductPage, setCurrentPage } from '../../products/ProductSlice';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import ClearIcon from '@mui/icons-material/Clear';
import { ITEMS_PER_PAGE } from '../../../constants';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../../assets/animations/notFoundPage.json';
import { selectSearchQuery, setSearchQuery } from '../../products/ProductSlice';
import BarChartIcon from '@mui/icons-material/BarChart';

const sortOptions=[
    {name:"Pret crescator", sort:"price", order:"asc"},
    {name:"Pret descrescator", sort:"price", order:"desc"},
]

export const AdminDashBoard = () => {

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    //const [filters,setFilters]=useState({})
    const [filters, setFilters] = useState({
    brand: [],
    category: [],
    gender: []
});
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const [sort,setSort]=useState(null)
    // const [page,setPage]=useState(1)
    const page = useSelector(selectCurrentProductPage);
    const products=useSelector(selectProducts)
    const dispatch=useDispatch()
    const theme=useTheme()
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const isProductFilterOpen=useSelector(selectProductIsFilterOpen)
    const totalResults=useSelector(selectProductTotalResults)
    const searchQuery = useSelector(selectSearchQuery);



    const is1200=useMediaQuery(theme.breakpoints.down(1200))
    const is800=useMediaQuery(theme.breakpoints.down(800))
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const is600=useMediaQuery(theme.breakpoints.down(600))
    const is488=useMediaQuery(theme.breakpoints.down(488))

    // useEffect(()=>{
    //     setPage(1)
    // },[totalResults])

    useEffect(() => {
        dispatch(setCurrentPage(1))
    }, [totalResults, dispatch])

    // useEffect(()=>{
    //     const finalFilters={...filters}

    //     finalFilters['pagination']={page:page,limit:ITEMS_PER_PAGE}
    //     finalFilters['sort']=sort


    //     dispatch(fetchProductsAsync(finalFilters))
        
    // },[filters,sort,page])

    useEffect(() => {
        const finalFilters = {...filters}
    
        finalFilters['pagination'] = {page: page, limit: ITEMS_PER_PAGE}
        finalFilters['sort'] = sort
    
        dispatch(fetchProductsAsync(finalFilters))
        
    }, [filters, sort, page, dispatch])

    const handleBrandFilters=(e)=>{

        const filterSet=new Set(filters.brand)

        if(e.target.checked){filterSet.add(e.target.value)}
        else{filterSet.delete(e.target.value)}

        const filterArray = Array.from(filterSet);
        setFilters({...filters,brand:filterArray})
    }

    const handleCategoryFilters=(e)=>{
        const filterSet=new Set(filters.category)

        if(e.target.checked){filterSet.add(e.target.value)}
        else{filterSet.delete(e.target.value)}

        const filterArray = Array.from(filterSet);
        setFilters({...filters,category:filterArray})
    }

    const handleGenderFilters = (e) => {
        const filterSet = new Set(filters.gender || []);

        if(e.target.checked) {
            filterSet.add(e.target.value);
        } else {
            filterSet.delete(e.target.value);
        }

        const filterArray = Array.from(filterSet);
        setFilters({...filters, gender: filterArray});
}

    // const handleProductDelete=(productId)=>{
    //     dispatch(deleteProductByIdAsync(productId))
    // }

    const handleProductDeleteClick = (product) => {
        setProductToDelete(product);
        setDeleteConfirmOpen(true);
    };

    const confirmDeleteProduct = () => {
        if (productToDelete) {
            dispatch(deleteProductByIdAsync(productToDelete._id));
            setDeleteConfirmOpen(false);
            setProductToDelete(null);
        }
    };
    
    const cancelDeleteProduct = () => {
        setDeleteConfirmOpen(false);
        setProductToDelete(null);
    };

    const handleProductUnDelete=(productId)=>{
        dispatch(undeleteProductByIdAsync(productId))
    }

    const handleFilterClose=()=>{
        dispatch(toggleFilters())
    }


return (
    <>
        <Stack direction="row" justifyContent="flex-end" p={2}>
            <Button
                component={Link}
                to="/admin/statistics"
                variant="contained"
                color="primary"
                startIcon={<BarChartIcon />}
            >
                Statistici
            </Button>
        </Stack>

        <motion.div style={{position:"fixed",backgroundColor:"white",height:"100vh",padding:'1rem',overflowY:"scroll",width:is500?"100vw":"30rem",zIndex:500}}  variants={{show:{left:0},hide:{left:-500}}} initial={'hide'} transition={{ease:"easeInOut",duration:.7,type:"spring"}} animate={isProductFilterOpen===true?"show":"hide"}>
        <Stack mb={'5rem'} sx={{scrollBehavior:"smooth",overflowY:"scroll"}}>
            <Typography variant='h4'>New Arrivals</Typography>
    
            <IconButton onClick={handleFilterClose} style={{position:"absolute",top:15,right:15}}>
            <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                <ClearIcon fontSize='medium'/>
            </motion.div>
            </IconButton>
    
            {/* filtre pe brand */}
            <Stack mt={2}>
            <Accordion>
                <AccordionSummary expandIcon={<AddIcon />} aria-controls="brand-filters" id="brand-filters">
                <Typography>Branduri</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{p:0}}>

                <FormGroup>
                    {brands?.map((brand) => (
                    <motion.div key={brand._id} style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                        <FormControlLabel 
                            sx={{ml:1}} 
                            control={
                                <Checkbox 
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
    
            {/* filtre pe categorie */}
            <Stack mt={2}>
            <Accordion>
                <AccordionSummary expandIcon={<AddIcon />} aria-controls="brand-filters" id="brand-filters">
                <Typography>Categorii</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{p:0}}>
                
                <FormGroup>
                    {categories?.map((category) => (
                    <motion.div key={category._id} style={{width:"fit-content"}} whileHover={{x:5}} whileTap={{scale:0.9}}>
                        <FormControlLabel 
                            sx={{ml:1}} 
                            control={
                                <Checkbox 
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

            <Accordion>
                <AccordionSummary expandIcon={<AddIcon />}>
                    <Typography>Genul</Typography>
                </AccordionSummary>
                <AccordionDetails>

                <FormGroup>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={filters.gender?.includes('men') || false}
                                onChange={handleGenderFilters} 
                                value="men" 
                            />
                        } 
                        label="Barbati" 
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
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
    
        <Stack rowGap={5} mt={is600?2:5} mb={'3rem'}>
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
                Nu au fost gasite rezultate pentru "{searchQuery}"
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
                Cautati folosind alti termeni
            </Typography>
            <Button 
                variant="contained" 
                onClick={() => {
                dispatch(setSearchQuery(''));
                dispatch(fetchProductsAsync());
                }}
            >
                Revino la pagina principala
            </Button>
            </Stack>
        ) : (
            <Grid gap={2} container flex={1} justifyContent={'center'} alignContent={"center"}>
            {products.map((product) => (
                <Stack key={product._id}>
                <Stack sx={{opacity:product.isDeleted?.7:1}}>
                    <ProductCard 
                    key={product._id} 
                    id={product._id} 
                    title={product.title} 
                    thumbnail={product.thumbnail} 
                    brand={product.brand.name} 
                    category={product.category._id}
                    price={product.price} 
                    isAdminCard={true}
                    />
                </Stack>
                <Stack paddingLeft={2} paddingRight={2} flexDirection={'row'} justifySelf={'flex-end'} alignSelf={'flex-end'} columnGap={is488?1:2}>
                    <Button component={Link} to={`/admin/product-update/${product._id}`} variant='contained'>Modifica</Button>
                    {product.isDeleted === true ? (
                    <Button onClick={() => handleProductUnDelete(product._id)} color='error' variant='outlined'>Restaureaza</Button>
                    ) : (
                    <Button 
                        onClick={() => handleProductDeleteClick(product)} 
                        color='error' 
                        variant='outlined'
                    >
                        Elimina
                    </Button>
                    )}
                </Stack>
                </Stack>
            ))}
            </Grid>
        )}
    
        <Dialog
            open={deleteConfirmOpen}
            onClose={cancelDeleteProduct}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Confirmare stergere produs"}
            </DialogTitle>
            <DialogContent>
            {productToDelete && (
                <Stack direction="column" spacing={2} alignItems="center">
                <Box
                    component="img"
                    sx={{
                    height: 140,
                    objectFit: 'contain',
                    }}
                    alt={productToDelete.title}
                    src={productToDelete.thumbnail}
                />
                <DialogContentText id="alert-dialog-description">
                    Sunteti sigur ca doriti sa stergeti "{productToDelete.title}"?
                </DialogContentText>
                </Stack>
            )}
            </DialogContent>
            <DialogActions>
            <Button onClick={cancelDeleteProduct} color="primary">
                Nu
            </Button>
            <Button onClick={confirmDeleteProduct} color="error" autoFocus>
                Da
            </Button>
            </DialogActions>
        </Dialog>
    
        <Stack alignSelf={is488?'center':'flex-end'} mr={is488?0:5} rowGap={2} p={is488?1:0}>
            {/* <Pagination size={is488?'medium':'large'} page={page} onChange={(e,page)=>setPage(page)} count={Math.ceil(totalResults/ITEMS_PER_PAGE)} variant="outlined" shape="rounded" /> */}
            <Pagination 
                size={is488?'medium':'large'} 
                page={page} 
                onChange={(e, newPage) => dispatch(setCurrentPage(newPage))} 
                count={Math.ceil(totalResults/ITEMS_PER_PAGE)} 
                variant="outlined" 
                shape="rounded" 
                />
            <Typography textAlign={'center'}>{(page-1)*ITEMS_PER_PAGE+1} - {page*ITEMS_PER_PAGE>totalResults?totalResults:page*ITEMS_PER_PAGE} din {totalResults} de produse</Typography>
        </Stack>
        </Stack>
    </>
    );
}