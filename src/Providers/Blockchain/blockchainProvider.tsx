// @ts-nocheck
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { isWeb3, isMetaMask, getAccounts, loginToMetaMask, chainIdtoName } from './web3-utils';
import { ethers } from 'ethers';
import { BlockchainWeb3InitialState, BlockchainWeb3Reducer } from './blockchainReducer';

export const BlockchainProvider = ({ children }: any) => {
	const [isCheckOfWeb3, handleIsCheckedWeb3] = useState(false);
	const [web3State, web3Dispatch] = useReducer<any>(BlockchainWeb3Reducer, BlockchainWeb3InitialState);

	const dispatch = (action: any) => web3Dispatch(action);

	const login = useCallback(async () => {
		try {
			// @ts-ignore
			if (web3State?.isWeb3 && !web3State?.isLogged) {
				const accounts = await loginToMetaMask();
				dispatch({ type: 'SET_account', account: accounts[0] });
				dispatch({ type: 'SET_isLogged', isLogged: true });
			}
		} catch (e) {
			dispatch({ type: 'SET_account', account: BlockchainWeb3InitialState.account });
			dispatch({ type: 'SET_isLogged', isLogged: false });
		}
		// @ts-ignore
	}, [web3State.isWeb3, web3State.isLogged]);

	// Check if metamask is installed
	useEffect(() => {
		if (web3State.isWeb3) {
			dispatch({ type: 'SET_isMetaMask', isMetaMask: isMetaMask() });
		}
	}, [web3State.isWeb3]);

	// check if logged in to metamask and get account
	useEffect(() => {
		(async () => {
			const web3S = web3State;
			if (web3S.isWeb3) {
				const accounts = await getAccounts();
				if (accounts.length === 0) {
					dispatch({ type: 'SET_isLogged', isLogged: false });
					dispatch({ type: 'SET_isLoading', loading: false });
					dispatch({
						type: 'SET_account',
						account: BlockchainWeb3InitialState.account,
					});
				} else {
					dispatch({ type: 'SET_account', account: accounts[0] });
					dispatch({ type: 'SET_isLogged', isLogged: true });
					dispatch({ type: 'SET_isLoading', loading: false });
				}
			} else if (isCheckOfWeb3) {
				dispatch({ type: 'SET_isLogged', isLogged: false });
				dispatch({ type: 'SET_isLoading', loading: false });
				handleIsCheckedWeb3(false);
			}
			if (!isCheckOfWeb3) {
				setTimeout(() => {
					handleIsCheckedWeb3(web3S.loading);
				}, 150);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [web3State.isWeb3, isCheckOfWeb3]);

	// Connect to provider and signer
	useEffect(() => {
		if (web3State.account !== BlockchainWeb3InitialState.account) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			dispatch({ type: 'SET_provider', provider });
			const signer = provider.getSigner();
			dispatch({ type: 'SET_signer', signer });
		} else {
			dispatch({
				type: 'SET_provider',
				provider: BlockchainWeb3InitialState.provider,
			});
			dispatch({ type: 'SET_signer', signer: BlockchainWeb3InitialState.signer });
		}
	}, [web3State.account, web3State.chainId]);

	// Get ETH amount
	useEffect(() => {
		(async () => {
			if (web3State.provider && web3State.account !== BlockchainWeb3InitialState.account) {
				const walletBalance = await web3State.provider.getBalance(web3State.account);
				const balance = ethers.utils.formatEther(walletBalance);
				dispatch({ type: 'SET_balance', balance });
			} else {
				dispatch({
					type: 'SET_balance',
					balance: BlockchainWeb3InitialState.balance,
				});
			}
		})();
	}, [web3State.provider, web3State.account]);

	// Listen for balance change for webState.account
	useEffect(() => {
		if (web3State.provider) {
			const updateBalance = async () => {
				const balanceEl = await web3State.provider.getBalance(web3State.account);
				const balance = ethers.utils.formatEther(balanceEl);
				if (web3State.account !== BlockchainWeb3InitialState.account) {
					dispatch({ type: 'SET_balance', balance });
				} else {
					dispatch({
						type: 'SET_balance',
						balance: BlockchainWeb3InitialState.balance,
					});
				}
			};
			web3State.provider.on('block', updateBalance);
		}
	}, [web3State.provider, web3State.account]);

	// Listen for networks changes events
	useEffect(() => {
		if (web3State.isWeb3) {
			const onChainChanged = async (chainId: number) => {
				const chainIdEl = parseInt(Number(chainId).toString(), 10);
				const networkName = chainIdtoName(chainIdEl);
				dispatch({
					type: 'SET_chainId',
					chainId: chainIdEl,
				});
				dispatch({
					type: 'SET_networkName',
					networkName,
				});
			};
			window.ethereum.on('chainChanged', onChainChanged);
		}
	}, [web3State.isWeb3]);

	// Listen for addresses change event
	useEffect(() => {
		if (web3State.isWeb3) {
			const onAccountsChanged = (accounts: any) => {
				if (accounts && accounts.length === 0) {
					window.location = '/';
					setTimeout(() => {
						dispatch({ type: 'clear' });
					}, 300);
				}
				if (accounts.length > 0) {
					dispatch({ type: 'SET_account', account: accounts[0] });
					dispatch({ type: 'SET_isLogged', isLogged: true });
				}
			};
			window.ethereum.on('accountsChanged', onAccountsChanged);
		}
	}, [web3State.isWeb3]);

	useEffect(() => {
		dispatch({ type: 'SET_isWeb3', isWeb3: isWeb3() });
	}, []);

	return (
		<BlockchainContext.Provider
			value={{
				isLogged: web3State.isLogged,
				login,
				account: web3State.account,
				loading: web3State.loading,
				balance: web3State.balance,
				postContract,
			}}
		>
			{children}
		</BlockchainContext.Provider>
	);
};

const BlockchainContext = React.createContext({
	isLogged: false,
	loading: true,
	account: '',
	balance: 0,
	// tslint:disable-next-line:no-empty
	login: () => {},
	postContract: null as any,
});

export const useBlockchainProvider = () => {
	const context = React.useContext(BlockchainContext);
	return context;
};
