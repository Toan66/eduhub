import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './Test'
import Login from './Pages/Login'
function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
			<div className="shrink-0">
			</div>
			<div>
				<div className="text-xl font-medium text-red-600">ChitChat</div>
				<p className="text-slate-500">You have a new message!</p>
			</div>
			<Test/>
			<Login/>
		</div>
	)
}

export default App
