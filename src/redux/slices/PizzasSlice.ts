import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface fetchPizzasParams {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	pageCount: number;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], fetchPizzasParams>(
	'pizza/fetchPizzasStatus',
	async params => {
		const { order, sortBy, category, search, pageCount } = params;
		const { data } = await axios.get<PizzaItem[]>(
			`https://65bc03ab52189914b5bd7d4c.mockapi.io/Items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

type PizzaItem = {
	id: string;
	title: string;
	price: number;
	sizes: number[];
	types: number[];
	imageUrl: string;
};

enum PizzaStatus {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface PizzaSliceState {
	items: PizzaItem[];
	status: PizzaStatus;
}

const initialState: PizzaSliceState = {
	items: [],
	status: PizzaStatus.LOADING
};

export const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = PizzaStatus.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = PizzaStatus.SUCCESS;
			state.items = action.payload;
		});
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = PizzaStatus.ERROR;
			state.items = [];
		});
	}
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
