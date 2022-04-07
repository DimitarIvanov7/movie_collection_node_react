import React from "react";
import Header from "../components/Header";

const LoginUser = () => {
	const handleFormSubmit = (e: any) => {
		e.preventDefault();

		let email = e.target.elements.email?.value;
		let password = e.target.elements.password?.value;

		console.log(email, password);
	};

	const classes = {
		pageBody: "h-screen flex bg-gray-bg1",
		formContainer:
			"w-full max-w-md    m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16",
		formHeading: "text-2xl  font-medium text-primary mt-4 mb-12 text-center",
		btnContainer: "flex justify-center items-center mt-6",
	};
	return (
		<div className={classes.pageBody}>
			<Header />
			<div className={classes.formContainer}>
				<h1 className={classes.formHeading}>Log in to your account 🔐</h1>

				<form onSubmit={handleFormSubmit}>
					<input id="email" type="email" placeholder="Your email" />
					<input id="password" type="password" placeholder="Your Password" />

					<div className={classes.btnContainer}>
						<button type="submit">Continue with Email</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginUser;
