import { useState } from "react";
import {
	Badge,
	Button,
	Flex,
	Grid,
	GridItem,
	Input,
	Select,
	Text,
} from "@chakra-ui/react";
import {
	BaseError,
	useAccount,
	useReadContract,
	useWriteContract,
	useWatchContractEvent,
} from "wagmi";

import StakingABI from "@/constants/abi/StakingABI.json";
import { StakingContractData } from "@/services/StakingContractData";

export const StakeSettingContainer = () => {
	const { address } = useAccount();
	const { writeContract } = useWriteContract();

	const [reward, setReward] = useState<number>(5);
	const [duration, setDuration] = useState<number | null>(null);
	const [stake, setStake] = useState<number | null>(null);

	const handleRewardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReward(Number(event?.target.value));
	};
	const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDuration(Number(event?.target.value));
	};
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setStake(Number(event.target.value));
	};

	const { data: stakingStatus }: { data: any } = useReadContract(
		StakingContractData("isStopped")
	);
	const { data: stakeDurations }: { data: Array<any> | undefined } =
		useReadContract(StakingContractData("getRates"));

	const addStake = () => {
		if (!reward || !duration) return;

		try {
			writeContract(
				StakingContractData("setRateAndLockduration", [
					reward,
					duration * 2592000,
				])
			);
		} catch (err) {
			console.log("Error: ", err);
		}
	};

	const removeStake = () => {
		if (stake === null) return;

		try {
			writeContract(StakingContractData("removeRateAndLockduration", [stake]));
		} catch (err) {
			console.log("Error: ", err);
		}
	};

	const changeStaking = async () => {
		try {
			writeContract(
				StakingContractData("changeStakingStatus", [
					stakingStatus ? false : true,
				])
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Flex
			direction="column"
			gap="20px"
			justifyContent="center"
			alignItems="center">
			<Grid
				templateColumns="repeat(5, 1fr)"
				gap={5}
				alignItems="center"
				justifyContent="space-around">
				<GridItem colSpan={1}>
					<Text>Staking Reward: </Text>
				</GridItem>
				<GridItem colSpan={3}>
					<Input type="number" onChange={handleRewardChange} />
				</GridItem>
				<GridItem colSpan={1}>
					<Text textAlign="right">%</Text>
				</GridItem>
				<GridItem colSpan={1}>
					<Text>Staking Duration: </Text>
				</GridItem>
				<GridItem colSpan={3}>
					<Input type="number" onChange={handleDurationChange} />
				</GridItem>
				<GridItem colSpan={1}>
					<Text textAlign="right">Month(s)</Text>
				</GridItem>
			</Grid>
			<Button
				w="fit-content"
				px="20px"
				colorScheme="orange"
				onClick={() => addStake()}>
				Add New Stake
			</Button>

			<Flex w="100%" borderBottom="1px solid #e2e8f0" />

			<Grid
				templateColumns="repeat(5, 1fr)"
				gap={5}
				alignItems="center"
				justifyContent="space-around"
				py="20px">
				<GridItem colSpan={1}>Stake List:</GridItem>
				<GridItem colSpan={3}>
					<Select onChange={handleSelectChange}>
						<option value=""></option>
						{stakeDurations && stakeDurations.length > 0 ? (
							stakeDurations
								.filter((item) => item.active === true)
								.map((item, index) => (
									<option key={index} value={index}>
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
				<GridItem colSpan={1}>
					<Button onClick={removeStake}>remove Stake</Button>
				</GridItem>
			</Grid>

			<Flex w="100%" borderBottom="1px solid #e2e8f0" />
			<Flex w="100%" pt="30px" justifyContent="space-around">
				<Flex fontSize="18px" fontWeight={600} gap="20px" alignItems="center">
					Staking Status:{" "}
					{stakingStatus ? (
						<Badge colorScheme="red">inactive</Badge>
					) : (
						<Badge colorScheme="green">active</Badge>
					)}
				</Flex>

				<Button
					w="fit-content"
					px="20px"
					colorScheme="orange"
					onClick={() => changeStaking()}>
					{stakingStatus ? "start" : "stop"} staking
				</Button>
			</Flex>
		</Flex>
	);
};
