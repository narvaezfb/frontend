import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6">Message Center</Typography>
				{/* Add other header content, navigation, etc. */}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
