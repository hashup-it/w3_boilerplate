import React from 'react';
import { ContentContainer } from './Components/ContentContainer/contentContainer';
import { Flex, Spinner } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ isLogged, loading, path, element, additionalPath, key }: any) => {
	const loader: any = (
		<ContentContainer>
			<Flex justifyContent="center">
				<Spinner />
			</Flex>
		</ContentContainer>
	);
	return loading ? (
		<Route key={key} path={path} element={loader}>
			{additionalPath.map((el: any) => (
				<Route key={`additional_path_${el.path}_loading_${key}`} path={el.path} element={loader} />
			))}
		</Route>
	) : (
		isLogged && (
			<Route key={key} path={path} element={element}>
				{additionalPath.map((el: any) => (
					<Route key={`additional_path_${el.path}_loaded_${key}`} path={el.path} element={el.element} />
				))}
			</Route>
		)
	);
};

export default PrivateRoute;
