import Login from './Pages/Login'
import Layout from './Components/Layouts/Layout'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom';
import CourseDetail from './Pages/CourseDetail';
import Register from './Pages/Register';
import Courses from './Pages/Courses';
import Unauthorized from './Pages/Unauthorize';
import RequireAuth from './Components/RequireAuth';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>

				{/* public routes */}
				{/* <Route index element={<Home />} /> */}
				<Route path="courses" element={<Courses />} />
				<Route path="/" element={<Home />} />
				<Route path="course/:courseId" element={<CourseDetail />} />
				<Route path="register" element={<Register />} />
				<Route path="unauthorized" element={<Unauthorized />} />


				<Route path="login" element={<Login />} />

				{/* private routes */}
				<Route element={<RequireAuth allowedRoles={["Teacher", "Admin"]} />}>
					
				</Route>


				{/* we want to protect these routes
				<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
					<Route path="/" element={<Home />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
					<Route path="editor" element={<Editor />} />
				</Route>


				<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
					<Route path="admin" element={<Admin />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
					<Route path="lounge" element={<Lounge />} />
				</Route> */}

			</Route>
		</Routes>

	);
}

export default App
