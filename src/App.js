import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Chat" element={<Chat />} />
			</Routes>
		</Layout>
	);
};

export default App;
