"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider, cookieToInitialState } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import AdminProvider from "@/contexts/adminContext";
import { getConfig } from "../wagmi";

const queryClient = new QueryClient();

export function Providers({
	children,
	initialState,
}: {
	children: React.ReactNode;
	initialState: State | undefined;
}) {
	const [config] = React.useState(() => getConfig());

	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<WagmiProvider config={config} initialState={initialState}>
					<AdminProvider>
						<RainbowKitProvider>{children}</RainbowKitProvider>
					</AdminProvider>
				</WagmiProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
