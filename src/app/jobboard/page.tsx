"use client";

import { JobListContainer } from "@/containers/JobListContainer";
import { JobPostContainer } from "@/containers/JobPostContainer";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Input,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Page() {
	const [postJob, setPostJob] = useState<boolean>(false);

	return (
		<Flex h="100vh" pt="110px" direction="column">
			<Flex
				w="100%"
				py="10px"
				px="50px"
				justifyContent="space-between"
				backgroundColor="#ddd">
				<Flex w="40%" gap="20px">
					<Input type="text" backgroundColor="white" placeholder="Job Title" />
					<Input
						type="text"
						backgroundColor="white"
						placeholder="Job Location"
					/>
				</Flex>
				<Button
					backgroundColor="orange"
					color="white"
					onClick={() => setPostJob(true)}>
					Post Job
				</Button>
			</Flex>
			<Flex grow={1} p="20px 50px 200px 50px" gap="20px">
				<Card flex="1">
					<CardHeader>
						<Text fontSize="22px" fontWeight="600">
							Job List
						</Text>
					</CardHeader>
					<JobListContainer />
				</Card>
				<Card flex="2">
					<CardHeader>
						<Text fontSize="22px" fontWeight="600">
							{postJob ? "Post a new job" : "Job Detail"}
						</Text>
					</CardHeader>
					{postJob ? <JobPostContainer /> : ""}
				</Card>
			</Flex>
		</Flex>
	);
}
