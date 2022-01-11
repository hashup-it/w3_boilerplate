import React from 'react';
import { Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { colors } from '../../utils/colors';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { trimAddress } from '../../utils/usefulFunctions';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const AccountMini = ({ balance, account }: any) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Menu placement="bottom-end">
			<MenuButton>
				<Flex alignItems="center" gridGap="5px">
					<Box textAlign="end">
						<Text fontSize="12px" color={colors.darkGray} fontWeight="600">
							{trimAddress(account)}
						</Text>
						<Flex alignItems="center">
							<Image src="/icons/ether.svg" w="12px" h="12px" />
							<Text fontSize="12px" fontWeight="600">
								{Math.floor(balance * 10 ** 5) / 10 ** 5} ETH
							</Text>
						</Flex>
					</Box>
					<Flex cursor="pointer" position="relative" color="black" fontWeight="bold" fontSize="12px" alignItems="center" justifyContent="center">
						<Image borderRadius="50%" mr="8px" h="49px" w="49px" src="/icons/basic_avatar.svg" />
						<Flex
							h="18px"
							w="18px"
							bottom="-2px"
							justifyContent="center"
							alignItems="center"
							background="white"
							right="5px"
							borderRadius="50%"
							position="absolute"
							border={`1px solid ${colors.darkLink}`}
						>
							<ChevronDownIcon color={colors.darkLink} />
						</Flex>
					</Flex>
				</Flex>
			</MenuButton>
			<MenuList maxW="100px">
				<MenuItem onClick={() => navigate('/account')}>{t('profileMenu.account')}</MenuItem>
			</MenuList>
		</Menu>
	);
};
