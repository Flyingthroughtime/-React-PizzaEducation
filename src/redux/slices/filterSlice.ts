import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { stat } from 'fs';

enum SortType {
	RATING_ASC = 'rating',
	RATING_DESC = '-rating',
	PRICE_ASC = 'price',
	PRICE_DESC = '-price',
	TITLE_ASC = 'title',
	TITLE_DESC = '-title'
}

type SortItem = {
	name: string;
	sort: SortType;
};

interface initialSliceState {
	searchValue: string;
	categoryId: number;
	pageCount: number;
	sort: SortItem;
}

const initialState: initialSliceState = {
	searchValue: '',
	categoryId: 0,
	pageCount: 1,
	sort: {
		name: 'популярности',
		sort: SortType.RATING_ASC
	}
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		putSort(state, action: PayloadAction<SortItem>) {
			state.sort = action.payload;
		},
		changePagination(state, action: PayloadAction<number>) {
			state.pageCount = action.payload;
		},
		setFilters(state, action) {
			state.pageCount = Number(action.payload.pageCount);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
		}
	}
});

export const selectSort = (state: RootState) => state.filter;

export const {
	setCategoryId,
	putSort,
	changePagination,
	setSearchValue,
	setFilters
} = filterSlice.actions;

export default filterSlice.reducer;
