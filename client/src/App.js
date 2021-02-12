import { useState } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

function App() {
	const [user, setUser] = useState({});

	return (
		<>
			<Navbar user={user} setUser={setUser} />
			<Route exact path='/login'>
				<Login setUser={setUser} />
			</Route>
			<Route exact path='/register'>
				<Register setUser={setUser} />
			</Route>
			<Route exact path='/'>
				<Home />
			</Route>
		</>
	);
}

export default App;
