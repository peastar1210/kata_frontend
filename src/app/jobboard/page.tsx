import { Button, Flex, Input, Text } from "@chakra-ui/react";

export default function Page() {
	return (
		<Flex pt="110px" direction="column">
			<Flex
				w="100%"
				py="10px"
				px="50px"
				justifyContent="space-between"
				backgroundColor="#ddd">
				<Flex w="40%" gap="20px">
					<Input type="text" backgroundColor="white" />
					<Input type="text" backgroundColor="white" />
				</Flex>
				<Button backgroundColor="orange" color="white">
					Post Job
				</Button>
			</Flex>
			<Text>Job List</Text>
		</Flex>
	);
}
