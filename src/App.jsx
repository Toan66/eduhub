import Login from './Pages/Login'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" exact element={<Home />} />
			</Routes>
		</Layout>
	);
}

export default App
