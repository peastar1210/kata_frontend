"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAccount, useReadContract } from "wagmi";
import { useEffect } from "react";
import { erc20Abi } from "viem";

export const Header = () => {
	const { isConnected, address } = useAccount();
	const { data: kataTokenBalance } = useReadContract({
		address: `0x${process.env.KATA_TOKEN_ADDRESS}`,
		abi: erc20Abi,
		functionName: "balanceOf",
		args: ["0x2F42cB476F52650167812b11c2EA62B0a89bD26b"],
	});
	const { data: jbtTokenBalance } = useReadContract({
		address: `0x${process.env.JBT_TOKEN_ADDRESS}`,
		abi: erc20Abi,
		functionName: "balanceOf",
		args: ["0x2F42cB476F52650167812b11c2EA62B0a89bD26b"],
	});

	useEffect(() => {
		console.log(
			process.env.KATA_TOKEN_ADDRESS,
			process.env.STAKING_ADDRESS,
			address,
			kataTokenBalance,
			jbtTokenBalance
		);
	}, [address, kataTokenBalance, jbtTokenBalance]);

	const MotionFlex = motion(Flex);
	const variants = {
		y: [0, -5],
		transition: {
			duration: 0.2,
		},
	};

	return (
		<Flex
			position="fixed"
			w="full"
			px="40px"
			backgroundColor="white"
			justifyContent="space-between"
			alignItems="center"
			borderBottom="1px solid orange"
			zIndex={1}>
			<Flex gap="40px" alignItems="center">
				<Text fontSize="28px" fontWeight="bold" color="orange">
					Kata
				</Text>
				<Flex gap="10px" position="relative">
					<MotionFlex animate={{ y: 0 }} whileHover={variants}>
						<Link href="/">
							<Text p="30px">Home</Text>
						</Link>
					</MotionFlex>
					<MotionFlex animate={{ y: 0 }} whileHover={variants}>
						<Link href="/jobboard">
							<Text p="30px">Job Board</Text>
						</Link>
					</MotionFlex>
					<MotionFlex animate={{ y: 0 }} whileHover={variants}>
						<Link href="/staking">
							<Text p="30px">Staking</Text>
						</Link>
					</MotionFlex>
				</Flex>
			</Flex>
			<Flex alignItems="center" gap="10px">
				{isConnected && kataTokenBalance && (
					<Flex
						p="8px 12px"
						borderRadius="12px"
						boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
						fontFamily={`var(--rk-fonts-body)`}
						fontWeight={700}>
						Kata Token: {Number(kataTokenBalance) / Math.pow(10, 18)}
					</Flex>
				)}
				{isConnected && jbtTokenBalance && (
					<Flex
						p="8px 12px"
						borderRadius="12px"
						boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
						fontFamily={`var(--rk-fonts-body)`}
						fontWeight={700}>
						JBT Token: {Number(jbtTokenBalance) / Math.pow(10, 18)}
					</Flex>
				)}
				<ConnectButton />
			</Flex>
		</Flex>
	);
};
