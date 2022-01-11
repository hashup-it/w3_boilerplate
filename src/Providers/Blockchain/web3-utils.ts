export const isWeb3 = () => {
	// @ts-ignore
	return typeof window.ethereum !== 'undefined';
};

export const isMetaMask = () => {
	// @ts-ignore
	return !!window.ethereum.isMetaMask;
};

// return account if connected
export const getAccounts = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		// @ts-ignore
		return window.ethereum.request({
			method: 'eth_accounts',
		});
	} catch (e) {
		throw e;
	}
};

// login attempt, is succcess return array of account
export const loginToMetaMask = async () => {
	// eslint-disable-next-line no-useless-catch
	try {
		// @ts-ignore 		// eslint-disable-next-line react-hooks/exhaustive-deps
		return window.ethereum.request({
			method: 'eth_requestAccounts',
		});
	} catch (e) {
		throw e;
	}
};

export const chainIdtoName = (chainId: number) => {
	switch (chainId) {
		case 1:
			return 'Mainnet';
		case 3:
			return 'Ropsten';
		case 4:
			return 'Rinkeby';
		case 42:
			return 'Kovan';
		case 5:
			return 'Goerli';
		default:
			return 'unknown';
	}
};
