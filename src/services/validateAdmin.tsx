import { useAccount, useReadContract } from "wagmi";

import StakingABI from "@/constants/abi/StakingABI.json";
import { useContext } from "react";
import { AdminContext } from "@/contexts/adminContext";

export const validateAdmin = () => {
	// const { address } = useAccount();
	// const { data: AdminAddress }: { data: string | undefined } = useReadContract({
	// 	address: `0x${process.env.STAKING_ADDRESS}`,
	// 	abi: StakingABI,
	// 	functionName: "owner",
	// });
	// if (address === AdminAddress) return true;
	// else return false;
	const validation = useContext(AdminContext);

	return validation;
};
