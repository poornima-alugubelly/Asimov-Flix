import "./App.css";

import { NavBar } from "./components/NavBar/NavBar";
import { PlaylistModal } from "./components/PlaylistModal/PlaylistModal";
import { NavRoutes } from "./routes/NavRoutes";
function App() {
	return (
		<div className="App">
			<NavBar />

			<NavRoutes />
		</div>
	);
}

export default App;
