import { Link } from "react-router-dom";

export default () => {
	const footerNavs = [
		{
			label: "EDUHUB",
			items: [
				{
					href: "/Course",
					name: "Courses",
				},
				{
					href: "/Teachers",
					name: "Teachers",
				},
				{
					href: "/AboutUs",
					name: "About Us",
				},
			],
		},
		{
			label: "Navigate",
			items: [
				{
					href: "/Profile",
					name: "Profile",
				},
				{
					href: "/Dashboard/Order",
					name: "Order History",
				},
				{
					href: "/DashBoard",
					name: "DashBoard",
				},
			],
		},
	];

	return (
		<footer className="mt-10 py-5 bg-gray-500 text-white ">
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col md:flex-row py-10 justify-between md:space-y-0">
					<Link
						to="/"
						className="md:w-3/12 w-2/3 md:border-white flex md:flex-col  justify-center md:border-l-2"
					>
						<img src="/images/result.png" className="w-full" />
					</Link>

					{footerNavs.map((item, idx) => (
						<ul
							className="space-y-4 md:border-white md:border-l-2 py-5 px-10"
							key={idx}
						>
							<h1 className="text-xl font-semibold sm:pb-2">{item.label}</h1>
							{item.items.map((el, idx) => (
								<li key={idx}>
									<Link
										to={el.href}
										className="duration-150 hover:text-blue-500"
									>
										{el.name}
									</Link>
								</li>
							))}
						</ul>
					))}
					<div className="mt-10 md:border-white md:border-x-2 px-10 py-10 items-center justify-between sm:flex">
						<p className=" font-semibold">© 2024 EDUHUB.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
