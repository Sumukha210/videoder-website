import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//common components
import Loader from './components/common/Loader';
import SideNav from './components/side nav comp/side nav/Index';
import TopNavBar from './components/top nav comp/top nav/Index';

//from top navbar
import Home from './components/top nav comp/Home';
const About = lazy(() => import('./components/top nav comp/About'));

//from sidebar
const Crop = lazy(() => import('./components/side nav comp/crop'));
const Compress = lazy(() => import('./components/side nav comp/compress'));
const Rotate = lazy(() => import('./components/side nav comp/rotate'));
const Scale = lazy(() => import('./components/side nav comp/scale'));

const App = () => {
	return (
		<div className="App">
			<Router>
				<TopNavBar />
				<SideNav />
				<Switch>
					<Suspense fallback={<Loader />}>
						<Route path="/" exact component={Home} />
						<Route path="/about" component={About} />
						<Route path="/crop" component={Crop} />
						<Route path="/compress" component={Compress} />
						<Route path="/rotate" component={Rotate} />
						<Route path="/scale" component={Scale} />
					</Suspense>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
