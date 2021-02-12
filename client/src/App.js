import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	const [user, setUser] = useState({});
	return (
		<>
			<Navbar user={user} setUser={setUser} />
			<Route exact path='/'>
				<Home user={user} setUser={setUser} />
			</Route>
			<Route exact path='/login'>
				<Login setUser={setUser} />
			</Route>
			<Route exact path='/register'>
				<Register setUser={setUser} />
			</Route>
		</>
	);
}

export default App;
