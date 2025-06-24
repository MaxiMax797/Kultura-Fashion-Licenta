// import * as React from 'react';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { Paper, List, ListItem, ListItemText, TextField, InputAdornment, Badge, Button, Chip, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters, fetchProductsAsync } from '../../products/ProductSlice';
import { setSearchQuery } from '../../products/ProductSlice';
import AddIcon from '@mui/icons-material/Add'



export const Navbar=({isProductList=false})=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchText, setSearchText] = useState('');
  const userInfo=useSelector(selectUserInfo)
  const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const theme=useTheme()
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const wishlistItems=useSelector(selectWishlistItems)
  const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters=()=>{
    dispatch(toggleFilters())
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
};


const handleSearch = () => {
  if (searchText.trim()) {
      dispatch(setSearchQuery(searchText));
      // Daca ne aflam in HomePage deja, trebuie sa dam trigger la un refetch.
      if (window.location.pathname === '/') {
          dispatch(fetchProductsAsync());
      } else {
          navigate('/');
      }
  }
};


const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
        handleSearch();
    }
};

  const settings = [
    {name:"Acasa",to:"/"},
    {name:'Profil',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
    {name:loggedInUser?.isAdmin?'Comenzi':'Comenzile mele',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
    {name:'Deconectare',to:"/logout"},
  ];

  return (
    <AppBar position="sticky" sx={{backgroundColor:"white",boxShadow:"none",color:"text.primary"}}>
        <Toolbar sx={{p:1,height:"4rem",display:"flex",justifyContent:"space-around"}}>

          <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' },fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
            Kultura Fashion
          </Typography>


          {/* bara de cautare */}
          {}

              <TextField
                  size="small"
                  placeholder="Cauta produse..."
                  value={searchText}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  sx={{ 
                      width: { xs: '50%', sm: '300px' },
                      m: { xs: 1, sm: 2 },
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                      }
                  }}
                  InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                              <IconButton onClick={handleSearch}>
                                  <SearchIcon />
                              </IconButton>
                          </InputAdornment>
                      ),
                  }}
              />

          <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo?.name} src="null" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {
                loggedInUser?.isAdmin && 
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to="/admin/add-product" textAlign="center">Adauga produs nou</Typography>
                </MenuItem>
              
              }
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to={setting.to} textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography variant='h6' fontWeight={300}>{is480?`${userInfo?.name.toString().split(" ")[0]}`:`Buna, ${userInfo?.name}!`}</Typography>
            {loggedInUser.isAdmin && <Button variant='contained'>Admin</Button>}
            <Stack sx={{flexDirection:"row",columnGap:"1rem",alignItems:"center",justifyContent:"center"}}>

            
            {
            cartItems?.length>0 && 
            <Badge  badgeContent={cartItems.length} color='error'>
              <IconButton onClick={()=>navigate("/cart")}>
                <ShoppingCartOutlinedIcon />
                </IconButton>
            </Badge>
            }
            
            {
              !loggedInUser?.isAdmin &&
                  <Stack>
                      <Badge badgeContent={wishlistItems?.length} color='error'>
                          <IconButton component={Link} to={"/wishlist"}><FavoriteBorderIcon /></IconButton>
                      </Badge>
                  </Stack>
            }
            {
              isProductList && <IconButton onClick={handleToggleFilters}><TuneIcon sx={{color:isProductFilterOpen?"black":""}}/></IconButton>
            }

            {/* buton */}
            {loggedInUser?.isAdmin && (
              <Button 
                component={Link} 
                to="/admin/add-product" 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                sx={{ 
                  ml: 2,
                  fontWeight: 'bold', 
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                Adauga produs
              </Button>
            )}
            
            </Stack>
          </Stack>
        </Toolbar>
    </AppBar>
  );
}