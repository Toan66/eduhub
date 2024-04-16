import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { userRole } = useAuth(); // Giả sử useAuth trả về trạng thái đăng nhập

    useEffect(() => {
        if (userRole) {
            navigate('/'); // Chuyển hướng người dùng đã đăng nhập đến trang chủ
        }
    }, [userRole, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7291/api/Auth/login', { username, password }, { withCredentials: true });
            console.log(response.data.message);
            const role = response.data.role;
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            navigate('/', { replace: true });
            navigate(0);
            // if (token) {
            //     localStorage.setItem('jwt', token);
            //     console.log('Đăng nhập thành công!');
            //     navigate('/');
            // } else {
            //     // Cập nhật lỗi nếu token không tồn tại
            //     setError('Đăng nhập không thành công. Vui lòng thử lại.');
            // }
        } catch (error) {
            setError(error.response?.data?.message || 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-96">
            <div className="font-bold uppercase text-3xl mb-5">Log in</div>
            <form className="w-full max-w-xs" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Username
                    </label>
                    <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text" // Thay đổi type từ email sang text
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}

                <div>New to Eduhub? <Link to="/Register" className=" text-blue-500">Register</Link></div>

                <div className="flex items-center justify-center mt-10">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Log in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;