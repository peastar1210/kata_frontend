"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

import { StakerSettingContainer } from "../StakerSettingContainer";
import { StakeSettingContainer } from "../StakeSettingContainer";

export const StakerAdminSettingContainer = () => {
	const searchParams = useSearchParams();

	const [param, setParam] = useState<string | null>("");

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		setParam(params.get("view"));
	}, [searchParams]);

	return (
		<Card flex="2">
			<CardHeader>
				<Text>{param === "setting" ? "Stake Setting" : "Staker Setting"}</Text>
			</CardHeader>
			<CardBody px="120px">
				{param === "setting" ? (
					<StakeSettingContainer />
				) : (
					<StakerSettingContainer />
				)}
			</CardBody>
		</Card>
	);
};
