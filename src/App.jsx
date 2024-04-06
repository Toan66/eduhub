import { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" exact element={<Home />} />
					{/* Thêm các Route khác tại đây */}
				</Routes>
			</Layout>
		</Router>
	);

}

export default App
