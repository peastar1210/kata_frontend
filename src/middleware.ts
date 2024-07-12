import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";
import { getConfig } from "./wagmi";

export function middleware(request: NextRequest) {
	// const validation = validateAdmin();
	// const value = false;

	const initialState = cookieToInitialState(
		getConfig(),
		headers().get("cookie")
	);

	let address;
	if (initialState && initialState.current) {
		const currentConnection = initialState.connections.get(
			initialState.current
		);
		address = currentConnection?.accounts[0];
	} else address = "0x0";

	if (address !== `0x${process.env.OWNER_ADDRESS}`)
		return NextResponse.redirect(new URL("/staking", request.url));
}

export const config = {
	matcher: "/staking/admin",
};
