import styles from './Search.module.scss';
import iconSearch from '../../assets/img/icons-search.svg';
import iconClose from '../../assets/img/close.svg';
import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
	const dispatch = useDispatch();
	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

	const onclickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	const updateSearchValue = useCallback(
		debounce((value:string) => {
			dispatch(setSearchValue(value));
		}, 2000),
		[]
	);

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};
	return (
		<div className={styles['root']}>
			<img className={styles['icon']} src={iconSearch} alt="Иконка-поиск" />
			<input
				ref={inputRef}
				className={styles['input']}
				placeholder="Поиск...."
				value={value}
				onChange={changeInput}
			/>
			{value && (
				<img
					className={styles['close']}
					src={iconClose}
					onClick={onclickClear}
					alt="Иконка-закрыть"
				/>
			)}
		</div>
	);
}

export default Search;
