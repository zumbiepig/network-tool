import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
//import eslintConfigPrettier from 'eslint-config-prettier';
// import tsdocPlugin from 'eslint-plugin-tsdoc';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.eslintRecommended,
	//...tseslint.configs.recommendedTypeCheckedOnly,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	//eslintConfigPrettier,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dir,
			},
		},
		/* plugins: {
			tsdoc: tsdocPlugin,
		},
		rules: {
			'tsdoc/syntax': 'warn',
		}, */
	},
);
