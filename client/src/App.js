import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header.jsx'
import Stream from './pages/stream/Stream.jsx'
import Homeworks from './pages/homeworks/Homeworks.jsx'
import Homework from './pages/homework/Homework.jsx'
import Users from './pages/users/Users.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import './styles/styles.scss'

function App() {
	return (
		<Router>
			<div className='container'>
				<div className='left'>
					<Sidebar />
				</div>
				<div className='right'>
					<Header />
					<Routes>
						<Route path='/stream' element={<Stream />} />
						<Route path='/homeworks' element={<Homeworks />} />
						<Route path='/homework' element={<Homework />} />
						<Route path='/users' element={<Users />} />
						<Route path='/' element={<Stream />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
