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
			green: {
				DEFAULT: "#10B72F",
			},
			red: {
				DEFAULT: "#D02E12",
			},
			blue: {
				DEFAULT: "rgba(44, 97, 246, 1)",
				light: "rgba(44, 97, 246, 0.64)",
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
