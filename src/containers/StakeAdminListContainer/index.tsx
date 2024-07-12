"use client";

import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const stakeAdminList = [
	{ title: "Stake Setting", param: "setting" },
	{ title: "Stakers Setting", param: "staker" },
];

export const StakeAdminListContainer = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updateList = (order: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("view", order);
		return params.toString();
	};

	return (
		<Card flex="1">
			<CardHeader>
				<Text>Staking Management List</Text>
			</CardHeader>
			<CardBody>
				<Flex direction="column">
					<hr />
					{stakeAdminList.map((item: { title: string; param: string }, i) => (
						<Link href={pathname + "?" + updateList(item.param)} key={i}>
							<Flex
								p="12px"
								justifyContent="space-between"
								borderBottom="1px solid #e2e8f0"
								_hover={{
									backgroundColor: "orange",
									cursor: "pointer",
									color: "white",
								}}
								onClick={() => updateList(item.param)}>
								<Flex
									p="4px 12px"
									fontFamily={`var(--rk-fonts-body)`}
									fontWeight={600}>
									<Text fontSize="18px">{item.title}</Text>
								</Flex>
							</Flex>
						</Link>
					))}
				</Flex>
			</CardBody>
		</Card>
	);
};
