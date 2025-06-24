import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { fetchStatistics, fetchOrderStatsByDate } from './AdminApi';
import { axiosi } from '../../config/axios';


export const fetchStatisticsAsync = createAsyncThunk(
    'admin/fetchStatistics',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchStatistics();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchOrderStatsByDateAsync = createAsyncThunk(
    'admin/fetchOrderStatsByDate',
    async (period, { rejectWithValue }) => {
        try {
            const response = await fetchOrderStatsByDate(period);
            return { period, data: response };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchCategoryStatsByDateAsync = createAsyncThunk(
    'admin/fetchCategoryStatsByDate',
    async (period = 'week', { rejectWithValue }) => {
        try {
            const response = await axiosi.get(`/statistics/category-stats?period=${period}`);
            return {
                data: response.data.data,
                period: response.data.period
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch category statistics');
        }
    }
);


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        statistics: null,
        statisticsStatus: 'idle',
        statisticsError: null, 
        orderStats: null,
        orderStatsStatus: 'idle',
        orderStatsError: null,
        orderStatsPeriod: 'year',
        categoryStats: [],
        categoryStatsStatus: 'idle',
        categoryStatsPeriod: 'week',
        categoryStatsError: null
    },
    reducers: {
        setOrderStatsPeriod: (state, action) => {
            state.orderStatsPeriod = action.payload;
        }    
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatisticsAsync.pending, (state) => {
                state.statisticsStatus = 'pending';
            })
            .addCase(fetchStatisticsAsync.fulfilled, (state, action) => {
                state.statisticsStatus = 'fulfilled';
                state.statistics = action.payload;
            })
            .addCase(fetchStatisticsAsync.rejected, (state, action) => {
                state.statisticsStatus = 'rejected';
                state.statisticsError = action.payload;
            })
            .addCase(fetchOrderStatsByDateAsync.pending, (state) => {
                state.orderStatsStatus = 'pending';
            })
            .addCase(fetchOrderStatsByDateAsync.fulfilled, (state, action) => {
                state.orderStatsStatus = 'fulfilled';
                state.orderStats = action.payload.data;
                state.orderStatsPeriod = action.payload.period;
            })
            .addCase(fetchOrderStatsByDateAsync.rejected, (state, action) => {
                state.orderStatsStatus = 'rejected';
                state.orderStatsError = action.payload;
            })
            .addCase(setCategoryStatsPeriod, (state, action) => {
                state.categoryStatsPeriod = action.payload;
            })
            .addCase(fetchCategoryStatsByDateAsync.pending, (state) => {
                state.categoryStatsStatus = 'pending';
            })
            .addCase(fetchCategoryStatsByDateAsync.fulfilled, (state, action) => {
                state.categoryStatsStatus = 'fulfilled';
                state.categoryStats = action.payload.data;
                state.categoryStatsPeriod = action.payload.period;
            })
            .addCase(fetchCategoryStatsByDateAsync.rejected, (state, action) => {
                state.categoryStatsStatus = 'rejected';
                state.categoryStatsError = action.payload;
            });
        }
});


export const { setOrderStatsPeriod } = adminSlice.actions;
export const setCategoryStatsPeriod = createAction('admin/setCategoryStatsPeriod');



export const selectStatistics = (state) => state.AdminSlice?.statistics;
export const selectStatisticsStatus = (state) => state.AdminSlice?.statisticsStatus;
export const selectOrderStats = (state) => state.AdminSlice?.orderStats;
export const selectOrderStatsStatus = (state) => state.AdminSlice?.orderStatsStatus;
export const selectOrderStatsPeriod = (state) => state.AdminSlice?.orderStatsPeriod;
export const selectCategoryStats = (state) => state.AdminSlice?.categoryStats;
export const selectCategoryStatsStatus = (state) => state.AdminSlice?.categoryStatsStatus;
export const selectCategoryStatsPeriod = (state) => state.AdminSlice?.categoryStatsPeriod;


export default adminSlice.reducer;