import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";



export const get_orders = createAsyncThunk(
    'order/get_orders',
    async ({ customerId,status }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/coustomer/get-orders/${customerId}/${status}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 


export const get_order_details = createAsyncThunk(
    'order/get_order_details',
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/coustomer/get-order-details/${orderId}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
// End Method 


export const place_order = createAsyncThunk(
    'order/place_order',
    async ({productinfo,navigate}, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(productinfo)
            const { data } = await api.post('/home/order/place-order', productinfo)

            if (productinfo.modeofpayment === 'online') {
                navigate('/payment', {
                    state: {
                        price: productinfo.price + productinfo.shipping_fee,
                        items:productinfo.items,
                        orderId: data.order.id,
                        message: data.message,
                    }
                })
                return fulfillWithValue(data)
            } else {
                navigate('/orderSuccess', {
                    state: {
                        price: productinfo.price + productinfo.shipping_fee,
                        items:productinfo.items,
                        orderId: data.order.id,
                        message: data.message
                    }
                })
                return fulfillWithValue(data)
            }

        } catch (error) {
            console.log(error.response)
            rejectWithValue(error)
        }

    }
)
// End Method 


export const orderReducer = createSlice({
    name: 'order',
    initialState: {
        myOrders: [],
        errorMessage: '',
        successMessage: '',
        loader: false,

        myOrder: {},
        price: '',
        orderId: '',
        items: {},
        data:{},
        order:{}
    },
    reducers: {

        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(get_orders.fulfilled, (state, { payload }) => {
                state.myOrders = payload.orders;
            })
            .addCase(get_order_details.fulfilled, (state, { payload }) => {
                state.myOrder = payload.order;
            })

            .addCase(place_order.pending, (state) => {
                state.loader = true;
            })
            .addCase(place_order.rejected, (state, { payload }) => {
                state.errorMessage = payload.message;
                state.loader = false;
            })
            .addCase(place_order.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.orderId = payload.orderId;
                state.loader = false;
                state.data = payload.modeofpayment === 'online' ? payload.data : '';
                state.order = payload.order;
            })
    }
})
export const { messageClear } = orderReducer.actions
export default orderReducer.reducer