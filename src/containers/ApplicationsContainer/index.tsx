import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Flex,
	Button,
	Text,
} from "@chakra-ui/react";
import {
	useAccount,
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";

import { JobBoardContractData } from "@/services/ContractData";
import { ellipseAddress } from "@/services/blockchain";

import JBTTokenABI from "@/constants/abi/JBTTokenABI.json";
import { useEffect, useState } from "react";

interface IApplicationsContainer {
	list: any[];
	rate: number;
}

interface IApplication {
	jobId: number;
	applicationId: number;
	applicant: string;
	cl: string;
}

export const ApplicationsContainer = ({
	list,
	rate,
}: IApplicationsContainer) => {
	const { address } = useAccount();

	const [data, setData] = useState<IApplication>();

	const { error, writeContract } = useWriteContract();
	const { writeContract: approveContract, data: hash } = useWriteContract();

	const { data: application } = useReadContract(
		JobBoardContractData("applications", [0])
	);

	const { data: job } = useReadContract(JobBoardContractData("jobs", [1]));

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({ hash: hash as `0x${string}` });

	const accept = (item: IApplication) => {
		setData(item);
		try {
			approveContract({
				address: `0x${process.env.JBT_TOKEN_ADDRESS}`,
				abi: JBTTokenABI,
				functionName: "approve",
				args: [
					`0x${process.env.JOB_BOARD_ADDRESS}`,
					BigInt(rate * Math.pow(10, 18)),
				],
			});
		} catch (err) {
			console.log("Error", err);
		}
	};

	useEffect(() => {
		const acceptCL = () => {
			try {
				writeContract(
					JobBoardContractData("acceptApplication", [data?.applicationId])
				);
			} catch (err) {
				console.log("Error", err);
			}
		};

		if (isConfirmed) acceptCL();
	}, [isConfirmed]);

	return (
		<Accordion defaultIndex={[0]} allowMultiple>
			{error && error.message}
			{list.length !== 0 ? (
				list.map((item: any, i: number) => (
					<AccordionItem key={i}>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									{ellipseAddress(item.applicant, 3)}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<Flex
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								gap="10px">
								<Flex flexGrow={1}>{item.cl}</Flex>
								<Button colorScheme="blue" w="20%" onClick={() => accept(item)}>
									Accept
								</Button>
							</Flex>
						</AccordionPanel>
					</AccordionItem>
				))
			) : (
				<Text>There are no applications yet.</Text>
			)}
		</Accordion>
	);
};
