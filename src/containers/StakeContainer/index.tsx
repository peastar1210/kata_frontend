"use client";

import { useEffect, useState } from "react";
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
import {
	BaseError,
	useAccount,
	useReadContract,
	useWriteContract,
	useWatchContractEvent,
} from "wagmi";

import StakingABI from "@/constants/StakingABI.json";
import KataTokenABI from "@/constants/KataTokenABI.json";

const StakeContainer = () => {
	const [selectedRate, setSelectedRate] = useState<number | null>(null);
	const [stakeAmount, setStakeAmount] = useState<number | null>(null);

	const { address } = useAccount();

	const { data: hash, writeContract, error } = useWriteContract();

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(event.target.value);
		setSelectedRate(Number(event.target.value));
	};
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStakeAmount(Number(event.target.value));
	};

	const { data: stakeDurations }: { data: Array<any> | undefined } =
		useReadContract({
			address: `0x${process.env.STAKING_ADDRESS}`,
			abi: StakingABI,
			functionName: "getRates",
		});

	const { data: approveAmount }: { data: any } = useReadContract({
		address: `0x${process.env.KATA_TOKEN_ADDRESS}`,
		abi: KataTokenABI,
		functionName: "allowance",
		args: [address, `0x${process.env.STAKING_ADDRESS}`],
	});

	const { data: ktAddress }: { data: any } = useReadContract({
		address: `0x${process.env.STAKING_ADDRESS}`,
		abi: StakingABI,
		functionName: "mainToken",
	});

	const stake = async () => {
		if (!stakeAmount || selectedRate === null)
			return console.log("stake failed", stakeAmount, selectedRate);
		try {
			console.log(
				stakeAmount,
				selectedRate,
				`0x${process.env.STAKING_ADDRESS}`,
				`0x${process.env.KATA_TOKEN_ADDRESS}`
			);
			await writeContract({
				address: `0x${process.env.KATA_TOKEN_ADDRESS}`,
				abi: KataTokenABI,
				functionName: "approve",
				args: [
					`0x${process.env.STAKING_ADDRESS}`,
					BigInt(stakeAmount * Math.pow(10, 18)),
				],
			});
		} catch (err) {
			console.log(err);
		}
	};

	const changeStaking = async () => {
		try {
			console.log(
				stakeAmount,
				selectedRate,
				`0x${process.env.STAKING_ADDRESS}`
			);
			writeContract({
				address: `0x${process.env.STAKING_ADDRESS}`,
				abi: StakingABI,
				functionName: "changeStakingStatus",
				args: [false],
			});
			console.log("sss");
		} catch (err) {
			console.log(err);
		}
	};

	useWatchContractEvent({
		address: `0x${process.env.KATA_TOKEN_ADDRESS}`,
		abi: KataTokenABI,
		eventName: "Approval",
		onLogs(logs: any) {
			console.log("Approval", logs);
			if (
				logs[0]?.args?.owner === address ||
				logs[0]?.args?.spender === `0x${process.env.STAKING_ADDRESS}`
			)
				writeContract({
					address: `0x${process.env.STAKING_ADDRESS}`,
					abi: StakingABI,
					functionName: "stake",
					args: [logs[0]?.args?.value, selectedRate],
				});
		},
	});

	useEffect(() => {
		console.log("stakeDurations", stakeDurations);
		if (stakeDurations) setSelectedRate(0);
	}, [stakeDurations]);

	return (
		<Card flex="2">
			<CardHeader>
				<Text>Staking</Text>
			</CardHeader>
			<CardBody px="120px">
				<Flex
					direction="column"
					gap="20px"
					justifyContent="center"
					alignItems="center">
					<Grid templateColumns="repeat(4, 1fr)" gap={5} alignItems="center">
						<GridItem colSpan={1}>
							<Text>Staking Amount: </Text>
						</GridItem>
						<GridItem colSpan={3}>
							<Input type="number" onChange={handleInputChange} />
						</GridItem>
						<GridItem colSpan={1}>
							<Text>Staking Duration: </Text>
						</GridItem>
						<GridItem colSpan={2}>
							<Select onChange={handleSelectChange}>
								{stakeDurations && stakeDurations.length > 0 ? (
									stakeDurations.map((item, index) => (
										<option key={index} value={index}>
											{`Rate: ${item.newInterestRate}%, Lock: ${
												Number(item.timeStamp) / 2592000000
											} month`}
										</option>
									))
								) : (
									<option disabled>No stake durations available</option>
								)}
							</Select>
						</GridItem>
					</Grid>
					<Flex></Flex>

					<Button
						w="fit-content"
						px="20px"
						colorScheme="orange"
						onClick={() => stake()}>
						Stake
					</Button>
					{/* {error && (
						<div>
							Error: {(error as BaseError).shortMessage || error.message}
						</div>
					)} */}

					<Button
						w="fit-content"
						px="20px"
						colorScheme="orange"
						onClick={() => changeStaking()}>
						stop staking
					</Button>
				</Flex>
			</CardBody>
		</Card>
	);
};

export default StakeContainer;
