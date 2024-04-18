import Login from './Pages/Login'
import Layout from './Components/Layouts/Layout'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom';
import CourseDetail from './Pages/CourseDetail';
import Register from './Pages/Register';
import Courses from './Pages/Courses';
import Unauthorized from './Pages/Unauthorize';
import RequireAuth from './Components/RequireAuth';
import Dashboard from './Pages/Dashboard';
import CreateCourse from './Pages/CreateCourse';
import CreateChapter from './Pages/CreateChapter';
import CreateLesson from './Pages/CreateLesson';
import CourseEditor from './Pages/CourseEditor';
import ChapterEditor from './Pages/ChapterEditor';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>

				{/* public routes */}
				{/* <Route index element={<Home />} /> */}
				<Route path="Course" element={<Courses />} />
				<Route path="/" element={<Home />} />
				<Route path="Course/:courseId" element={<CourseDetail />} />
				<Route path="Register" element={<Register />} />
				<Route path="Unauthorized" element={<Unauthorized />} />
				<Route path="Login" element={<Login />} />

				{/* private routes */}
				<Route element={<RequireAuth allowedRoles={["Teacher", "Admin", "Student"]} />}>
					<Route path="Dashboard" element={<Dashboard />} />
				</Route>

				<Route path="Course/Create" element={<CreateCourse />} />
				<Route path="Course/:courseId/Edit" element={<CourseEditor />} />
				<Route path="Course/:courseId/Chapter/Create" element={<CreateChapter />} />
				<Route path="Chapter/:chapterId/Edit" element={<ChapterEditor />} />
				<Route path="Chapter/:chapterId/Lesson/Create" element={<CreateLesson />} />


				{/* <Route element={<RequireAuth allowedRoles={["Teacher", "Admin"]} />}>
					<Route path="Course/Create" element={<CreateCourse />} />
					<Route path="Course/:courseId/Edit" element={<CourseEditor />} />
					<Route path="Course/:courseId/Chapter/Create" element={<CreateChapter />} />
					<Route path="Chapter/:chapterId/Edit" element={<ChapterEditor />} />
					<Route path="Chapter/:chapterId/Lesson/Create" element={<CreateLesson />} />
				</Route> */}

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
