import React, { ReactNode, createContext, useEffect, useState } from "react";

import { useAccount, useReadContract } from "wagmi";

import StakingABI from "@/constants/abi/StakingABI.json";
import { StakingContractData } from "@/services/StakingContractData";

interface AdminContextType {
	validation: boolean;
}

export const AdminContext = createContext<AdminContextType | undefined>(
	undefined
);

const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [validation, setValidation] = useState<boolean>(false);

	const { address } = useAccount();

	const { data: AdminAddress }: { data: string | undefined } = useReadContract(
		StakingContractData("owner")
	);

	useEffect(() => {
		if (address === AdminAddress) setValidation(true);
		else setValidation(false);
	}, [address, AdminAddress]);

	return (
		<AdminContext.Provider value={{ validation }}>
			{children}
		</AdminContext.Provider>
	);
};

export default AdminProvider;
