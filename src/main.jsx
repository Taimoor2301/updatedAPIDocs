import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
	[polygonMumbai],
	[alchemyProvider({ apiKey: "-qVblrdxvU063096YDBM3grOmbyy19uJ" }), publicProvider()]
);
const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	projectId: "3a6bdecdc9f5d16795a4873c5293e220",
	chains,
});
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<WagmiConfig config={wagmiConfig}>
				<RainbowKitProvider chains={chains}>
					<App />
				</RainbowKitProvider>
			</WagmiConfig>
		</BrowserRouter>
	</React.StrictMode>
);
