"use client";

import { useContext, useEffect, useState } from "react";
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
	Badge,
} from "@chakra-ui/react";
import {
	BaseError,
	useAccount,
	useReadContract,
	useWriteContract,
	useWatchContractEvent,
} from "wagmi";

import StakingABI from "@/constants/abi/StakingABI.json";
import KataTokenABI from "@/constants/abi/KataTokenABI.json";
import { AdminContext } from "@/contexts/adminContext";
import { StakingContractData } from "@/services/StakingContractData";

const StakeContainer = () => {
	const validation = useContext(AdminContext);

	useEffect(() => {
		console.log("validation", validation);
	}, [validation]);

	const [selectedRate, setSelectedRate] = useState<number | null>(null);
	const [stakeAmount, setStakeAmount] = useState<number | null>(null);
	const [stakeDuration, setStakeDuration] = useState<number | null>(null);

	const { address } = useAccount();

	const { data: hash, writeContract, error } = useWriteContract();

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(event.target.value);
		setSelectedRate(Number(event.target.value.split("/")[0]));
		setStakeDuration(Number(event.target.value.split("/")[1]));
	};
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStakeAmount(Number(event.target.value));
	};

	const { data: stakeDurations }: { data: Array<any> | undefined } =
		useReadContract(StakingContractData("getRates"));

	const { data: isStopped }: { data: boolean | undefined } = useReadContract(
		StakingContractData("isStopped")
	);

	const stake = () => {
		if (!stakeAmount || selectedRate === null)
			return console.log("stake failed", stakeAmount, selectedRate);
		try {
			writeContract({
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
				writeContract(
					StakingContractData("stake", [logs[0]?.args?.value, selectedRate])
				);
		},
	});

	return (
		<Card flex="2">
			<CardHeader>
				<Text>Staking</Text>
			</CardHeader>
			<CardBody px="120px" pt="50px">
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
						<GridItem colSpan={3}>
							<Select onChange={handleSelectChange}>
								<option value=""></option>
								{stakeDurations && stakeDurations.length > 0 ? (
									stakeDurations
										.filter((item) => item.active === true)
										.map((item, index) => (
											<option
												key={index}
												value={index + "/" + item.lockDuration}>
												{`Rate: ${item.newInterestRate}%, Lock: ${
													Number(item.lockDuration) / 2592000
												} month`}
											</option>
										))
								) : (
									<option disabled>No stake durations available</option>
								)}
							</Select>
						</GridItem>
						<GridItem colSpan={4} pt="20px"></GridItem>
						<GridItem colSpan={1}></GridItem>
						<GridItem colSpan={1} textAlign="center">
							Stake / Reward:
						</GridItem>
						<GridItem colSpan={1} textAlign="center">
							<Badge fontSize="0.8em" colorScheme="red">
								{stakeAmount ? stakeAmount : "0"}
							</Badge>
							{" / "}
							<Badge fontSize="0.8em" colorScheme="green">
								{stakeAmount
									? selectedRate
										? (stakeAmount * (100 + selectedRate)) / 100
										: "0"
									: "0"}
							</Badge>
						</GridItem>
						<GridItem colSpan={1}></GridItem>
						<GridItem colSpan={1}></GridItem>
						<GridItem colSpan={1} textAlign="center">
							Stake Duration:
						</GridItem>
						<GridItem colSpan={1} textAlign="center">
							{stakeDuration && !isNaN(stakeDuration)
								? stakeDuration / 2592000
								: 0}{" "}
							months
						</GridItem>
						<GridItem colSpan={1}></GridItem>
					</Grid>
					<Flex></Flex>

					<Button
						w="fit-content"
						px="20px"
						colorScheme="orange"
						onClick={() => stake()}
						disabled={isStopped === true}>
						Stake
					</Button>
					{isStopped === true && (
						<Text>Staking is temporarily stopped. Try it again later.</Text>
					)}
				</Flex>
			</CardBody>
		</Card>
	);
};

export default StakeContainer;
