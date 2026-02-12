/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', 
	theme: {
		extend: {
			colors: {
				'oomi-dark': '#0A192F',
				'oomi-accent': '#E05D44',
				'oomi-bg': '#FDFCF6',
			},
			fontFamily: {
				sans: ['"Novecento sans wide"', 'sans-serif'],
				sub: ['"One"', 'sans-serif'],
			},
		},
	},
	plugins: [],
};