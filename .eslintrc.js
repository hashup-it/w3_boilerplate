module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		createDefaultProgram: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb-typescript',
		'prettier',
		'plugin:jsx-a11y/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['only-warn', 'prettier', '@typescript-eslint', 'jest', 'react'],
	env: {
		es6: true,
		browser: true,
		jest: true,
	},
	rules: {
		'react/require-default-props': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'jsx-a11y/label-has-associated-control': [
			'error',
			{
				required: {
					some: ['nesting', 'id'],
				},
			},
		],
		'jsx-a11y/label-has-for': [
			'error',
			{
				required: {
					some: ['nesting', 'id'],
				},
			},
		],
		'react/jsx-props-no-spreading': 'off',
		'import/prefer-default-export': 'off',
		'react/jsx-fragments': 'off',
		'react/prop-types': 'off',
		'import/no-cycle': 'off',
		'no-multi-assign': 'off',
		// 'import/imports-first': ['error', 'absolute-first'],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react/jsx-no-undef': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		quotes: [
			2,
			'single',
			{
				avoidEscape: true,
			},
		],
		// semi: ['error', 'never'],
		'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'draft', 'ctx', 'context'] }],
		'import/no-extraneous-dependencies': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'react/destructuring-assignment': 'off',
		'import/order': 'off',
		'import/imports-first': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
		react: {
			version: 'detect',
		},
	},
};
