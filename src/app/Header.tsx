"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Header = () => {
	const MotionFlex = motion(Flex);
	const variants = {
		y: [0, -5],
		transition: {
			duration: 0.2, // Duration for each loop
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
			<ConnectButton />
		</Flex>
	);
};
