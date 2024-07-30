"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Button,
	Flex,
	Input,
	Text,
	CardBody,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Badge,
} from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";

import JobBoardABI from "@/constants/abi/JobBoardABI.json";
import { JobBoardContractData } from "@/services/ContractData";
import { getConfig } from "@/wagmi";

export const JobListContainer = (props: any) => {
	const { address } = useAccount();

	const [config] = React.useState(() => getConfig());
	const [myJobs, setMyJobs] = useState<Array<any>>([]);

	const { data: jobLists }: { data: Array<any> | undefined } = useReadContract(
		JobBoardContractData("getJobs")
	);

	// let applicationLists: Array<any> | undefined;
	// if (jobLists) {
	// 	for (let jobInfo of jobLists) {
	// 		if (address === jobInfo?.employer) {
	// 			const { data: applicationLists } = useReadContract(
	// 				JobBoardContractData("getJobs", [jobInfo?.id, address])
	// 			);
	// 			if (applicationLists !== undefined) {
	// 				setMyJobs([...myJobs, applicationLists]);
	// 			}
	// 		}
	// 	}
	// }

	const jobDetail = (i: number) => {
		props.setJobId(i);
	};

	return (
		<CardBody>
			<Flex direction="column">
				<hr />
				{jobLists &&
					jobLists.map((jobItem: any, i: number) => (
						<Flex
							p="20px"
							justifyContent="space-between"
							borderBottom="1px solid #e2e8f0"
							_hover={{ backgroundColor: "#eee", cursor: "pointer" }}
							onClick={() => jobDetail(i)}
							key={i}>
							<Text fontSize="18px">
								{jobItem.title}&nbsp;
								{jobItem.employer === address && (
									<Badge colorScheme="purple">my job</Badge>
								)}
							</Text>
							<Text fontSize="16px">
								{jobLists && `${String(jobItem.reward)}$/hr`}
							</Text>
						</Flex>
					))}
			</Flex>
		</CardBody>
	);
};
