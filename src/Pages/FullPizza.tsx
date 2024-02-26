import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl : string,
		title: string,
		price: number,
	}>();
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://65bc03ab52189914b5bd7d4c.mockapi.io/Items/${id}`
				);
				setPizza(data);
				console.log(data);
			} catch (error) {
				console.log('error', error);
				setTimeout(() => {
					navigate('/');
				}, 1000);
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <>'Загрузка....'</>;
	}
	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
		</div>
	);
};

export default FullPizza;
