import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { colors } from '../../utils/colors';
import { useTranslation } from 'react-i18next';
import { trimAddress } from '../../utils/usefulFunctions';

interface IUser {
	account: string;
}
export const User = ({ account }: IUser) => {
	const { t } = useTranslation();
	return (
		<Box>
			<Text color={colors.darkGray} fontSize="12px">
				{t('settings.logged')}
			</Text>
			<Text color="black" fontSize="14px">
				{trimAddress(account)}
			</Text>
		</Box>
	);
};
