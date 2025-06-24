import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus,updateProductByIdAsync } from '../../products/ProductSlice'
import { Button, Grid, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const AddProduct = () => {

    const {register,handleSubmit,reset, watch, formState: { errors }} = useForm()
    const watchSizeInventory = watch(['sizeInventory.XS', 'sizeInventory.S', 'sizeInventory.M', 'sizeInventory.L', 'sizeInventory.XL', 'sizeInventory.OSFA']);
    const [totalStock, setTotalStock] = useState(0);
    const [imageFields, setImageFields] = useState([{ id: 0 }]);


    const dispatch=useDispatch()
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const productAddStatus=useSelector(selectProductAddStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    useEffect(() => {
        if (watchSizeInventory) {
            const total = [
                parseInt(watchSizeInventory[0] || 0),
                parseInt(watchSizeInventory[1] || 0),
                parseInt(watchSizeInventory[2] || 0),
                parseInt(watchSizeInventory[3] || 0),
                parseInt(watchSizeInventory[4] || 0),
                parseInt(watchSizeInventory[5] || 0)
            ].reduce((sum, val) => sum + val, 0);
            setTotalStock(total);
        }
    }, [watchSizeInventory]);

    useEffect(()=>{
        if(productAddStatus==='fulfilled'){
            reset()
            toast.success("New product added")
            navigate("/admin/dashboard")
        }
        else if(productAddStatus==='rejected'){
            toast.error("Error adding product, please try again later")
        }
    },[productAddStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetProductAddStatus())
        }
    },[])


    // TODO: Acum gestioneaza campurile dinamice
    const handleAddProduct = (data) => {
        // calcul stoc total ca suma a cantitatilor pe marimi
        const totalStock = 
        parseInt(data.sizeInventory.XS || 0) +
        parseInt(data.sizeInventory.S || 0) + 
        parseInt(data.sizeInventory.M || 0) + 
        parseInt(data.sizeInventory.L || 0) + 
        parseInt(data.sizeInventory.XL || 0) + 
        parseInt(data.sizeInventory.OSFA || 0);
        
        
        const images = imageFields.map((_, index) => data[`image${index}`]).filter(Boolean);
        
        if (images.length === 0) {
        toast.error("Please provide at least one product image");
        return;
        }
        
        // creare produs nou cu stoc calculat
        const newProduct = {
        ...data,
        images: images,
        stockQuantity: totalStock
        };
        
        // stergere campuri imagini
        imageFields.forEach((_, index) => {
        delete newProduct[`image${index}`];
        });
    
        dispatch(addProductAsync(newProduct));
    };

    const addImageField = () => {
        const newId = imageFields.length > 0 ? 
          Math.max(...imageFields.map(field => field.id)) + 1 : 0;
        setImageFields([...imageFields, { id: newId }]);
      };
      
      const removeImageField = () => {
        if (imageFields.length > 1) {
          const newFields = [...imageFields];
          newFields.pop();
          setImageFields(newFields);
        }
      };

    return (
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
        <Stack width={is1100 ? "100%" : "60rem"} rowGap={4} mt={is480 ? 4 : 6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}>
        
        {/* zona campului */}
        <Stack rowGap={3}>
            <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Titlu</Typography>
            <TextField {...register("title", {required: 'Title is required'})}/>
            </Stack>

            {/* Rubrica cod SKU */}
            <Stack>
                <Typography variant='h6' fontWeight={400} gutterBottom>Cod SKU</Typography>
                <TextField 
                    {...register("sku", {
                        required: "SKU is required", 
                        minLength: {
                            value: 3,
                            message: "SKU must be at least 3 characters"
                        }
                    })}
                    error={!!errors.sku?.message}
                    helperText={errors.sku?.message && (
                        <span style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{marginRight: '5px'}}>⚠️</span>
                            {errors.sku?.message}
                        </span>
                    )}
                />
            </Stack>
    
            <Stack flexDirection={'row'}>
            <FormControl fullWidth>
                <InputLabel id="brand-selection">Brand</InputLabel>
                <Select {...register("brand", {required: "Brand is required"})} labelId="brand-selection" label="Brand">
                {
                    brands.map((brand) => (
                    <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
    
            <FormControl fullWidth>
                <InputLabel id="category-selection">Categorie</InputLabel>
                <Select {...register("category", {required: "category is required"})} labelId="category-selection" label="Category">
                {
                    categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            </Stack>
    
            <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Descriere</Typography>
            <TextField multiline rows={4} {...register("description", {required: "Description is required"})}/>
            </Stack>
    
            <Stack flexDirection={'row'}>
            <Stack flex={1}>
                <Typography variant='h6' fontWeight={400} gutterBottom>Pret</Typography>
                <TextField 
                type='number'
                error={!!errors.price?.message}
                helperText={errors.price?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '5px'}}>⚠️</span>
                    {errors.price?.message}
                    </span>
                )}
                {...register("price", {
                    required: "Price is required",
                    min: {
                    value: 0,
                    message: "Price cannot be negative"
                    },
                    valueAsNumber: true
                })}
                />
            </Stack>
            <Stack flex={1}>
                <Typography variant='h6' fontWeight={400} gutterBottom>Reducere aplicata {is480 ? "%" : "(in procente)"}</Typography>
                <TextField 
                type='number'
                error={!!errors.discountPercentage?.message}
                helperText={errors.discountPercentage?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '5px'}}>⚠️</span>
                    {errors.discountPercentage?.message}
                    </span>
                )}
                {...register("discountPercentage", {
                    required: "Discount percentage is required",
                    min: {
                    value: 0,
                    message: "Discount cannot be negative"
                    },
                    max: {
                    value: 100,
                    message: "Discount cannot exceed 100%"
                    },
                    valueAsNumber: true
                })}
                />
            </Stack>
            </Stack>
    
            <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Cantitate totala stoc (se auto-calculeaza)</Typography>
            <TextField
                type='number'
                value={totalStock}
                disabled
                InputProps={{
                readOnly: true,
                style: { backgroundColor: '#f0f0f0' }
                }}
            />
            <Typography variant="caption" color="textSecondary">
                Aceasta valoare este automat calculata ca suma a cantitatilor marimilor
            </Typography>
            </Stack>
    
            <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Stoc inventar pe marimi</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2.4}>
                <TextField 
                    type='number'
                    label="Cantitate marimea XS"
                    error={!!errors.sizeInventory?.XS?.message}
                    helperText={errors.sizeInventory?.XS?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '5px'}}>⚠️</span>
                        {errors.sizeInventory?.XS?.message}
                    </span>
                    )}
                    {...register("sizeInventory.XS", {
                    required: false,
                    min: {
                        value: 0,
                        message: "Quantity cannot be negative"
                    },
                    valueAsNumber: true,
                    value: 0
                    })}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                <TextField 
                    type='number'
                    label="Cantitate marimea S"
                    error={!!errors.sizeInventory?.S?.message}
                    helperText={errors.sizeInventory?.S?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '5px'}}>⚠️</span>
                        {errors.sizeInventory?.S?.message}
                    </span>
                    )}
                    {...register("sizeInventory.S", {
                    required: false,
                    min: {
                        value: 0,
                        message: "Quantity cannot be negative"
                    },
                    valueAsNumber: true,
                    value: 0
                    })}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                <TextField 
                    type='number'
                    label="Cantitate marimea M"
                    error={!!errors.sizeInventory?.M?.message}
                    helperText={errors.sizeInventory?.M?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '5px'}}>⚠️</span>
                        {errors.sizeInventory?.M?.message}
                    </span>
                    )}
                    {...register("sizeInventory.M", {
                    required: false,
                    min: {
                        value: 0,
                        message: "Quantity cannot be negative"
                    },
                    valueAsNumber: true,
                    value: 0
                    })}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                <TextField 
                    type='number'
                    label="Cantitate marimea L"
                    error={!!errors.sizeInventory?.L?.message}
                    helperText={errors.sizeInventory?.L?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '5px'}}>⚠️</span>
                        {errors.sizeInventory?.L?.message}
                    </span>
                    )}
                    {...register("sizeInventory.L", {
                    required: false,
                    min: {
                        value: 0,
                        message: "Quantity cannot be negative"
                    },
                    valueAsNumber: true,
                    value: 0
                    })}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                <TextField 
                    type='number'
                    label="Cantitate marimea XL"
                    error={!!errors.sizeInventory?.XL?.message}
                    helperText={errors.sizeInventory?.XL?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '5px'}}>⚠️</span>
                        {errors.sizeInventory?.XL?.message}
                    </span>
                    )}
                    {...register("sizeInventory.XL", {
                    required: false,
                    min: {
                        value: 0,
                        message: "Quantity cannot be negative"
                    },
                    valueAsNumber: true,
                    value: 0
                    })}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                <TextField 
                    type='number'
                    label="Cantitate marimea OSFA"
                    error={!!errors.sizeInventory?.OSFA?.message}
                    helperText={errors.sizeInventory?.OSFA?.message && (
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '5px'}}>⚠️</span>
                        {errors.sizeInventory?.OSFA?.message}
                    </span>
                    )}
                    {...register("sizeInventory.OSFA", {
                    required: false,
                    min: {
                        value: 0,
                        message: "Quantity cannot be negative"
                    },
                    valueAsNumber: true,
                    value: 0
                    })}
                />
                </Grid>
            </Grid>
            </Stack>
            
            <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Thumbnail</Typography>
            <TextField {...register("thumbnail", {required: "Thumbnail is required"})}/>
            </Stack>
    
            <Stack>
            <Typography variant='h6' fontWeight={400} gutterBottom>Imagini produs</Typography>
            
            <Stack rowGap={2}>
                {imageFields.map((field, index) => (
                <TextField 
                    key={field.id}
                    label={`Image URL ${index + 1}`}
                    {...register(`image${index}`, {
                    required: "Product image is required"
                    })}
                />
                ))}
            </Stack>
            
            <Stack direction="row" spacing={2} mt={2}>
                <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                onClick={addImageField}
                sx={{ width: '45px', height: '45px', minWidth: 0, borderRadius: '4px' }}
                >
                +
                </Button>
                <Button 
                variant="outlined" 
                startIcon={<RemoveIcon />} 
                onClick={removeImageField}
                disabled={imageFields.length <= 1}
                sx={{ width: '45px', height: '45px', minWidth: 0, borderRadius: '4px' }}
                >
                -
                </Button>
            </Stack>
            </Stack>
        </Stack>
    
        {/* zona unde se realizeaza actiunea */}
        <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
            <Button size={is480 ? 'medium' : 'large'} variant='contained' type='submit'>Adauga produs</Button>
            <Button size={is480 ? 'medium' : 'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Anuleaza</Button>
        </Stack>
        </Stack>
    </Stack>
    )
}
  