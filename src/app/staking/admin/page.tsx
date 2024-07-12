import { Flex, Text } from "@chakra-ui/react";

import { StakerAdminContainer } from "@/containers/StakeAdminContainer";

export default function Page() {
	return (
		<Flex w="100%" h="100vh" p="130px" direction="column" gap="20px">
			<Flex justifyContent="space-between">
				<Text fontSize="24px" fontWeight="700">
					Staking Management
				</Text>
			</Flex>
			<StakerAdminContainer />
		</Flex>
	);
}
