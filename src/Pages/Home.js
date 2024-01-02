import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";

const ChatApp = () => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState("");

	const handleMessageSend = () => {
		if (inputMessage.trim() !== "") {
			setMessages([...messages, inputMessage]);
			setInputMessage("");
		}
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
						placeholder="Type a message..."
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleMessageSend}
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
