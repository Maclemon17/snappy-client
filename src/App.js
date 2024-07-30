import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'

const App = () => {
	const token = localStorage.token
	return (
		<div>
			<Routes>
				<Route exact path='/' element={<Chat />} />
				<Route path='/chat' element={token ? <Chat /> : <Login />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/setavatar' element={<SetAvatar />} />

				{/* not found page */}
				<Route path='*' element={<NotFound />} />
			</Routes>

		</div>
	)
}

export default App