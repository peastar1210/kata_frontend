"use client";

import { ChangeEvent, useEffect, useState } from "react";
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
	Textarea,
} from "@chakra-ui/react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import JobBoardABI from "@/constants/JobBoardABI.json";

export const JobPostContainer = () => {
	const [title, setTitle] = useState<String>("");
	const [content, setContent] = useState<String>("");
	const [reward, setReward] = useState<Number>(0);

	const { writeContract } = useWriteContract();
	const { address } = useAccount();

	useEffect(() => {
		console.log(title, content, reward);
	}, [title, content, reward]);

	const postJob = async () => {
		try {
			console.log(`0x${process.env.JOB_BOARD_ADDRESS}`);
			writeContract({
				address: `0x${process.env.JOB_BOARD_ADDRESS}`,
				abi: JobBoardABI,
				functionName: "postJob",
				args: [title, content, reward],
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<CardBody px="120px">
				<Flex
					direction="column"
					gap="20px"
					justifyContent="center"
					alignItems="center">
					<Grid templateColumns="repeat(7, 1fr)" w="100%" gap={5}>
						<GridItem colSpan={1} alignSelf="center">
							<Text>Title: </Text>
						</GridItem>
						<GridItem colSpan={6}>
							<Input
								type="text"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setTitle(event.target.value)
								}
							/>
						</GridItem>
						<GridItem colSpan={1}>
							<Text>Content: </Text>
						</GridItem>
						<GridItem colSpan={6}>
							<Textarea
								h="250px"
								onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
									setContent(event.target.value)
								}
							/>
						</GridItem>
						<GridItem colSpan={1} alignSelf="center">
							<Text>Rate: </Text>
						</GridItem>
						<GridItem colSpan={5}>
							<Input
								type="number"
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setReward(Number(event.target.value))
								}
							/>
						</GridItem>
						<GridItem colSpan={1} alignSelf="center">
							<Text>$ per hour</Text>
						</GridItem>
					</Grid>

					<Button
						w="fit-content"
						px="20px"
						backgroundColor="orange"
						onClick={postJob}>
						Post
					</Button>
				</Flex>
			</CardBody>
		</>
	);
};
