import React from "react";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

import { createUser, loginUser } from "../fetchData/Auth";

const Login = () => {
	const [createAccount, setCreateAccount] = useState(false);

	const dispatch = useDispatch();
	const { LoginOpen, setUser } = bindActionCreators(actionCreators, dispatch);

	const handleNewUser = async (e) => {
		e.preventDefault();

		const res = await createUser(
			e.target.username.value,
			e.target.password.value
		);
		alert(res);

		if (res == "Successfully created") {
			setCreateAccount(false);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		const res = await loginUser(
			e.target.username.value,
			e.target.password.value
		);

		if (res === "Wrong username" || res === "Wrong password!") {
			alert(res);
			return;
		}

		setUser(res);

		LoginOpen(false);
	};

	const loginClases = {
		buttonLog: "text-white rounded px-4 border border-white",

		heading: "text-lg font-bold m-2 text-white",

		wrapper: "wrapper m-2",

		form: "sm:flex gap-2 mb-2",

		text: "text-white",

		bold: "font-bold cursor-pointer",

		button: "text-white rounded px-4 border border-white block",
	};

	return (
		<div className="flex flex-col w-screen bg-mainBg">
			<AiFillCloseCircle
				style={{ color: "white" }}
				className="right-0 m-2 absolute cursor-pointer"
				onClick={() => LoginOpen(false)}
			/>
			{!createAccount ? (
				<>
					<h2 className={loginClases.heading}>Login to your Account</h2>

					<div className={loginClases.wrapper}>
						<form
							className={loginClases.form}
							action="/"
							onSubmit={handleLogin}
						>
							<input
								className="username-input mr-2 sm:mr-0"
								type="text"
								name="username"
								placeholder="username"
								required
							/>
							<input
								className="mt-2 sm:mt-0"
								type="password"
								name="password"
								placeholder="password"
								required
							/>
							<button
								className={`${loginClases.button} mt-2 sm:mt-0`}
								type="submit"
							>
								Login
							</button>
						</form>

						<p className={loginClases.text}>
							Don't have an account?{" "}
							<span
								className={loginClases.bold}
								onClick={() => setCreateAccount(true)}
							>
								Create account
							</span>
						</p>
					</div>
				</>
			) : (
				<>
					{" "}
					<h2 className={loginClases.heading}>Create Account</h2>
					<div className={loginClases.wrapper}>
						<form
							className={loginClases.form}
							action="/"
							onSubmit={handleNewUser}
						>
							<input
								type="text"
								name="username"
								placeholder="username"
								required
							/>
							<input
								type="password"
								name="password"
								placeholder="password"
								required
							/>

							<button className={loginClases.button} type="submit">
								Create Account
							</button>
						</form>

						<p className={loginClases.text}>
							Already have account?{" "}
							<span
								className={loginClases.bold}
								onClick={() => setCreateAccount(false)}
							>
								Login
							</span>
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Login;
