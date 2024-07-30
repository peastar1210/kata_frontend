import StakingABI from "@/constants/abi/StakingABI.json";
import JBTTokenABI from "@/constants/abi/JBTTokenABI.json";
import JobBoardABI from "@/constants/abi/JobBoardABI.json";

export const StakingContractData = (
	functionName: string,
	props: any[] = []
) => {
	const address: `0x${string}` = `0x${process.env.STAKING_ADDRESS}`;
	return {
		address,
		abi: StakingABI,
		functionName,
		args: props,
	};
};

export const JobBoardContractData = (
	functionName: string,
	props: any[] = []
) => {
	const address: `0x${string}` = `0x${process.env.JOB_BOARD_ADDRESS}`;
	return {
		address,
		abi: JobBoardABI,
		functionName,
		args: props,
	};
};
