import { signupService } from "../../../services/auth-services/signupService";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePwdToggler } from "../../../hooks/usePwdToggler";
export const Signup = () => {
	const [formVal, setFormVal] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	});
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const [pwdToggle, pwdToggler] = usePwdToggler();

	const signUpHandler = async (e, email, password, firstName, lastName) => {
		e.preventDefault();
		try {
			const res = await signupService(email, password, firstName, lastName);
			if (res.status === 201) {
				localStorage.setItem("tokenVL", res.data.encodedToken);
				localStorage.setItem("isAuthVL", true);
				setAuth({ tokenVL: res.data.encodedToken, isAuthVL: true });
				navigate("/");
			}
		} catch (err) {
			toast.error("Sorry! There was a problem");
		}
	};
	return (
		<div
			class="form-page-container flex-center"
			onSubmit={(e) =>
				signUpHandler(
					e,
					formVal.email,
					formVal.password,
					formVal.firstName,
					formVal.lastName
				)
			}
		>
			<form action="" class="form-container">
				<h2 class="padding-s text-center">SIGN UP</h2>
				<div class="flex-column gap-s">
					<div>
						<label for="email-input"> Email </label>
						<input
							type="email"
							class="input"
							id="email-input"
							placeholder="Enter Email"
							required
							value={formVal.email}
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
					</div>

					<div>
						<label for="email-password" className="flex-row gap-xs">
							<span>Password</span>
							<span
								data-tooltip="Password should have atleast 8 characters "
								class="tooltip"
							>
								<i class="fas fa-question-circle"></i>
							</span>{" "}
						</label>
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

					<div>
						<label for="first-name"> First Name </label>
						<input
							type="text"
							class="input"
							id="first-name"
							placeholder="Enter first name"
							value={formVal.firstName}
							required
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, firstName: e.target.value }))
							}
						/>
					</div>
					<div>
						<label for="last-name"> Last Name </label>
						<input
							type="text"
							class="input"
							id="last-name"
							placeholder="Enter last name"
							value={formVal.lastName}
							required
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, lastName: e.target.value }))
							}
						/>
					</div>
					<div>
						<label for="remember-me" class="flex-row gap-xs pointer">
							<input
								type="checkbox"
								name="checkbox"
								id="remember-me"
								class="input-checkbox"
								required
							/>
							I accept all Terms & Conditions
						</label>
					</div>

					<button class="btn btn-primary-solid">Sign Up</button>
					<a
						href="./login.html"
						class="text-center link-colored flex-center gap-xs"
					>
						Already have an account? <i class="fas fa-chevron-right"></i>
					</a>
				</div>
			</form>
		</div>
	);
};
