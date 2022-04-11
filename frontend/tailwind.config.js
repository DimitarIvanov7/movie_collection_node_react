module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	mode: "jit",
	theme: {
		colors: {
			transparent: "transparent",
			white: {
				DEFAULT: "#ffffff",
			},
			darkWhite: {
				DEFAULT: "#e0e4e9",
			},
			grey: {
				DEFAULT: "#495969",
			},
			mainBg: {
				DEFAULT: "#495969",
			},
			dark: {
				DEFAULT: "#3b4855",
				max: "#303a45",
			},
			black: {
				DEFAULT: "#000000",
			},
		},
		extend: {
			boxShadow: {
				DEFAULT: "inset 0 0 0 1000px rgb(59 54 45/ 55%)",
			},
			fontSize: {
				"2rem": "2rem",
			},
			// backgroundImage: {
			// 	hero: "url('/imgages/header.png')",
			// },
		},
	},
	plugins: [],
};
