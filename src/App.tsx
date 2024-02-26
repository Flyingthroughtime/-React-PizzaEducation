import { Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import './scss/app.scss';
import NotFound from './Pages/NotFound';
import FullPizza from './Pages/FullPizza';
import MainLayout from './components/Layouts/MainLayout';
import Home from './Pages/Home'

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/pizza/:id" element={<FullPizza />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
