import Login from './Pages/Login'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom';
import CourseDetail from './Pages/CourseDetail';
import { useState, useEffect } from 'react';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/course/:courseId" element={<CourseDetail />} />
			</Routes>
		</Layout>
	);
}

export default App
