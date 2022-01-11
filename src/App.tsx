import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Wrapper from './AppWrapper';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './i18n';
import { BlockchainProvider } from './Providers/Blockchain/blockchainProvider';
import { colors } from './utils/colors';

const customTheme = extendTheme({
	colors: {
		darkLink: {
			100: colors.darkLink,
			500: colors.darkLink,
			900: '#1a202c',
		},
	},
	components: {
		Switch: {
			baseStyle: {
				track: {
					_focus: {
						boxShadow: 'none',
					},
				},
			},
		},
	},
	fonts: {
		body: 'Montserrat,serif',
	},
	baseStyle: {
		body: {
			height: '100vh',
		},
	},
});

const App = () => {
	return (
		<BlockchainProvider>
			<ChakraProvider theme={customTheme} resetCSS>
				<Wrapper />
			</ChakraProvider>
			<ToastContainer />
		</BlockchainProvider>
	);
};

export default App;
