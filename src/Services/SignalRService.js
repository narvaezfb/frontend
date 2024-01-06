import * as signalR from "@microsoft/signalr";

const signalRService = {
	connection: null,

	createConnection: (senderId) => {
		if (!signalRService.connection) {
			signalRService.connection = new signalR.HubConnectionBuilder()
				.withUrl(`https://localhost:7126/chat-hub/?userId=${senderId}`)
				.build();
		}
		return signalRService.connection;
	},

	handleOnClose: (reconnectCallback) => {
		signalRService.connection.onclose((error) => {
			console.log("Connection closed:", error);

			// Implement reconnection logic or show alerts/messages to the user
			if (typeof reconnectCallback === "function") {
				reconnectCallback(); // Call the provided reconnect callback function
			}
		});
	},
	startConnection: async (senderId) => {
		try {
			signalRService.createConnection(senderId); // Create the connection if not already created
			await signalRService.connection.start();
			console.log("SignalR connection started.");
		} catch (error) {
			console.error("Error starting SignalR connection:", error);
			throw error;
		}
	},

	stopConnection: () => {
		if (signalRService.connection) {
			signalRService.connection.stop();
			console.log("SignalR connection stopped.");
			signalRService.connection = null; // Reset the connection object
		}
	},

	getConnection: () => {
		return signalRService.connection;
	},
};

export default signalRService;
