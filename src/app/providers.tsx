"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "../wagmi";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<WagmiProvider config={config}>
					<RainbowKitProvider>{children}</RainbowKitProvider>
				</WagmiProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
