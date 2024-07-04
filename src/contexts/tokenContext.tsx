import { fetchBalance } from "@wagmi/core";
import React, { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface TokenContextType {
	mtToken: number;
	rtToken: number;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

// export const TokenProvider: React.FC = ({ children }) => {
// 	const { isConnected, address } = useAccount();
// 	const mtTokenAddress = `0x${process.env.MT_TOKEN_ADDRESS}`;
// 	const rtTokenAddress = `0x${process.env.RT_TOKEN_ADDRESS}`;

// 	const [mtBalance, setMTBalance] = useState<number>(0);
// 	const [rtBalance, setRTBalance] = useState<number>(0);

// 	useEffect(() => {

//   }, [isConnected, address]);
// };
