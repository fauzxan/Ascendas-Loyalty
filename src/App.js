import React from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import NavBarClient from "./components/NavBarClient"
import ClientRewardsList from "./components/ClientRewardsList";
import CardList from "./components/CardList";

function App() {
	//responsiveness

	return (
		<div>
			<NavBarClient />
			<ClientRewardsList />
		</div>
	);
}

export default App;
