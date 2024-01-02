import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Login" element={<Login />} />
			</Routes>
		</Layout>
	);
};

export default App;
