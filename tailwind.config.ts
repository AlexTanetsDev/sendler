import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1160px',
			xl: '1326px',
			xxl: '1800px',
		},
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
			colors: {
				mainTextColor: '#1B1B30',
				formBg: '#CDEAE3',
				buttonForm: '#ADA3A3',
				lightGrayBorder: '#636060',
				darkGreyColor: '#B6B5B5',
				headerTable: '#417D8A',
				rowUnderLine: '#B5C9BE',
				greenBtn: '#32BB79',
				hoverGreenBtn: '#169659',
				bgFooter: '#0F3952',
				lightGreen: '#CFF0E0',
				priceTableBg: '#F7FFFB',
				priceTableBorderColor: '#DCDCDC',
				hederTransparent: 'rgba(15, 57, 82, 0.38)',
				emailColorLink: '#2366E8',
				whiteText: '#FFFFFF',
				inputBorder: '#E6E6E6',
				mainBgColor: '#FEFEFE;',
				blueHoverBtn: '#41A7BE',
				redStar: '#EC2C2C',
				bgBurgerMenu: '#194954',
				disable: '#908F8F',
				textDisable: '#6C6C6C',
				rowBtnDisableText: '#858585',
				rowBtnDisableBorder: '#6C6C6C',
				disableAlfaName: '#372037'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
		},
	},
	plugins: [],
};
export default config;
