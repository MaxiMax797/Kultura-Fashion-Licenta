import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import { 
    fetchCategoryStatsByDateAsync, 
    selectCategoryStats, 
    selectCategoryStatsStatus,
    selectCategoryStatsPeriod,
    setCategoryStatsPeriod
} from '../AdminSlice';
import { 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    Sector
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


export const CategoryStatsChart = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const categoryStats = useSelector(selectCategoryStats);
    const status = useSelector(selectCategoryStatsStatus);
    const currentPeriod = useSelector(selectCategoryStatsPeriod);
    const [activeIndex, setActiveIndex] = useState(null);

    const CATEGORY_NAME_COLORS = {
    "Sepci": "#FF6B6B",
    "Tenisi": "#4ECDC4",
    "Ochelari de soare": "#FFD166",
    "Pantaloni": "#118AB2",
    "Hanorace": "#6A0572",
    "Camasi": "#06D6A0",
    "Cizme": "#EF476F",
    "Incaltaminte": "#EF476F",
    "Rucsacuri": "#073B4C",
    "Papuci": "#FB8500",
    "Palarii": "#8338EC",
    "Altele": theme.palette.grey[500]
};

    useEffect(() => {
        dispatch(fetchCategoryStatsByDateAsync(currentPeriod));
    }, [dispatch, currentPeriod]);

    const handlePeriodChange = (period) => {
        dispatch(setCategoryStatsPeriod(period));
    };
    
    const formatData = (data) => {
        if (!data || !data.length) return [];
        
        const total = data.reduce((sum, item) => sum + item.count, 0);
        
        return data.map((item, index) => ({
            name: item.categoryName,
            value: item.count,
            percentage: ((item.count / total) * 100).toFixed(1),
            amount: item.totalAmount.toFixed(2),
            fill: CATEGORY_NAME_COLORS[item.categoryName] || CATEGORY_NAME_COLORS["Altele"]
        }));
    };

    const onPieEnter = (_, index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const renderActiveShape = (props) => {
        const { 
            cx, cy, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value 
        } = props;
        
        const midAngle = (startAngle + endAngle) / 2;
        const sin = Math.sin(-midAngle * Math.PI / 180);
        const cos = Math.cos(-midAngle * Math.PI / 180);
        const tx = cx + cos * 30; //30 pixeli
        const ty = cy + sin * 30;
        const textX = cx * 1.5; 
        const textY = cy - 20;

        return (
            <g>
                {/* translatie */}
                <g transform={`translate(${tx - cx}, ${ty - cy})`}>
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius + 5}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                        stroke={theme.palette.common.white}
                        strokeWidth={3}
                    />
                </g>
                

                {/* Adaugare legenda partea dreapta container */}
            <g>
                <text
                    x={textX}
                    y={textY}
                    dy={8}
                    textAnchor="middle"
                    fill={theme.palette.text.primary}
                    style={{ fontWeight: 'bold' }}
                >
                    {payload.name}
                </text>
                <text
                    x={textX}
                    y={textY + 25}
                    dy={8}
                    textAnchor="middle"
                    fill={theme.palette.text.primary}
                >
                    {`${value} (${(percent * 100).toFixed(1)}%)`}
                </text>
                <text
                    x={textX}
                    y={textY + 50}
                    dy={8}
                    textAnchor="middle"
                    fill={theme.palette.secondary.main}
                >
                    {`${payload.amount} RON`}
                </text>
            </g>
        </g>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <Paper elevation={3} sx={{ p: 1.5 }}>
                    <Typography variant="body2">{`Categorie: ${payload[0].name}`}</Typography>
                    <Typography variant="body2" color="primary">{`Cantitate: ${payload[0].value} (${payload[0].payload.percentage}%)`}</Typography>
                    <Typography variant="body2" color="secondary">{`Valoare: ${payload[0].payload.amount} RON`}</Typography>
                </Paper>
            );
        }
        return null;
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Distributia produselor pe categorii</Typography>
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
            
            {status === 'pending' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                </Box>
            ) : categoryStats && categoryStats.length > 0 ? (
                <Box sx={{ height: 550 /* inaltime container */}}> 
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ left: 30, right: 600, top: 0, bottom: 0 /*pentru a micsora distanta dintre piechart si legenda de culori => right margin*/ }}>
                            <Pie
                                data={formatData(categoryStats)}
                                dataKey="value"
                                nameKey="name"
                                cx="50%" // pozitionare orizontala diagrama tip placinta
                                cy="40%" // pozitionare verticala diagrama tip placinta
                                outerRadius={150}
                                labelLine={true}

                                //VAR 2 -> CLICK PE UN SLICE = STATISTICILE DISPAR
                                // label={activeIndex === null ? (entry) => {
                                //     return `${entry.name}: ${entry.percentage}%`;
                                // } : false}

                                label={({ name, percentage, index }) => {
                                    return activeIndex === index ? null : `${name}: ${percentage}%`;
                                }}

                                labelRadius={230}
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onClick={onPieEnter}
                                animationDuration={1500}
                                animationBegin={0}
                                animationEasing="ease-out"

                                // VAR4 -> DACA VREAU SA FIE SCRIS MAI DEPARTE DE PIECHART label={({ cx, cy, midAngle, outerRadius, name, percentage }) => {
                                //     const RADIAN = Math.PI / 180;
                                //     const radius = outerRadius + 80;
                                //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                //     const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    
                                //     return (
                                //         <text 
                                //             x={x} 
                                //             y={y} 
                                //             fill={theme.palette.text.primary}
                                //             textAnchor={x > cx ? 'start' : 'end'} 
                                //             dominantBaseline="central"
                                //             fontSize="12px"
                                //         >
                                //             {`${name}: ${percentage}%`}
                                //         </text>
                                //     );
                                // }}
                                // activeIndex={activeIndex}
                                // activeShape={renderActiveShape}
                                // onClick={onPieEnter}
                                // animationDuration={800}
                                // animationBegin={0}
                                // animationEasing="ease-out"
                                >
                                {formatData(categoryStats).map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.fill}
                                        stroke={activeIndex === index ? theme.palette.common.white : 'none'}
                                        strokeWidth={activeIndex === index ? 2 : 0}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            
                            <Legend 
                                layout="vertical" 
                                align="left"
                                verticalAlign="middle"
                                iconType="circle"
                                wrapperStyle={{
                                    paddingLeft: "500px",
                                    paddingRight: "10px",
                                    lineHeight: "2.5" //spatiul dintre etichetele de culori legenda
                                }}
                                
                                itemStyle={{ 
                                    fontSize: "18px", // Dimensiune font pentru legenda
                                    fontWeight: "500",
                                    color: theme.palette.text.primary,
                                    margin: "15px 0"
                                }}
                            />
                        </PieChart>
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