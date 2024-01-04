import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import * as signalR from "@microsoft/signalr";

const ChatApp = () => {
	const [messages, setMessages] = useState([]);
	const [receiverId, setReceiverId] = useState("");
	const [content, setContent] = useState("");
	const senderId = localStorage.getItem("userId");

	const connection = new signalR.HubConnectionBuilder()
		.withUrl(`https://localhost:7126/chat-hub/?userId=${senderId}`)
		.build();

	useEffect(() => {
		startConnection();
		connection.on("ReceiveMessage", handleReceivedMessage);
		connection.on("ReceiveError", handleReceivedError);

		return () => {
			stopConnection();
		};
	}, []);

	const startConnection = async () => {
		try {
			if (
				connection.state !== signalR.HubConnectionState.Connected ||
				connection.state !== signalR.HubConnectionState.Connecting
			) {
				await connection.start();
				console.log(connection.state);
				return console.log("Connected to SignalR hub", connection.connectionId);
			}
			console.log(
				"Connection already in place to SignalR hub",
				connection.connectionId
			);
			return;
		} catch (error) {
			console.error("Error connecting to SignalR hub:", error);
		}
	};

	const stopConnection = async () => {
		if (
			connection &&
			connection.state === signalR.HubConnectionState.Connected
		) {
			connection.off("ReceiveMessage", handleReceivedMessage);
			connection.off("ReceiveError", handleReceivedError);
			connection.stop();
		}
	};

	const sendMessageToHub = async () => {
		await startConnection();

		if (connection.state === signalR.HubConnectionState.Connected) {
			connection
				.invoke("SendMessageToUser", senderId, receiverId, content)
				.then(() => {
					console.log("message has been sent!");
				})
				.catch((error) => {
					console.error("Error sending message to hub:", error);
				});
		} else {
			console.warn("SignalR connection is not established.");
		}
	};

	const handleReceivedMessage = (content) => {
		console.log("Received message:", content);
		// Handle the received message here (e.g., update state, display in UI)
	};

	const handleReceivedError = (errorMessage) => {
		console.error("Received error:", errorMessage);
		// Handle the error message (e.g., display an alert)
	};

	return (
		<Container maxWidth="md" sx={{ marginTop: "2rem" }}>
			<Box sx={{ display: "flex", flexDirection: "column", height: "80vh" }}>
				<Box sx={{ flexGrow: 1, overflowY: "scroll" }}>
					{messages.map((message, index) => (
						<Typography key={index} variant="body1" gutterBottom>
							{message}
						</Typography>
					))}
				</Box>
				<Box sx={{ marginTop: "1rem" }}>
					<TextField
						variant="outlined"
						fullWidth
						placeholder="Reciever:"
						value={receiverId}
						onChange={(e) => setReceiverId(e.target.value)}
					/>
					<TextField
						variant="outlined"
						fullWidth
						placeholder="Type a message..."
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={sendMessageToHub}
						sx={{ marginTop: "1rem" }}
					>
						Send
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default ChatApp;
