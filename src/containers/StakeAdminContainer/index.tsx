"use client";

import { useEffect } from "react";
import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";

import { StakeAdminListContainer } from "../StakeAdminListContainer";
import { StakerAdminSettingContainer } from "../StakeAdminSettingContainer";

export const StakerAdminContainer = () => {
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		const viewParam = urlParams.get("view");
		if (!viewParam) {
			window.history.pushState(null, "", `?view=setting`);
		}
	}, [window.location.search]);

	return (
		<Flex
			w="full"
			gap="20px"
			justifyContent="space-around"
			flexGrow={1}
			paddingBottom="10vh">
			<StakeAdminListContainer />
			<StakerAdminSettingContainer />
		</Flex>
	);
};
