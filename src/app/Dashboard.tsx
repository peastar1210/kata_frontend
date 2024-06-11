"use client";

import { Flex, Text } from "@chakra-ui/react";
import { ReactTyped } from "react-typed";

export const Dashboard = () => {
	return (
		<>
			<Flex
				h="100vh"
				pt="350px"
				justifyContent="center"
				backgroundColor="orange"
				backgroundPosition="center"
				backgroundRepeat="no-repeat"
				opacity="0.7">
				<Flex direction="column" alignItems="center" gap="15px">
					<Text className="glow MS_font">Kata onboarding jobs</Text>
					<Text fontSize="30px" color="white">
						<ReactTyped
							strings={["Safe and Effecient Jobs", "Decentralized Job Network"]}
							typeSpeed={60}
							loop
							backSpeed={20}
							cursorChar="|"
							showCursor={true}
						/>
					</Text>
				</Flex>
			</Flex>
		</>
	);
};
