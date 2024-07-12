"use client";

import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import StakingABI from "@/constants/abi/StakingABI.json";
import KataTokenABI from "@/constants/abi/KataTokenABI.json";
import { Key, useEffect } from "react";
import { StakingContractData } from "@/services/StakingContractData";

export const StakeListContainer = () => {
	const { address } = useAccount();

	const { writeContract } = useWriteContract();

	const { data: stakingList }: { data: any } = useReadContract(
		StakingContractData("userDeposits", [address])
	);

	const getReward = (i: number) => {
		console.log("getReward", i);
		writeContract(StakingContractData("unstake", [i]));
	};

	const getTimeLeft = (endTime: number) => {
		const now = Math.floor(Date.now() / 1000); // current time in seconds
		const timeLeftSeconds = endTime - now;

		if (timeLeftSeconds <= 0) {
			return "getReward";
		}

		const daysLeft = Math.floor(timeLeftSeconds / (24 * 60 * 60));
		const hoursLeft = Math.floor(
			(timeLeftSeconds % (24 * 60 * 60)) / (60 * 60)
		);

		if (daysLeft > 1) {
			return `${daysLeft} days left`;
		} else if (daysLeft === 1) {
			return `1 day left`;
		} else {
			return `${hoursLeft}h left`;
		}
	};

	return (
		<Card flex="1">
			<CardHeader>
				<Text>Staking Record</Text>
			</CardHeader>
			<CardBody>
				<Flex direction="column">
					<hr />
					{stakingList &&
						stakingList.length > 0 &&
						stakingList.map(
							(
								item: { depositAmount: any; endTime: any; index: number },
								i: Key | null | undefined
							) => (
								<Flex
									key={i}
									p="12px"
									justifyContent="space-between"
									borderBottom="1px solid #e2e8f0"
									color="orange"
									_hover={{
										backgroundColor: "rgb(245, 245, 245)",
									}}>
									<Flex
										p="4px 12px"
										borderRadius="12px"
										boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
										fontFamily={`var(--rk-fonts-body)`}
										fontWeight={700}>
										<Text fontSize="18px">
											{Number(item.depositAmount) / Math.pow(10, 18)}
										</Text>
									</Flex>
									<Flex
										p="4px 12px"
										borderRadius="12px"
										boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
										fontFamily={`var(--rk-fonts-body)`}
										fontWeight={500}
										color="black"
										{...(getTimeLeft(Number(item.endTime)) === "getReward"
											? (onclick = () => getReward(item.index))
											: null)}
										_hover={
											getTimeLeft(Number(item.endTime)) === "getReward"
												? { backgroundColor: "orange", cursor: "pointer" }
												: ""
										}>
										<Text fontSize="16px">
											{getTimeLeft(Number(item.endTime))}
										</Text>
									</Flex>
								</Flex>
							)
						)}
				</Flex>
			</CardBody>
		</Card>
	);
};
