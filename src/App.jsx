import Login from "./Pages/Login";
import Layout from "./Components/Layouts/Layout";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "./Pages/Course/CourseDetail";
import Register from "./Pages/Register";
import Courses from "./Pages/Course/Courses";
import Unauthorized from "./Pages/Unauthorize";
import RequireAuth from "./Components/RequireAuth";
import Profile from "./Pages/User/Profile";
import CreateCourse from "./Pages/Course/CreateCourse";
import CreateChapter from "./Pages/Chapter/CreateChapter";
import CreateLesson from "./Pages/Lesson/CreateLesson";
import CourseEditor from "./Pages/Course/CourseEditor";
import ChapterEditor from "./Pages/Chapter/ChapterEditor";
import UserEditor from "./Pages/User/UserEditor";
import Page404 from "./Pages/Page404";
import UserDetail from "./Pages/User/UserDetail";
import LessonEditor from "./Pages/Lesson/LessonEditor";
import CreateTest from "./Pages/Test/CreateTest";
import TestEditor from "./Pages/Test/TestEditor";
import TestForm from "./Pages/TestForm";
import TeacherDetail from "./Pages/User/TeacherDetail";
import CoursePreview from "./Pages/Course/CoursePreview";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UnapprovalCourses from "./Pages/Admin/CourseApproval/UnapprovalCourses";
import MyCourse from "./Pages/Course/MyCourse";
import CoursePayment from "./Pages/Payment/CoursePayment";
import LayoutLearn from "./Components/Layouts/LayoutLearn";
import CourseLearn from "./Pages/Learn/CourseLearn";
import ChapterLearn from "./Pages/Learn/ChapterLearn";
import LessonLearn from "./Pages/Learn/LessonLearn";
import TestLearn from "./Pages/Learn/TestLearn";
import PaymentResult from "./Pages/Payment/PaymentResult";
import MyOrder from "./Pages/Payment/MyOrder";
import OrderPay from "./Pages/Payment/OrderPay";
import DashBoard from "./Pages/User/DashBoard";
import TestResult from "./Pages/Learn/TestResult";
import ReviewForm from "./Pages/Review/ReviewForm";
import LayoutDashBoard from "./Components/Layouts/DashboardLayout/LayoutDashboard";
import MyCourses from "./Pages/Dashboard/MyCourses";
import MyOrders from "./Pages/Dashboard/MyOrders";
import CreatedCourse from "./Pages/Dashboard/Teacher/CreatedCourse";
import LayoutAdminDashboard from "./Components/Layouts/AdminDashboard/LayoutAdminDashboard";
import LayoutTeacherDashboard from "./Components/Layouts/TeacherDashboard/LayoutTeacherDashboard";
import AllCourse from "./Pages/Admin/CourseApproval/AllCourse";
import TeacherDashboard from "./Pages/Dashboard/Teacher/TeacherDashboard";
import Certificate from "./Pages/Certificate/Certificate";
import SearchResult from "./Pages/SearchResult";
import CourseCategory from "./Pages/CourseCategory";
import AboutUs from "./Pages/AboutUs";


function App() {
	return (
		<Routes>
			<Route path="/Unauthorized" element={<Unauthorized />} />
			<Route path="*" element={<Page404 />} />

			{/* Normal Layout */}
			<Route path="/" element={<Layout />}>
				{/* public routes */}

				<Route path="/" element={<Home />} />
				<Route path="Course" element={<Courses />} />
				<Route path="Course/:courseId" element={<CourseDetail />} />
				<Route path="User/:userId" element={<UserDetail />} />
				<Route path="Register" element={<Register />} />
				<Route path="Login" element={<Login />} />
				<Route path="Teacher/:userId" element={<TeacherDetail />} />
				<Route path="Search" element={<SearchResult />} />
				<Route path="PaymentResult" element={<PaymentResult />} />
				<Route path="Category/:categoryId" element={<CourseCategory />} />
				<Route path="AboutUs" element={<AboutUs />} />



				{/* private routes */}
				<Route element={<RequireAuth allowedRoles={["Teacher", "Admin", "Student"]} />} >
					<Route path="Profile" element={<Profile />} />
					<Route path="User/:userId/Edit" element={<UserEditor />} />
					<Route path="Order" element={<CoursePayment />} />
					<Route path="MyOrder" element={<MyOrder />} />
					<Route path="Order/:orderId/Payment" element={<OrderPay />} />
					<Route path="Course/:courseId/Review" element={<ReviewForm />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={["Teacher", "Admin"]} />}>
					{/* <Route path="Course/Create" element={<CreateCourse />} />
					<Route path="Course/:courseId/Edit" element={<CourseEditor />} />
					<Route path="Course/:courseId/Chapter/Create" element={<CreateChapter />} />
					<Route path="Chapter/:chapterId/Edit" element={<ChapterEditor />} />
					<Route path="Chapter/:chapterId/Lesson/Create" element={<CreateLesson />} />
					<Route path="Chapter/:chapterId/Test/Create" element={<TestForm />} />
					<Route path="Lesson/:lessonId/Edit" element={<LessonEditor />} />
					<Route path="Test/:testId/Edit" element={<TestEditor />} />
					<Route path="TestForm" element={<TestForm />} />
					<Route path="Course/:courseId/Preview" element={<CoursePreview />} />
					<Route path="Teacher/MyCourse" element={<MyCourse />} /> */}
				</Route>
			</Route>


			{/* Dashboard Layout */}
			<Route path="/" element={<LayoutDashBoard />}>
				<Route element={<RequireAuth allowedRoles={["Teacher", "Admin", "Student"]} />} >
					<Route path="DashBoard" element={<DashBoard />} />
					<Route path="DashBoard/MyCourses" element={<MyCourses />} />
					<Route path="DashBoard/Order" element={<MyOrders />} />
				</Route>
			</Route>

			{/* Admin Dashboard Layout*/}
			<Route path="/" element={<LayoutAdminDashboard />}>
				<Route element={<RequireAuth allowedRoles={["Admin"]} />}>
          <Route path="Admin/DashBoard" element={<AdminDashboard />} />
          <Route path="Admin/UnapprovalCourses" element={<UnapprovalCourses />} />
					<Route path="Admin/CreatedCourse" element={<CreatedCourse />} />
					<Route path="Admin/AllCourse" element={<AllCourse />} />
        </Route>
			</Route>

			{/* Teacher Dashboard Layout*/}
			<Route path="/" element={<LayoutTeacherDashboard />}>
        <Route element={<RequireAuth allowedRoles={["Teacher", "Admin"]} />} >
					<Route path="Teacher/DashBoard" element={<TeacherDashboard />} />
          <Route path="Teacher/CreatedCourse" element={<CreatedCourse />} />

					<Route path="Course/Create" element={<CreateCourse />} />
					<Route path="Course/:courseId/Edit" element={<CourseEditor />} />
					<Route path="Course/:courseId/Chapter/Create" element={<CreateChapter />} />
					<Route path="Chapter/:chapterId/Edit" element={<ChapterEditor />} />
					<Route path="Chapter/:chapterId/Lesson/Create" element={<CreateLesson />} />
					<Route path="Chapter/:chapterId/Test/Create" element={<TestForm />} />
					<Route path="Lesson/:lessonId/Edit" element={<LessonEditor />} />
					<Route path="Test/:testId/Edit" element={<TestEditor />} />
					<Route path="TestForm" element={<TestForm />} />
					<Route path="Course/:courseId/Preview" element={<CoursePreview />} />
					<Route path="Teacher/MyCourse" element={<MyCourse />} />
        </Route>
      </Route>



			{/* Learn Layout */}
			<Route path="/" element={<LayoutLearn />}>
				<Route element={<RequireAuth allowedRoles={["Teacher", "Admin", "Student"]} />} >
					<Route path="Learn/Course/:courseId" element={<CourseLearn />} />
					<Route path="Learn/Course/:courseId/Chapter/:chapterId" element={<ChapterLearn />} />
					<Route path="Learn/Course/:courseId/Chapter/:chapterId/Lesson/:lessonId" element={<LessonLearn />} />
					<Route path="Learn/Course/:courseId/Chapter/:chapterId/Test/:testId" element={<TestLearn />} />
					<Route path="Learn/Course/:courseId/Chapter/:chapterId/Test/:testId/Result/:resultId" element={<TestResult />} />
					<Route path="Learn/Course/:courseId/Certificate" element={<Certificate />} />
				</Route>
			</Route>

		</Routes>
	);
}

export default App;
