import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// const client = new ApolloClient({
// 	uri: '',
// 	cache: new InMemoryCache(),
// 	headers: {
// 		// 'x-api-key': '',
// 	},
// });

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept('./App', () => {
		/* eslint-disable global-require */
		const NextApp = require('./App').default;
		// @ts-ignore
		ReactDOM.render(<NextApp />, rootElement);
	});
}
