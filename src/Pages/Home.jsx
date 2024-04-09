import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";

function Home() {
    // const [data, setData] = useState(null);

    // const getData = async () => {
    //     try {
    //         const response = await axios({ method: 'get', url: 'https://localhost:7291/api/Auth', withCredentials: true })
    //         setData(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <div className="bg-gray-800 text-white py-20">
                    <div className="container mx-auto px-6 md:px-12 xl:px-32">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">Learn Anything, Anytime, Anywhere</h2>
                        <p className="text-xl mb-8">Start learning today with our online courses.</p>
                        <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Browse Courses
                        </Link>
                    </div>
                </div>

                {/* Courses Section */}
                <div className="py-20">
                    <div className="container mx-auto px-6 md:px-12 xl:px-32">
                        <h3 className="text-3xl font-bold text-center mb-10">Popular Courses</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Repeat this block for each course */}
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-full" src="./src/assets/python_course.jpg" alt="Course Image" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Python Course</div>
                                    <p className="text-gray-700 text-base">
                                        Course description goes here. It should be brief and to the point.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <Link to="/course-detail" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-full" src="./src/assets/bussiness_course.jpg" alt="Course Image" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Business Course</div>
                                    <p className="text-gray-700 text-base">
                                        Course description goes here. It should be brief and to the point.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <Link to="/course-detail" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-full" src="./src/assets/gads_course.jpg" alt="Course Image" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Google Ads Course</div>
                                    <p className="text-gray-700 text-base">
                                        Course description goes here. It should be brief and to the point.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <Link to="/course-detail" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-full" src="./src/assets/guitar_course.jpg" alt="Course Image" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Guitar Course</div>
                                    <p className="text-gray-700 text-base">
                                        Course description goes here. It should be brief and to the point.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <Link to="/course-detail" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            {/* End of course block */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;