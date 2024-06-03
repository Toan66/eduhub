import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";

const Certificate = () => {
	const { courseId } = useParams();
	const [certificateInfo, setCertificateInfo] = useState(null);

	useEffect(() => {
		const fetchCertificateInfo = async () => {
			try {
				const response = await axios.get(
					`https://localhost:7291/api/Course/${courseId}/certificateInfo`,
					{ withCredentials: true }
				);
				setCertificateInfo(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching certificate info:", error);
			}
		};

		fetchCertificateInfo();
	}, [courseId]);

	const downloadCertificate = () => {
		const certificateElement = document.getElementById("certificate");
		if (certificateElement) {
			html2canvas(certificateElement).then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const link = document.createElement("a");
				link.download = `${certificateInfo?.user?.fullName}-certificate.png`;
				link.href = imgData;
				link.click();
			});
		}
	};
	if (!certificateInfo) return <div>Loading...</div>;

	return (
		<div className="flex flex-col items-center justify-center mt-10">
			<div
				id="certificate"
				className="select-none bg-certi bg-no-repeat bg-cover screen text-center rounded-lg shadow-md"
				style={{ width: "1281px", height: "720px" }}
			>
				<div className="flex justify-center">
					<img src="/images/result.png" className="w-2/12 mt-20" />
				</div>
				<h1 className="text-6xl mt-1 font-bold text-blue-900">
					COURSE COMPLETITION
				</h1>
				<h1 className="text-6xl mt-1 font-bold text-teal-700">CERTIFICATE</h1>
				<p className="text-lg mt-4 font-semibold">
					This certificate is presented to
				</p>
				<h2 className="text-5xl mt-4 font-bold text-teal-700">
					{certificateInfo.user.fullName}
				</h2>
				<p className="mt-4 font-semibold">
					For the succesful completiion of the course
				</p>
				<h3 className="text-3xl mt-4 font-semibold text-blue-900">
					{certificateInfo.course.courseName}
				</h3>
				{/* Format the date as needed */}
				{/* <p className="mt-2">on {new Date().toLocaleDateString()}</p> */}
				<p className="text-3xl font-semibold mt-16 text-blue-950">
					{certificateInfo.teacher.fullName}
				</p>
				<p className="text-lg text-teal-700 font-semibold">INSTRUCTOR</p>
			</div>
			<button
				onClick={downloadCertificate}
				className="mt-5 px-6 py-2 text-2xl font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer"
			>
				Download Certificate
			</button>
		</div>
	);
};

export default Certificate;
