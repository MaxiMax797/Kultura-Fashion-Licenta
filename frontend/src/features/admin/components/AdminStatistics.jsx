import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatisticsAsync, selectStatistics, selectStatisticsStatus } from '../AdminSlice';
import { Box, Card, CardContent, CardMedia, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/animations/loading.json';
import { OrderStatsChart } from './OrderStatsChart';
import { CategoryStatsChart } from './CategoryStatsChart';


export const AdminStatistics = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(selectStatistics);
    const status = useSelector(selectStatisticsStatus);
    const theme = useTheme();
    
    const is480 = useMediaQuery(theme.breakpoints.down(480));

    useEffect(() => {
        dispatch(fetchStatisticsAsync());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    }, []);

    return (
    <Stack spacing={4} p={is480 ? 2 : 4} mb="5rem">
        <Stack direction="row" alignItems="center" spacing={2}>
            <motion.div whileHover={{ x: -5 }}>
                <IconButton component={Link} to="/admin/dashboard">
                    <ArrowBackIcon fontSize={is480 ? 'medium' : 'large'} />
                </IconButton>
            </motion.div>
            <Typography variant="h4" fontWeight={500}>Statistici Dashboard</Typography>
        </Stack>

        {status === 'pending' ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <Lottie animationData={loadingAnimation} style={{ width: 200 }} />
            </Box>
        ) : (
            <>
                <Grid container spacing={is480 ? 2 : 4}>
                    {/* Cel mai popular produs */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                            <Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white' }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <ShoppingBagIcon />
                                    <Typography variant="h6">Produsul Lunii</Typography>
                                </Stack>
                            </Box>
                            
                            <CardContent>
                                {statistics?.mostBoughtProduct ? (
                                    <>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={statistics.mostBoughtProduct.thumbnail}
                                            alt={statistics.mostBoughtProduct.title}
                                            sx={{ objectFit: 'contain', mb: 2 }}
                                        />
                                        <Typography variant="h6" gutterBottom>{statistics.mostBoughtProduct.title}</Typography>
                                        <Typography variant="body1" color="primary.main" gutterBottom>
                                            {statistics.mostBoughtProduct.price.toFixed(2)} RON
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {statistics.mostBoughtProduct.salesCount} unitati vandute in ultimele 30 de zile
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="body1">Nu exista date disponibile</Typography>
                                )}
                            </CardContent>
                        </Paper>
                    </Grid>

                    {/* Valoarea cosului mediu de cumparaturi */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ height: '100%', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: 'secondary.main', p: 2, color: 'white' }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <ShoppingCartIcon />
                                    <Typography variant="h6">Valoare Medie Cos</Typography>
                                </Stack>
                            </Box>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'calc(100% - 56px)' }}>
                                {statistics?.averageOrderValue ? (
                                    <>
                                        <Typography variant="h3" align="center" gutterBottom>
                                            {statistics.averageOrderValue.toFixed(2)} RON
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">
                                            Valoarea medie a comenzilor finalizate
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="body1" align="center">Nu exista date disponibile</Typography>
                                )}
                            </CardContent>
                        </Paper>
                    </Grid>

                    {/* clientul cu cele mai multe comenzi efectuate */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ height: '100%', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: 'success.main', p: 2, color: 'white' }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <PersonIcon />
                                    <Typography variant="h6">Clientul Premium</Typography>
                                </Stack>
                            </Box>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'calc(100% - 56px)' }}>
                                {statistics?.topCustomer ? (
                                    <>
                                        <Typography variant="h6" gutterBottom>{statistics.topCustomer.name}</Typography>
                                        <Typography variant="body2" gutterBottom>{statistics.topCustomer.email}</Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {statistics.topCustomer.orderCount} comenzi in total
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="body1">Nu exista date disponibile</Typography>
                                )}
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
                
                {/* Poligonul frecventelor (Bar Chart) */}
                <OrderStatsChart />

                {/* Diagrama de tip placinta (Pie Chart)*/}
                <CategoryStatsChart />
            </>
        )}
    </Stack>
    );
};