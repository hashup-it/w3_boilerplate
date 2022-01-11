import React, { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/colors';
import { useBlockchainProvider } from '../../Providers/Blockchain/blockchainProvider';
import { AddressZero } from '@ethersproject/constants/src.ts/addresses';
import { AccountMini } from '../AccountMini/accountMini';
import { privatePages } from '../../AppWrapper';

enum ACCOUNT_TYPES {
	LOGGED,
	NOT_LOGGED,
	LOADING,
}

export const Menu = () => {
	const { t } = useTranslation();
	const { login, isLogged, account, loading, balance } = useBlockchainProvider();

	const typeOptions = {
		[ACCOUNT_TYPES.LOADING]: () => <AccountMini account={AddressZero} balance={0} />,
		[ACCOUNT_TYPES.LOGGED]: () => <AccountMini account={account} balance={balance} />,
		[ACCOUNT_TYPES.NOT_LOGGED]: () => (
			<Box cursor="pointer" padding="7px 10px" onClick={login} borderRadius="5px" color="white" backgroundColor="black">
				<Text fontWeight="bold">{t('menu.connect')}</Text>
			</Box>
		),
	};

	const accountType = useMemo(() => {
		if (!isLogged) {
			return ACCOUNT_TYPES.NOT_LOGGED;
		}
		if (isLogged) {
			return ACCOUNT_TYPES.LOGGED;
		}
		return ACCOUNT_TYPES.LOADING;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, isLogged]);

	const menuItems = useMemo(
		() =>
			[
				{
					name: t('menu.homePage'),
					link: '/',
				},
				{
					name: t('menu.account'),
					link: '/account',
				},
			].filter((item) => (isLogged ? item : privatePages.filter((el) => el.path === item.link).length === 0)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isLogged, t],
	);

	return (
		<Flex gridGap="20px" mt="35px" mb="60px" flexWrap="wrap" justifyContent="space-between" alignItems="center">
			<Flex gridGap="20px" flexWrap="wrap" alignItems="center">
				<Link to="/">
					<Text fontSize="28px">Boilerplate</Text>
				</Link>

				<Flex flexWrap="wrap" fontSize="14px" gridGap="10px">
					{menuItems.map((item) => (
						<Link key={item.link} to={item.link}>
							<Text
								position="relative"
								_before={{
									content: item.link === window.location.pathname && '""',
									position: 'absolute',
									bottom: '0',
									width: '50%',
									height: '2px',
									background: colors.darkLink,
								}}
								_hover={{ _before: { content: '""', background: colors.liteLink } }}
							>
								{item.name}
							</Text>
						</Link>
					))}
				</Flex>
			</Flex>
			{typeOptions[accountType]()}
		</Flex>
	);
};
