import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './Test'
import Login from './Pages/Login'
import Header from './Components/Header'
import Footer from './Components/Footer'
function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Header/>
			<Login/>
			<Footer/>
		</>
	)
}

export default App
