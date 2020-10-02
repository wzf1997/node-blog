import React, { Suspense, lazy } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import App from '../blogIndex/index'
import Login from '../login';
import Register from '../register';
import Admin from '../admin';
// import TestPage from '../test';
const TestPage = lazy(() => import('../test'));
export default function RouterIndex() {
	return (
		<Router>
			<Suspense fallback={<div>loading....</div>}>
				<Switch>
					<Route path='/admin' component={Admin} />
					<Route path='/register' component={Register} />
					<Route path='/login' component={Login} />
					<Route path="/" exact component={App} />
					<Route path="/test" component={TestPage} />
				</Switch>
			</Suspense>
		</Router>
	);
}