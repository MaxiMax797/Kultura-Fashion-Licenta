import React, { useState } from 'react';
import { Stack, TextField, Typography, Button, Box, useTheme, useMediaQuery, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrderAsync } from '../../order/OrderSlice';
import { resetCartByUserIdAsync } from '../../cart/CartSlice';
import VisaIcon from '@mui/icons-material/CreditCard';
import MastercardIcon from '@mui/icons-material/Payment';
import AmexIcon from '@mui/icons-material/CardMembership';
import Radio from '@mui/material/Radio';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';


export const CardPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  
  const { orderData } = location.state || {};
  
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [yearMenuOpen, setYearMenuOpen] = useState(false);


  if (!orderData) {
    return (
      <Stack sx={{ p: 4, alignItems: 'center' }}>
        <Typography variant="h6">Date de plata lipsa</Typography>
        <Button component={Link} to="/checkout" variant="contained" sx={{ mt: 2 }}>
          Inapoi la checkout
        </Button>
      </Stack>
    );
  }

  const getExpiryDate = () => {
    return `${expiryMonth}/${expiryYear}`;
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 12; i++) {
      years.push(currentYear + i);
    }
    return years;
  };


const handleCardNumberChange = (e) => {
    // stergere spatii & litere
    let value = e.target.value.replace(/\D/g, '');
    
    // Adaugare spatiu dupa 4 cifre
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    
    // In total vor fi 19 caractere (16 cifre + 3 spatii)
    setCardNumber(value.substring(0, 19));
  };


const handleCardPayment = (e) => {
    e.preventDefault();
    
    const expiryDate = getExpiryDate();

    if (!orderData) {
      toast.error('Datele comenzii lipsesc. Va rugam sa va intoarceti la pagina de checkout.');
      navigate('/checkout');
      return;
    }
    
    // Validare detalii card
    if (!cardholderName || !cardNumber || !expiryDate || !securityCode) {
      toast.error('Completati toate detaliile cardului');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulare procesare plata
    setTimeout(() => {
      toast.success('Plata procesata cu succes!');
      
      // creare comanda cu informatiile de plata
      const orderWithPayment = {
        ...orderData,
        paymentMode: 'CARD',
        paymentId: 'card-' + Date.now() // generare ID
      };
      
      dispatch(createOrderAsync(orderWithPayment));
      
      // Navigare catre pagina de order success page
      if (orderData.userId) {
        dispatch(resetCartByUserIdAsync(orderData.userId));
      }
      
      navigate('/checkout');
      
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <Stack 
      sx={{ 
        maxWidth: '800px', 
        mx: 'auto', 
        p: 3, 
        my: 4 
      }}
    >
      <Stack flexDirection="row" alignItems="center" mb={3}>
        <IconButton component={Link} to="/checkout">
          <ArrowBackIcon fontSize={is480 ? "medium" : 'large'} />
        </IconButton>
        <Typography variant="h4" ml={1}>Plata cu cardul</Typography>
      </Stack>
      
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Alegeti o metoda de plata
        </Typography>
        
        <Stack flexDirection="row" justifyContent="flex-start" alignItems="center" mb={3}>
          <Radio checked={true} name="cardType" />
          <Typography>Card de credit sau de debit</Typography>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <VisaIcon />
            <MastercardIcon />
            <AmexIcon />
          </Box>
        </Stack>
        
        <Stack 
          component="form" 
          onSubmit={handleCardPayment}
          spacing={3}
        >
          <Stack>
            <Typography gutterBottom>Numele titularului de card</Typography>
            <TextField 
              fullWidth 
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Introduceți numele dvs."
              required
            />
            <Typography variant="caption" color="text.secondary">
              Introduceti numele exact asa cum apare pe card
            </Typography>
          </Stack>
          

        <Stack>
        <Typography gutterBottom>Numarul cardului</Typography>
        <TextField 
            fullWidth 
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            inputProps={{ 
            maxLength: 19,
            inputMode: 'numeric'
            }}
            required
        />
        </Stack>


        {}

        <Stack direction="row" spacing={2}>
        <Stack sx={{ width: '50%' }}>
            <Typography gutterBottom>Expiry date</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
            <FormControl sx={{ width: '45%' }}>
                <Select
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                displayEmpty
                MenuProps={{
                    PaperProps: {
                    style: {
                        maxHeight: 300
                    }
                    }
                }}
                open={monthMenuOpen}
                onClose={() => setMonthMenuOpen(false)}
                onOpen={() => setMonthMenuOpen(true)}
                renderValue={(selected) => {
                    if (!selected) {
                    return <Typography color="text.secondary">MM</Typography>;
                    }
                    return selected;
                }}
                >
                {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((month) => (
                    <MenuItem key={month} value={month}>
                    {month} - {
                        {
                        '01': 'Ianuarie', '02': 'Februarie', '03': 'Martie', 
                        '04': 'Aprilie', '05': 'Mai', '06': 'Iunie',
                        '07': 'Iulie', '08': 'August', '09': 'Septembrie',
                        '10': 'Octombrie', '11': 'Noiembrie', '12': 'Decembrie'
                        }[month]
                    }
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            
            <Typography variant="body1">/</Typography>
            
            <FormControl sx={{ width: '55%' }}>
                <Select
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                displayEmpty
                MenuProps={{
                    PaperProps: {
                    style: {
                        maxHeight: 300
                    }
                    }
                }}
                open={yearMenuOpen}
                onClose={() => setYearMenuOpen(false)}
                onOpen={() => setYearMenuOpen(true)}
                renderValue={(selected) => {
                    if (!selected) {
                    return <Typography color="text.secondary">YYYY</Typography>;
                    }
                    return selected;
                }}
                >
                {getYearOptions().map((year) => (
                    <MenuItem key={year} value={year.toString()}>
                    {year}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Stack>
        </Stack>
        
        <Stack sx={{ width: '50%' }}>
            <Typography gutterBottom>CVV</Typography>
            <TextField 
            fullWidth
            value={securityCode}
            onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                setSecurityCode(value);
                }
            }}
            placeholder="CVC"
            inputProps={{ 
                maxLength: 4,
                inputMode: 'numeric'
            }}
            required
            />
        </Stack>
        </Stack>

          
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Detalii comanda:</Typography>
            <Typography>Total: {orderData.total} RON</Typography>
          </Box>
          
          <Button 
            type="submit"
            variant="contained" 
            size="large"
            fullWidth
            disabled={isProcessing}
            sx={{ mt: 2 }}
          >
            {isProcessing ? 'Procesare...' : 'Platește si trimite comanda'}
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};