import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import Categories from '../components/Categories/Categories';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort, { sortList } from '../components/Sort/Sort';
import { useSelector } from 'react-redux';
import {
	setCategoryId,
	changePagination,
	selectSort,
	setFilters
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/slices/PizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const categoryId = useSelector(selectSort).categoryId;
	const sortId = useSelector(selectSort).sort.sort;
	const searchValue = useSelector(selectSort).searchValue;
	const dispatch = useAppDispatch();
	const pageCount = useSelector(selectSort).pageCount;
	const pizzas = useSelector(selectPizza).items;
	const status = useSelector(selectPizza).status;

	const onChangeCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = (number: number) => {
		dispatch(changePagination(number));
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(obj => obj.sort == params.sortId);
			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
		}
	}, []);

	useEffect(() => {
		const queryString = qs.stringify({
			sortId: sortId,
			categoryId,
			pageCount
		});
		navigate(`?${queryString}`);
	}, [categoryId, sortId, pageCount]);

	useEffect(() => {
		const order = sortId.includes('-') ? 'desc' : 'asc';
		const sortBy = sortId.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : ``;
		const search = searchValue ? `&search=${searchValue}` : '';
		const getPizzas = async () => {
			dispatch(
				fetchPizzas({
					order,
					sortBy,
					category,
					search,
					pageCount
				})
			);
		};
		getPizzas();
	}, [categoryId, sortId, searchValue, pageCount]);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					{' '}
					<h2>
						Страница пустая <span>😕</span>
					</h2>
					<p>Извините за неудобства!</p>
				</div>
			) : (
				<div className="content__items">
					{status === 'loading'
						? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
						: pizzas.map((item: any) => <PizzaBlock key={item.id} {...item} />)}
				</div>
			)}

			<Pagination value={pageCount} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
