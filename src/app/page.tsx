import { Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Dashboard } from "./Dashboard";

function Page() {
	return (
		<Flex direction="column">
			<Dashboard />
		</Flex>
	);
}

export default Page;
