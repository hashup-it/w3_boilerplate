import React from 'react';
import { ContentContainer } from '../../Components/ContentContainer/contentContainer';
import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useBlockchainProvider } from '../../Providers/Blockchain/blockchainProvider';
import { User } from '../../Components/User/user';

export const Account = () => {
	const { t } = useTranslation();
	const { account } = useBlockchainProvider();

	return (
		<ContentContainer>
			<Flex flexDirection="column" flexGrow="1">
				<Text fontSize="24px" lineHeight="14px" mb="25px" fontWeight="bold">
					{t('default.account')}
				</Text>
				<User account={account} />
			</Flex>
		</ContentContainer>
	);
};
