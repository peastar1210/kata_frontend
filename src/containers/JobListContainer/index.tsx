"use client";

import { ChangeEvent, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";

import JobBoardABI from "@/constants/abi/JobBoardABI.json";

export const JobListContainer = () => {
	const { data: jobList }: { data: Array<any> | undefined } = useReadContract({
		address: `0x${process.env.JOB_BOARD_ADDRESS}`,
		abi: JobBoardABI,
		functionName: "jobs",
		args: [1],
	});

	const { address } = useAccount();

	useEffect(() => {
		console.log(jobList);
	}, [jobList]);

	const jobDetail = (i: number) => {};

	return (
		<CardBody>
			<Flex direction="column">
				<hr />
				<Flex
					p="20px"
					justifyContent="space-between"
					borderBottom="1px solid #e2e8f0"
					_hover={{ backgroundColor: "orange", cursor: "pointer" }}
					onClick={() => jobDetail(1)}>
					<Text fontSize="18px">{jobList && jobList[1]}</Text>
					<Text fontSize="16px">{jobList && `${String(jobList[3])}$/hr`}</Text>
				</Flex>
				<Flex
					p="20px"
					justifyContent="space-between"
					borderBottom="1px solid #e2e8f0"
					_hover={{ backgroundColor: "orange", cursor: "pointer" }}>
					<Text fontSize="18px">{jobList && jobList[1]}</Text>
					<Text fontSize="16px">{jobList && `${String(jobList[3])}$/hr`}</Text>
				</Flex>
			</Flex>
		</CardBody>
	);
};
