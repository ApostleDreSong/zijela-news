import React from 'react';
import ButtonAppBar from './AppBar';
import SimpleTabs from './MenuBar';
import About from './About';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<ButtonAppBar />
				<Route exact path="/">
					<SimpleTabs />
				</Route>
				<Route path="/about">
					<About />
				</Route>
			</Router>
		</div>
	);
}

export default App;
