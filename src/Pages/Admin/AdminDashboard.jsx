import { Link } from "react-router-dom";

function AdminDashboard() {
	return (
		<div className="container mx-auto px-4 sm:max-w-screen-lg">
			<div>
				<button>
					<Link
						className="px-5 py-2 rounded-md text-white font-semibold bg-blue-500 text-2xl"
						to="/Admin/Courses/Unapprove"
					>
						Unapprove Course
					</Link>
				</button>
			</div>
		</div>
	);
}

export default AdminDashboard;
