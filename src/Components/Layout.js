import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<Container
				maxWidth="md"
				style={{ marginTop: "2rem", marginBottom: "2rem" }}
			>
				{children}
			</Container>
		</div>
	);
};

export default Layout;
