"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";

import { AdminBtn } from "@/components/buttons/AdminBtn";

import StakingABI from "@/constants/abi/StakingABI.json";
import { StakingContractData } from "@/services/ContractData";

export const Header = () => {
	const { address } = useAccount();

	const { data: AdminAddress }: { data: string | undefined } = useReadContract(
		StakingContractData("owner")
	);

	return (
		<Flex justifyContent="space-between">
			<Text fontSize="24px" fontWeight="700">
				Staking
			</Text>
			{address && AdminAddress && address === AdminAddress && <AdminBtn />}
		</Flex>
	);
};
