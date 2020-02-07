import React from 'react';
import ButtonAppBar from './AppBar';
import SimpleTabs from './MenuBar';
import About from './About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ad from './ad_pic.png'

function App() {
	return (
		<div className="App">
			<img src={ad} alt="" width="100%"/>
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
