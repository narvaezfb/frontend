import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import signalRService from "./../Services/SignalRService";
import SignalRService from "./../Services/SignalRService";
import * as signalR from "@microsoft/signalr";

const ChatApp = () => {
	const [messages, setMessages] = useState([]);
	const [receiverId, setReceiverId] = useState("");
	const [content, setContent] = useState("");
	const senderId = localStorage.getItem("userId");

	const [connection, setConnection] = useState(null);

	// Update the connection state when initializing
	useEffect(() => {
		const newConnection = new signalR.HubConnectionBuilder()
			.withUrl(`https://localhost:7126/chat-hub/?userId=${senderId}`)
			.withAutomaticReconnect()
			.build();

		setConnection(newConnection);
	}, [senderId]);

	useEffect(() => {
		if (connection) {
			startConnection();
			connection.on("ReceiveMessage", handleReceivedMessage);
			connection.on("ReceiveError", handleReceivedError);
		}

		return () => {
			stopConnection();
		};
	}, [connection]);

	const startConnection = async () => {
		try {
			if (
				connection.state === signalR.HubConnectionState.Connected ||
				connection.state === signalR.HubConnectionState.Connecting
			) {
				return console.log("Connecting.. ");
			}
			await connection.start();
			console.log(
				"SignalR connection started. Connection ID: ",
				connection.connectionId,
				"User ID: ",
				senderId
			);
		} catch (error) {
			console.error("Error starting SignalR connection:", error);
			throw error;
		}
	};

	const stopConnection = () => {
		if (
			connection &&
			connection.state === signalR.HubConnectionState.Connected
		) {
			connection.stop();
		}
	};

	const sendMessageToHub = async () => {
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
	};

	const handleReceivedError = (errorMessage) => {
		console.error("Received error:", errorMessage);
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
