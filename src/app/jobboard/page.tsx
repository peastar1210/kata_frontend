"use client";

import { JobDetailContainer } from "@/containers/JobDetailContainer";
import { JobListContainer } from "@/containers/JobListContainer";
import { JobPostContainer } from "@/containers/JobPostContainer";
import { JobBoardContractData } from "@/services/ContractData";
import { SearchIcon } from "@chakra-ui/icons";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

export default function Page() {
	const [postJob, setPostJob] = useState<boolean>(false);
	const [jobId, setJobId] = useState<number | null>(null);

	const { address } = useAccount();

	// const { data: applications } = useReadContract(
	// 	JobBoardContractData("getApplications", [Number(props?.jobId), cid])
	// );

	return (
		<Flex h="100vh" pt="110px" direction="column">
			<Flex
				w="100%"
				py="10px"
				px="50px"
				justifyContent="space-between"
				backgroundColor="#ddd">
				<Flex w="40%" gap="20px">
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<SearchIcon color="gray.300" />
						</InputLeftElement>
						<Input
							type="text"
							backgroundColor="white"
							placeholder="Job Title"
						/>
					</InputGroup>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<SearchIcon color="gray.300" />
						</InputLeftElement>
						<Input
							type="text"
							backgroundColor="white"
							placeholder="Salary Rate"
						/>
					</InputGroup>
				</Flex>
				<Button
					backgroundColor="orange"
					color="white"
					onClick={() => setPostJob(true)}>
					Post Job
				</Button>
			</Flex>
			<Flex grow={1} h="50vh" p="20px 50px 200px 50px" gap="20px">
				<Card
					flex="1"
					overflow="auto"
					sx={{
						borderRadius: "5px",
						"&::-webkit-scrollbar": {
							height: "3px",
							border: "none",
							width: "3px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "#ccc",
							// borderRadius: '1px',
							border: "none",
							width: "2px !important",
						},
						"&::-webkit-scrollbar-track": {
							// borderRadius: '2px',
							border: "none",
							top: 0,
						},
						"&::scrollBehavior": "auto",
						touchAction: "manipulation",
					}}>
					<CardHeader>
						<Text fontSize="22px" fontWeight="600">
							Job List
						</Text>
					</CardHeader>
					<JobListContainer setJobId={setJobId} />
				</Card>
				<Card
					flex="2"
					overflow="auto"
					sx={{
						borderRadius: "5px",
						"&::-webkit-scrollbar": {
							height: "3px",
							border: "none",
							width: "3px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "#ccc",
							// borderRadius: '1px',
							border: "none",
							width: "2px !important",
						},
						"&::-webkit-scrollbar-track": {
							// borderRadius: '2px',
							border: "none",
							top: 0,
						},
						"&::scroll-behavior": "auto",
						touchAction: "manipulation",
					}}>
					<CardHeader>
						<Text fontSize="22px" fontWeight="600">
							{postJob ? "Post a new job" : "Job Detail"}
						</Text>
					</CardHeader>
					{postJob ? (
						<JobPostContainer setPostJob={setPostJob} />
					) : (
						<JobDetailContainer jobId={jobId} />
					)}
				</Card>
			</Flex>
		</Flex>
	);
}
