import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import {
	arbitrum,
	base,
	mainnet,
	optimism,
	polygon,
	sepolia,
} from "wagmi/chains";

const ganache = {
	id: 1337,
	name: "Ganache",
	iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
	iconBackground: "#fff",
	nativeCurrency: { name: "Ganache", symbol: "ETH", decimals: 18 },
	rpcUrls: {
		default: { http: ["http://localhost:7545"] },
	},
	blockExplorers: {
		default: { name: "GanacheScan", url: "http://localhost:7545" },
	},
} as const satisfies Chain;

export const config = getDefaultConfig({
	appName: "RainbowKit demo",
	projectId: "YOUR_PROJECT_ID",
	chains: [
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		ganache,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
	],
	ssr: true,
});
