import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { VideoListingProvider } from "./context/VideosListingContext";
import { UserDataProvider } from "./context/UserDataContext";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

// Call make Server
makeServer();

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<UserDataProvider>
					<VideoListingProvider>
						<App />
					</VideoListingProvider>
				</UserDataProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
