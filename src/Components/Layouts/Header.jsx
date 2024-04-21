import { useEffect, useState } from 'react'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../../Contexts/AuthContext'


export default () => {

    const [state, setState] = useState(false)
    const navigate = useNavigate()
    const { userRole } = useAuth();
    const [userName, setUserName] = useState('');
    const location = useLocation();
    const jwt = localStorage.getItem('jwt');


    useEffect(() => {
        setState(false);
    }, [location.pathname]);
    

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await axios.get('https://localhost:7291/api/User/name', { withCredentials: true},);
                if (response.status === 200) {
                    setUserName(response.data);
                } else {
                    console.error('Error');
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchUserName();
    }, []);


    const navigation = [
        { title: "Course", path: "/Course" },
        { title: "Create Course", path: "/Course/Create" },
        { title: "Customers", path: "#" },
        { title: "Pricing", path: "#" }
    ]

    const logoutHandle = async () => {
        try {
            const response = await axios.post('https://localhost:7291/api/Auth/logout', { withCredentials: true });

            if (response.status === 200) {
                // console.log('Đã đăng xuất thành công');
                localStorage.clear();
                Cookies.remove('jwt');
                navigate("/");
                navigate(0);
            } else {
                console.error('Lỗi khi đăng xuất:', response);
            }
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    return (
        <header className="bg-white shadow-xl border-b w-full md:static md:text-sm md:border-none xl:">
            <div className="items-center px-4 max-w-screen-lg mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link to="/">
                        <img
                            src="../../src/assets/logo_eduhub.jpg"
                            width={120}
                            height={50}
                            alt="eduhub logo"
                        />
                    </Link>
                    <div className="md:hidden">
                        <button className="text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-700 hover:text-indigo-600">
                                        <Link to={item.path} className="block">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }

                        <span className=' w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>


                            {/* role */}
                            {!userRole
                                ?
                                <>
                                    <li>
                                        <Link to="/Login" className="text-gray-700 hover:text-indigo-600">
                                            Log in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Register" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline w-auto">
                                            Register
                                        </Link>
                                    </li>

                                </>
                                :
                                <li className="flex items-center">
                                    <div className="inline-block text-center text-base font-medium mr-2">Hello {userName}</div>

                                    <div className="relative text-left ">
                                        <div className="group">
                                            <button type="button"
                                                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                                Option
                                                <svg className="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                                                </svg>
                                            </button>

                                            <div
                                                className="absolute right-0 w-40 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                                                <div className="py-1">
                                                    <Link to="/Dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">DashBoard</Link>
                                                    <Link onClick={logoutHandle} className="block pointer-events-auto px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            }


                        </div>
                    </ul>
                </div>
            </div>
        </header>
    )
}