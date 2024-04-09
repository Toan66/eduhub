import React, { useState } from 'react';
import axios from 'axios'
import { Navigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7291/api/Auth/login', {
                username: username,
                password: password
            });
            const jwtFromCookie = Cookies.get('jwt');
            if (jwtFromCookie) {
                // Lưu JWT vào localStorage
                localStorage.setItem('jwt', jwtFromCookie);
                // Đặt trạng thái loggedIn thành true
                setLoggedIn(true);
            }

        } catch (error) {
            setError('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
        }
    };

    if (loggedIn) {
        // Nếu đã đăng nhập thành công, chuyển hướng đến trang home
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
