import Login from './Pages/Login'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom';
import CourseDetail from './Pages/CourseDetail';
import Register from './Pages/Register';
import Courses from './Pages/Courses';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/courses" element={<Courses />} />
				<Route path="/course/:courseId" element={<CourseDetail />} />
			</Routes>
		</Layout>
	);
}

export default App
