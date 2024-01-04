import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const ChatApp = () => {
	const location = useLocation();
	useEffect(() => {
		// const userId = location.state?.userId;
		// console.log(userId);
		const token = localStorage.getItem("userId");
		console.log(token);
	}, []);

	return <h1>Home Page</h1>;
};

export default ChatApp;
