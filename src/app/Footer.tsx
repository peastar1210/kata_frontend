"use client";

import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
	const MotionFlex = motion(Flex);
	const variants = {
		y: [0, -5],
		transition: {
			duration: 0.2, // Duration for each loop
		},
	};

	return (
		<Flex
			w="100%"
			position="fixed"
			bottom={0}
			backgroundColor="white"
			justifyContent="center"
			borderTop="1px solid orange"
			zIndex={1}>
			<Flex py="30px" position="relative" direction="column">
				<Flex gap="10px">
					<MotionFlex animate={{ y: 0 }} whileHover={variants}>
						<Link href="/">
							<Text p="20px">Term</Text>
						</Link>
					</MotionFlex>
					<MotionFlex animate={{ y: 0 }} whileHover={variants}>
						<Link href="/">
							<Text p="20px">Agreement</Text>
						</Link>
					</MotionFlex>
					<MotionFlex animate={{ y: 0 }} whileHover={variants}>
						<Link href="/">
							<Text p="20px">Policy</Text>
						</Link>
					</MotionFlex>
				</Flex>
				<Text textAlign="center" fontSize="12px" pb="30px">
					@2024 Key2Moon Solutions
				</Text>
			</Flex>
		</Flex>
	);
};
