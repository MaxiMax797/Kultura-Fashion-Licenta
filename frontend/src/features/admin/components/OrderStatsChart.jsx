import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchOrderStatsByDateAsync, 
    selectOrderStats, 
    selectOrderStatsStatus,
    selectOrderStatsPeriod,
    setOrderStatsPeriod
} from '../AdminSlice';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    Cell
} from 'recharts';
import { 
    Box, 
    Paper, 
    Typography, 
    ButtonGroup, 
    Button, 
    CircularProgress,
    useTheme
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';

export const OrderStatsChart = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const orderStats = useSelector(selectOrderStats);
    const status = useSelector(selectOrderStatsStatus);
    const currentPeriod = useSelector(selectOrderStatsPeriod);


    const COLORS = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.error.main,
        theme.palette.success.main,
        theme.palette.warning.main,
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042'
    ];


    useEffect(() => {
        dispatch(fetchOrderStatsByDateAsync(currentPeriod));
    }, [dispatch, currentPeriod]);

    const handlePeriodChange = (period) => {
        dispatch(setOrderStatsPeriod(period));
    };
    
    const formatData = (data) => {
        if (!data) return [];
        
        return data.map(item => ({
            date: formatDateLabel(item._id, currentPeriod),
            orders: item.count,
            amount: parseFloat(item.totalAmount.toFixed(2))
        }));
    };
    
    const formatDateLabel = (dateStr, period) => {
        if (period === 'year' || period === 'month') {
            // pentru vizualizarea pe an => listare pe luni
            const [year, month] = dateStr.split('-');
            const date = new Date(year, month - 1);
            return date.toLocaleDateString('ro-RO', { month: 'short', year: 'numeric' });
        } else {
            // pentru vizualizarea pe saptamana => listare pe zile
            const date = new Date(dateStr);
            return date.toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric' });
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Paper elevation={3} sx={{ p: 1.5 }}>
                    <Typography variant="body2">{`Data: ${label}`}</Typography>
                    <Typography variant="body2" color="primary">{`Numar comenzi: ${payload[0].value}`}</Typography>
                    <Typography variant="body2" color="secondary">{`Valoare totala: ${payload[1].value} RON`}</Typography>
                </Paper>
            );
        }
        return null;
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Comenzi pe Perioadă</Typography>
                <ButtonGroup variant="outlined" aria-label="period selection">
                    <Button 
                        startIcon={<CalendarTodayIcon />}
                        onClick={() => handlePeriodChange('week')}
                        variant={currentPeriod === 'week' ? 'contained' : 'outlined'}
                    >
                        7 Zile
                    </Button>
                    <Button 
                        startIcon={<DateRangeIcon />}
                        onClick={() => handlePeriodChange('month')}
                        variant={currentPeriod === 'month' ? 'contained' : 'outlined'}
                    >
                        Luna
                    </Button>
                    <Button 
                        startIcon={<EventIcon />}
                        onClick={() => handlePeriodChange('year')}
                        variant={currentPeriod === 'year' ? 'contained' : 'outlined'}
                    >
                        An
                    </Button>
                </ButtonGroup>
            </Box>

            <Box sx={{ 
    mb: 2, 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}}>
    {/* Legenda din dreapta - nr comenzi - albastru */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box 
            sx={{ 
                width: 16, 
                height: 16, 
                backgroundColor: '#1976d2',
                borderRadius: '2px',
                border: '1px solid rgba(0,0,0,0.1)'
            }} 
        />
        <Typography 
            variant="body2" 
            sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: '0.875rem'
            }}
        >
            Numar Comenzi
        </Typography>
    </Box>

    {/* Legenda din stanga - valoare - rosu/roz */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box 
            sx={{ 
                width: 16, 
                height: 16, 
                backgroundColor: '#dc004e',
                borderRadius: '2px',
                border: '1px solid rgba(0,0,0,0.1)'
            }} 
        />
        <Typography 
            variant="body2" 
            sx={{ 
                color: theme.palette.secondary.main,
                fontWeight: 500,
                fontSize: '0.875rem'
            }}
        >
            Valoare (RON)
        </Typography>
    </Box>
</Box>
            
            {status === 'pending' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                </Box>
            ) : orderStats && orderStats.length > 0 ? (
                <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={formatData(orderStats)}
                            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="date" 
                                angle={-45} 
                                textAnchor="end"
                                height={70}
                            />
                            <YAxis yAxisId="left" orientation="left" stroke={theme.palette.primary.main} />
                            <YAxis yAxisId="right" orientation="right" stroke={theme.palette.secondary.main} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="orders" name="Numar Comenzi" fill="#1976d2" />
                            <Bar yAxisId="right" dataKey="amount" name="Valoare (RON)" fill="#dc004e" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            ) : (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body1">Nu exista date disponibile pentru perioada selectata</Typography>
                </Box>
            )}
        </Paper>
    );
};