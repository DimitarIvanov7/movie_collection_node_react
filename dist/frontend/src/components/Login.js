var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const handleNewUser = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const res = yield createUser(e.target.username.value, e.target.password.value);
        alert(res);
        if (res == "Successfully created") {
            setCreateAccount(false);
        }
    });
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const res = yield loginUser(e.target.username.value, e.target.password.value);
        if (res === "Wrong username" || res === "Wrong password!") {
            alert(res);
            return;
        }
        setUser(res);
        LoginOpen(false);
    });
    return (<div className="container">
			<AiFillCloseCircle onClick={() => LoginOpen(false)}/>
			{!createAccount ? (<>
					<h2>Login to your Account</h2>

					<div className="wrapper">
						<form action="/" onSubmit={handleLogin}>
							<input type="text" name="username" placeholder="username" required/>
							<input type="password" name="password" placeholder="password" required/>
							<button type="submit">Login</button>
						</form>

						<p>
							Don't have an account?{" "}
							<span onClick={() => setCreateAccount(true)}>Create account</span>
						</p>
					</div>
				</>) : (<>
					{" "}
					<h2>Create Account</h2>
					<div className="wrapper">
						<form action="/" onSubmit={handleNewUser}>
							<input type="text" name="username" placeholder="username" required/>
							<input type="password" name="password" placeholder="password" required/>

							<button type="submit">Create Account</button>
						</form>

						<p>
							Already have account?{" "}
							<span onClick={() => setCreateAccount(false)}>Login</span>
						</p>
					</div>
				</>)}
		</div>);
};
export default Login;
//# sourceMappingURL=Login.js.map