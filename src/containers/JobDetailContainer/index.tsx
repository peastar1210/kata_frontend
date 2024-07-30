import { useEffect, useState } from "react";
import {
	Button,
	Flex,
	Input,
	Text,
	Textarea,
	Toast,
	useToast,
} from "@chakra-ui/react";

import {
	useAccount,
	useReadContract,
	useWatchContractEvent,
	useWriteContract,
} from "wagmi";
import { useWaitForTransactionReceipt } from "wagmi";

import { JobBoardContractData } from "@/services/ContractData";
import JBTTokenABI from "@/constants/abi/JBTTokenABI.json";
import { ApplicationsContainer } from "../ApplicationsContainer";

// import pinataSDK from "@pinata/sdk";
// import { PinataSDK } from "pinata";

// const pinata = new PinataSDK({
// 	pinataJWTKey:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYjIyNWM2ZC1jMmIyLTQ4NGMtYWE3MC1mZWRlNzdmYWE4MzYiLCJlbWFpbCI6Impvc2VwaGNvbGxpbnMxMjEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YzcxNGRhMWFiZTlmMjVkNDY3MCIsInNjb3BlZEtleVNlY3JldCI6ImRhZGQyNTZhZjg1ZmRlZWMzY2M5OWRmNjEzZjU5ZTU4MGZiYmRhOTMyMDE3ZWIwZjE4MjMyYTY2YTk1MGExMDciLCJpYXQiOjE3MjEzMzI0MDB9.h6SsPzUOuyP1IOyOzTA3hMV_fCd-IgGDkMDHpgTMV9Q",
// });

export const JobDetailContainer = (props: any) => {
	const { address } = useAccount();
	const { writeContract } = useWriteContract();
	const {
		writeContract: approveContract,
		error,
		data: hash,
	} = useWriteContract();
	const toast = useToast();

	const [coverLetter, setCoverLetter] = useState<string>("");
	const [applications, setApplications] = useState<any[]>([]);

	const { data: jobInfo }: { data: any } = useReadContract(
		JobBoardContractData("jobs", [Number(props?.jobId)])
	);
	const { data: applicationCount }: { data: any } = useReadContract(
		JobBoardContractData("applicationCount")
	);

	const { data: applicationLists }: { data: Array<any> | undefined } =
		useReadContract(
			JobBoardContractData("getApplications", [props?.jobId, address])
		);

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({ hash: hash as `0x${string}` });

	useEffect(() => {
		console.log(
			"jobInfo",
			jobInfo,
			props?.jobId,
			applicationLists,
			applicationCount
		);
	}, [jobInfo, applicationLists]);

	useEffect(() => {
		const applyForJob = async () => {
			let cid;
			try {
				const jobId = props?.jobId;
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						desc: coverLetter,
						jobId,
						fileName: Number(applicationCount),
					}),
				};

				// Fetch the API route
				const response = await fetch("/jobboard/api", options);

				if (response.status === 400)
					return toast({
						title: "Invalid data type",
						description: "cover letter can't be empty",
						status: "warning",
						position: "bottom-right",
						duration: 5000,
						isClosable: true,
					});

				if (response.status === 500) {
					return toast({
						title: "Job application failed",
						status: "error",
						position: "bottom-right",
						duration: 5000,
						isClosable: true,
					});
				}

				// Parse the JSON response
				const result = await response.json();
				cid = result.data;
				console.log("API response:", cid, props?.jobId);
				if (cid) {
					writeContract(
						JobBoardContractData("applyForJob", [Number(props?.jobId), cid])
					);
				}
			} catch (error) {
				console.error("Error storing data on IPFS:", error);
			}
		};

		if (isConfirmed) {
			applyForJob();
		}
	}, [isConfirmed]);

	useEffect(() => {
		const getData = async () => {
			const req = applicationLists?.map((item) => ({
				...item,
				jobId: Number(item.jobId),
				applicationId: Number(item.applicationId),
			}));
			try {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						data: req,
					}),
				};
				// Fetch the API route
				const response = await fetch("/jobboard/api/applications", options);
				const result = await response.json();
				console.log("getData", result);
				if (result.data) setApplications([...result.data]);
				else setApplications([]);
			} catch (err) {
				console.error(err);
			}
		};

		getData();
	}, [applicationLists]);

	const apply = async () => {
		// storeDataOnIPFS(coverLetter, Number(applicationCount), props?.jobId);
		try {
			await approveContract({
				address: `0x${process.env.JBT_TOKEN_ADDRESS}`,
				abi: JBTTokenABI,
				functionName: "approve",
				args: [
					`0x${process.env.JOB_BOARD_ADDRESS}`,
					BigInt(Number(jobInfo[3]) * Math.pow(10, 18)),
				],
			});
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	const handleCLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCoverLetter(event.target.value);
	};

	return (
		<Flex direction="column" px="60px" gap="20px">
			{/* <Text>{props.jobId ? props.jobId : ""}</Text> */}
			<Text fontSize="22px" fontWeight="700" textAlign="center">
				{jobInfo && jobInfo[1]}
			</Text>
			<hr />
			<Text fontSize="18px">
				{"job description: "}
				{jobInfo && jobInfo[2]}
			</Text>
			<Text fontSize="18px">
				{"job reward: "}
				{jobInfo && Number(jobInfo[3])}
				{"$/hour"}
			</Text>
			<hr />
			{jobInfo && jobInfo[4] !== address ? (
				<>
					<Flex direction="column" gap="5px">
						<Text>cover letter</Text>
						<Textarea minH="180px" onChange={handleCLChange} />
					</Flex>
					<Flex justifyContent="space-between" alignItems="center" pb="30px">
						<Text>
							{"Needed Token: "}
							{jobInfo && Number(jobInfo[3])}
						</Text>
						<Button px="30px" colorScheme="green" onClick={apply}>
							Apply
						</Button>
					</Flex>
				</>
			) : (
				<>
					<Text>Proposals:</Text>
					<Flex direction="column">
						<ApplicationsContainer
							list={applications}
							rate={jobInfo ? Number(jobInfo[3]) : 0}
						/>
					</Flex>
				</>
			)}
		</Flex>
	);
};
