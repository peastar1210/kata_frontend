import {
	Button,
	Flex,
	Input,
	Text,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Grid,
	GridItem,
	Select,
} from "@chakra-ui/react";
import { useReadContract } from "wagmi";

import StakingABI from "@/constants/StakingABI.json";
import StakeContainer from "@/containers/StakeContainer";

export default function Page() {
	return (
		<Flex w="100%" h="100vh" p="130px" direction="column" gap="20px">
			<Text fontSize="24px" fontWeight="700">
				Staking
			</Text>
			<Flex w="full" gap="20px" justifyContent="space-around">
				<Card flex="1">
					<CardHeader>
						<Text>Staking Record</Text>
					</CardHeader>
					<CardBody></CardBody>
				</Card>
				<StakeContainer />
			</Flex>
		</Flex>
	);
}
