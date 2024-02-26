import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putSort, selectSort } from '../../redux/slices/filterSlice';

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

export const sortList: SortItem[] = [
	{ name: 'популярности (возрастание)', sort: SortType.RATING_ASC },
	{ name: 'популярности (убывание)', sort: SortType.RATING_DESC },
	{
		name: 'цене (возрастание)',
		sort: SortType.PRICE_ASC
	},
	{
		name: 'цене (убывание)',
		sort: SortType.PRICE_DESC
	},
	{
		name: 'алфавиту (возрастание)',
		sort: SortType.TITLE_ASC
	},
	{
		name: 'алфавиту (убывание)',
		sort: SortType.TITLE_DESC
	}
];
const Sort = () => {
	const sortId = useSelector(selectSort).sort;
	const sortRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const onClickSortActive = (obj: SortItem) => {
		dispatch(putSort(obj));
		setOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{sortId.name}</span>
			</div>
			{open && (
				<div className="sort__popup">
					<ul>
						{sortList.map((obj, i) => (
							<li
								key={i}
								className={sortId.sort === obj.sort ? 'active' : ''}
								onClick={() => onClickSortActive(obj)}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
