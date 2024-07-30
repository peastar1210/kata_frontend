import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { data } = body;
		if (!data)
			return NextResponse.json({ message: "No applications" }, { status: 200 });
		const promises = data.map(async (item: any) => {
			const response = await axios.get(
				`https://magenta-abstract-wildcat-35.mypinata.cloud/ipfs/${item.ipfsHash}`
			);
			console.log("response", response);
			return {
				applicationId: Number(response.data.applicationId),
				jobId: item.jobId,
				applicant: item.applicant,
				cl: response.data.desc,
			};
		});

		const res = await Promise.all(promises);
		console.log("res", res);
		return NextResponse.json({
			message: "Data processed successfully",
			data: res,
		});
	} catch (error: any) {
		console.error("Error processing the request:", error);

		// Respond with an error message
		return NextResponse.json(
			{ message: "Error processing the request", error: error?.message },
			{ status: 500 }
		);
	}
}
