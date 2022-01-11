# Start:
    - yarn
    - yarn start

# For UI we are using chakraUi 
    - https://chakra-ui.com/

# for apollo backend we need to configure client in src/index.tsx
        const client = new ApolloClient({
            uri: '', => url for our graaphql api
            cache: new InMemoryCache(),
            headers: {
                // 'x-api-key': '', => if we will use static api key
        },

        and add this to html
            <ApolloProvider client={client}>
			    <App />
		    </ApolloProvider>
});

# remember not to use static string in code but use translations from src/utils/locales
    to add transaltion:
        - go to src/utils/locales and fill all translation (for example en.json)
        - in place You want to use this
            import { useTranslation } from 'react-i18next';
            const { t } = useTranslation(); 
            
            and then use this in html like this
                <Text>{t(default.default)}</Text>

