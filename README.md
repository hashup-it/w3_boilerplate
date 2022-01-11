# Start:
    - yarn
    - yarn start

# For UI we are using chakraUi 
    - https://chakra-ui.com/

# remember not to use static string in code but use translations from src/utils/locales
    to add transaltion:
        - go to src/utils/locales and fill all translation (for example en.json)
        - in place You want to use this
            import { useTranslation } from 'react-i18next';
            const { t } = useTranslation(); 
            
            and then use this in html like this
                <Text>{t(default.default)}</Text>

