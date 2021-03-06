import { useState } from "react";
import "../Auth.css";
import { loginService } from "../../../services/auth-services/loginService";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { usePwdToggler } from "../../../hooks/usePwdToggler";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export const Login = () => {
	const [formVal, setFormVal] = useState({ email: "", password: "" });
	const [pwdToggle, pwdToggler] = usePwdToggler();
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from.pathname || "/";
	const loginHandler = async (e, email, password) => {
		setFormVal({ email, password });
		e.preventDefault();
		try {
			const res = await loginService(email, password);
			if (res.status === 200) {
				toast.success("Successfully logged in!");
				localStorage.setItem("tokenVL", res.data.encodedToken);
				localStorage.setItem("isAuthVL", true);

				setAuth({ tokenVL: res.data.encodedToken, isAuthVL: true });
				navigate(from, { replace: true });
			}
		} catch (err) {
			toast.error(err.response.data.errors[0]);
		}
	};

	return (
		<div class="form-page-container flex-center">
			<form
				action=""
				class="form-container"
				onSubmit={(e) => loginHandler(e, formVal.email, formVal.password)}
			>
				<h2 class="padding-s text-center">LOGIN</h2>
				<div class="flex-column gap-s">
					<div>
						<label for="email-input"> Email </label>
						<input
							type="email"
							class="input"
							id="email-input"
							placeholder="Enter Email"
							value={formVal.email}
							required
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
						<span class="form-error-msg">Enter valid Email</span>
					</div>

					<div>
						<label for="email-password"> Password </label>
						<div class="input input-with-icon flex-space-between">
							<input
								type={`${pwdToggle.type}`}
								id="email-password"
								pattern="^.{8,}$"
								required
								placeholder="Enter Password"
								value={formVal.password}
								onChange={(e) =>
									setFormVal((prev) => ({ ...prev, password: e.target.value }))
								}
							/>

							<span
								class={`fas ${pwdToggle.class} pointer`}
								role="button"
								onClick={() => pwdToggler()}
							></span>
						</div>

						<span class="form-error-msg">
							Password must have atleast 8 characters
						</span>
					</div>
					<div class="form-subtext flex-space-between">
						<label for="remember-me" class="flex-row gap-xs pointer">
							<input
								type="checkbox"
								name="checkbox"
								id="remember-me"
								class="input-checkbox"
							/>
							Remember-me
						</label>
						<a href="#" class="txt-high-light link-colored">
							Forgot your password?
						</a>
					</div>
					<button class="btn btn-primary-solid">Login</button>
					<button
						class="btn btn-primary-outline"
						onClick={(e) =>
							loginHandler(e, "adarshbalika@gmail.com", "adarshBalika123")
						}
					>
						Login with test credentials
					</button>
					<Link
						to="/Signup"
						class="text-center link-colored flex-center gap-xs"
					>
						Create New account <i class="fas fa-chevron-right"></i>
					</Link>
				</div>
			</form>
		</div>
	);
};
