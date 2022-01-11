import React from 'react';

import { PageNotFound } from './Pages/PageNotFound/pageNotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage/HomePage';
import { useBlockchainProvider } from './Providers/Blockchain/blockchainProvider';
import PrivateRoute from './PrivateRoute';
import { Account } from './Pages/Account/account';

const pages = [
	{
		path: '/',
		element: <HomePage />,
	},
].map((item, index) => ({ ...item, id: `path_${index + 1}_${item.path}` }));

export const privatePages = [
	{
		path: '/account',
		element: <Account />,
		// example
		// additionalPath: [{ path: ':id', element: <Account /> }],
		additionalPath: [],
	},
].map((item, index) => ({ ...item, id: `path_${index + 1}_${item.path}` }));

const Wrapper = () => {
	const { isLogged, loading } = useBlockchainProvider();

	return (
		<BrowserRouter>
			<Routes>
				{pages.map(({ path, element, id }) => (
					<Route path={path} element={element} key={id} />
				))}
				{privatePages.map(({ path, additionalPath, element, id }) => PrivateRoute({ path, key: id, additionalPath, isLogged, loading, element }))}
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Wrapper;
