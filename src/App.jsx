import { useState } from 'react'
import './App.css'
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
