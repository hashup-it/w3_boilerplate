import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/colors';

export const PageNotFound = () => {
	return (
		<Flex flexDirection="column" height="100vh" justifyContent="center" alignItems="center">
			<Box fontSize="32px">FOREUM</Box>
			<Flex fontSize="42px" color={colors.darkLink}>
				[404] - PAGE NOT FOUND
			</Flex>
			<Flex fontSize="20px">
				Click
				<Text m="0 5px" color={colors.link} _hover={{ color: colors.darkLink }}>
					<Link to="/">here</Link>
				</Text>
				to return to Homepage{' '}
			</Flex>
		</Flex>
	);
};
