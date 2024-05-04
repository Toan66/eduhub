import Login from './Pages/Login'
import Layout from './Components/Layouts/Layout'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom';
import CourseDetail from './Pages/Course/CourseDetail';
import Register from './Pages/Register';
import Courses from './Pages/Course/Courses';
import Unauthorized from './Pages/Unauthorize';
import RequireAuth from './Components/RequireAuth';
import Profile from './Pages/User/Profile';
import CreateCourse from './Pages/Course/CreateCourse';
import CreateChapter from './Pages/Chapter/CreateChapter';
import CreateLesson from './Pages/Lesson/CreateLesson';
import CourseEditor from './Pages/Course/CourseEditor';
import ChapterEditor from './Pages/Chapter/ChapterEditor';
import UserEditor from './Pages/User/UserEditor';
import Page404 from './Pages/Page404';
import UserDetail from './Pages/User/UserDetail';
import LessonEditor from './Pages/Lesson/LessonEditor';
import CreateTest from './Pages/Test/CreateTest';
import TestEditor from './Pages/Test/TestEditor';
import TestForm from './Pages/TestForm';

function App() {
	return (
		<Routes>
			<Route path="/Unauthorized" element={<Unauthorized />} />
			<Route path="*" element={<Page404 />} />
			<Route path="/" element={<Layout />}>

				{/* public routes */}
				{/* <Route index element={<Home />} /> */}
				<Route path="/" element={<Home />} />
				<Route path="Course" element={<Courses />} />
				<Route path="Course/:courseId" element={<CourseDetail />} />
				<Route path="User/:userId" element={<UserDetail />} />
				<Route path="Register" element={<Register />} />
				<Route path="Login" element={<Login />} />


				{/* private routes */}
				<Route element={<RequireAuth allowedRoles={["Teacher", "Admin", "Student"]} />}>
					<Route path="Profile" element={<Profile />} />
					<Route path="User/:userId/Edit" element={<UserEditor />} />
				</Route>

				<Route path="Course/Create" element={<CreateCourse />} />
				<Route path="Course/:courseId/Edit" element={<CourseEditor />} />
				<Route path="Course/:courseId/Chapter/Create" element={<CreateChapter />} />
				<Route path="Chapter/:chapterId/Edit" element={<ChapterEditor />} />
				<Route path="Chapter/:chapterId/Lesson/Create" element={<CreateLesson />} />
				<Route path="Lesson/:lessonId/Edit" element={<LessonEditor />} />
				<Route path="Chapter/:chapterId/Test/Create" element={<TestForm />} />
				<Route path="Test/:testId/Edit" element={<TestEditor />} />

				<Route path="TestForm" element={<TestForm />} />






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
