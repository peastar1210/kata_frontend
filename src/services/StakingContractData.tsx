import StakingABI from "@/constants/abi/StakingABI.json";

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
