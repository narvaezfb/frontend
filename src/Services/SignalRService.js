import * as signalR from "@microsoft/signalr";

class SignalRService {
	constructor() {
		this.connection = null;
	}

	async createConnection(senderId) {
		if (!this.connection) {
			this.connection = new signalR.HubConnectionBuilder()
				.withUrl(`https://localhost:7126/chat-hub/?userId=${senderId}`)
				.build();
		}
		return this.connection;
	}

	handleOnClose(reconnectCallback) {
		this.connection.onclose((error) => {
			console.log("Connection closed:", error);

			// Implement reconnection logic or show alerts/messages to the user
			if (typeof reconnectCallback === "function") {
				reconnectCallback(); // Call the provided reconnect callback function
			}
		});
	}

	async startConnection() {
		try {
			await this.connection.start();
			console.log("SignalR connection started.");
		} catch (error) {
			console.error("Error starting SignalR connection:", error);
			throw error;
		}
	}

	stopConnection() {
		if (this.connection) {
			this.connection.stop();
			console.log("SignalR connection stopped.");
			this.connection = null;
		}
	}

	getConnection() {
		return this.connection;
	}
}

export default SignalRService;
