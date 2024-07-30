import { useEffect } from "react";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import { Providers } from "./providers";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { getConfig } from "@/wagmi";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

function RootLayout({ children }: { children: React.ReactNode }) {
	const initialState = cookieToInitialState(
		getConfig(),
		headers().get("cookie")
	);

	return (
		<html lang="en">
			<body>
				<Providers initialState={initialState}>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
