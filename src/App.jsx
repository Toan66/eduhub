import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './Test'
import Login from './Pages/Login'
import Layout from './Components/Layout'
function App() {
	const [count, setCount] = useState(0)

	return (
		<Layout>
			<Login/>
		</Layout>
	)
}

export default App
