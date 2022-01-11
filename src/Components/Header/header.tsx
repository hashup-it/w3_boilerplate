import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex } from '@chakra-ui/react';
import { colors } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import SelectOverview from '../Select/select';

const languages = [
	{
		value: 'pl',
		label: 'Polski',
	},
	{
		value: 'en',
		label: 'English',
	},
];

export const Header = () => {
	const { t } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState(languages.filter((language) => i18n.language.includes(language.value))[0]);
	const navigate = useNavigate();

	const navigateTo = (link: string) => {
		navigate(link);
	};

	const changeLanguage = (lang: { value: string; label: string }) => {
		setSelectedLanguage(languages.filter(() => i18n.language.includes(lang.value))[0]);
		i18n.changeLanguage(lang.value);
	};

	return (
		<Flex gridGap="20px" flexWrap="wrap" p="10px 0" alignItems="center" borderBottom={`1px solid ${colors.gray}`} justifyContent="space-between">
			<Box cursor="pointer" onClick={() => navigateTo('/')} fontSize="10px">
				{t('mainHeader.info')}
			</Box>
			<Flex justifyContent="flex-end" gridGap="20px">
				<Flex cursor="pointer">
					<SelectOverview
						width="150px"
						isSearchable={false}
						onChange={changeLanguage}
						options={languages.map((language) => ({ value: language.value, label: language.label }))}
						value={selectedLanguage}
						placeholder={t('default.selectLanguage')}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};
