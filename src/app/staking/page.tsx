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
import { SettingsIcon } from "@chakra-ui/icons";

import { useReadContract } from "wagmi";

import StakeContainer from "@/containers/StakeContainer";
import { StakeListContainer } from "@/containers/StakeListContainer";
import { AdminBtn } from "@/components/buttons/AdminBtn";
import { Header } from "./Header";

export default function Page() {
	return (
		<Flex w="100%" h="100vh" p="130px" direction="column" gap="20px">
			<Header />
			<Flex
				w="full"
				gap="20px"
				justifyContent="space-around"
				flexGrow={1}
				paddingBottom="10vh">
				<StakeListContainer />
				<StakeContainer />
			</Flex>
		</Flex>
	);
}
