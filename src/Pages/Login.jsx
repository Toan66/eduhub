import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate  } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://localhost:7291/api/Auth/login', { username, password });
        const token = Cookies.get('jwt');
        if (token) {
            localStorage.setItem('jwt', token);
            console.log('Đăng nhập thành công!');
            navigate('/');
        } else {
            // Cập nhật lỗi nếu token không tồn tại
            setError('Đăng nhập không thành công. Vui lòng thử lại.');
        }
    } catch (error) {
        // Xử lý và hiển thị lỗi từ phản hồi của server
        setError(error.response?.data?.message || 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
    }
};

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-xs" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
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
                        Mật khẩu
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;