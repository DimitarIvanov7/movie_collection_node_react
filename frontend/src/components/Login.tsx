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

	return (
		<div className="container">
			<AiFillCloseCircle onClick={() => LoginOpen(false)} />
			{!createAccount ? (
				<>
					<h2>Login to your Account</h2>

					<div className="wrapper">
						<form action="/" onSubmit={handleLogin}>
							<input
								className="username-input"
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
							<button type="submit">Login</button>
						</form>

						<p>
							Don't have an account?{" "}
							<span onClick={() => setCreateAccount(true)}>Create account</span>
						</p>
					</div>
				</>
			) : (
				<>
					{" "}
					<h2>Create Account</h2>
					<div className="wrapper">
						<form action="/" onSubmit={handleNewUser}>
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

							<button type="submit">Create Account</button>
						</form>

						<p>
							Already have account?{" "}
							<span onClick={() => setCreateAccount(false)}>Login</span>
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Login;
