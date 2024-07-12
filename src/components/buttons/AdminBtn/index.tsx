"use client";

import { Button } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

import { useRouter, usePathname } from "next/navigation";

export const AdminBtn = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Button
			colorScheme="green"
			onClick={() => router.push(pathname + "/admin")}>
			<SettingsIcon /> &nbsp;Admin
		</Button>
	);
};
