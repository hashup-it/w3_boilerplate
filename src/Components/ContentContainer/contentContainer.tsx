import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '../Header/header';
import { Menu } from '../Menu/menu';

export const ContentContainer = ({ children }: any) => {
	return (
		<Flex justifyContent="center">
			<Box width="100%" maxW="790px" p="0 20px">
				<Header />
				<Menu />
				<Box m="20px 0">{children}</Box>
			</Box>
		</Flex>
	);
};
