import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
type CategoriesProps = {
	value: number;
	onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, onClickCategory }) => {
		useWhyDidYouUpdate('categories', { onClickCategory });
		const categoriesList = [
			'Все',
			'Мясные',
			'Вегетарианская',
			'Гриль',
			'Острые',
			'Закрытые'
		];

		return (
			<div className="categories">
				<ul>
					{categoriesList.map((categroy, index) => (
						<li
							key={index}
							className={value === index ? 'active' : ''}
							onClick={() => onClickCategory(index)}
						>
							{categroy}
						</li>
					))}
				</ul>
			</div>
		);
	}
);

export default Categories;
