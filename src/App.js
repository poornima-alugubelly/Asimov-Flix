import "./App.css";

import { NavBar } from "./components/NavBar/NavBar";
import { NavRoutes } from "./routes/NavRoutes";
import { ToastContainer } from "react-toastify";
import { Footer } from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="App">
			<div className="content">
				<ToastContainer
					theme="colored"
					autoClose={1000}
					position="bottom-left"
				/>
				<NavBar />

				<NavRoutes />
			</div>
			<Footer />
		</div>
	);
}

export default App;
