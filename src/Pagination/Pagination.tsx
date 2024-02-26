import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
	value: number;
	onChangePage: (page: number)=>void;
};

const Pagination: React.FC<PaginationProps> = ({ value, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles['root']}
			breakLabel="..."
			nextLabel=">"
			onPageChange={e => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			previousLabel="<"
			forcePage={value - 1}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
