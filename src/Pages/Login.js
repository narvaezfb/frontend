import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const login = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post("https://localhost:7214/Auth/Login", {
				email,
				password,
			});

			if (response.status) {
				const token = response.data.token;
				localStorage.setItem("authToken", token);
				navigate("/");
			} else {
				console.log("Auth Failed");
			}
		} catch (error) {
			// Handle login error - display an error message, etc.
			console.error("Login error:", error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Typography component="h1" variant="h5">
				Login
			</Typography>
			<form onSubmit={login}>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="email"
					name="email"
					autoComplete="email"
					value={email}
					onChange={handleEmailChange}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<Button type="submit" fullWidth variant="contained" color="primary">
					Login
				</Button>
			</form>
		</Container>
	);
};

export default Login;
