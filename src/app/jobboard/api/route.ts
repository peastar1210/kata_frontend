import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { desc, jobId, fileName } = body;
		console.log(desc, jobId, fileName);

		if (!desc || isNaN(jobId) || isNaN(fileName))
			return NextResponse.json(
				{ message: "Invalid data type" },
				{ status: 400 }
			);

		let IpfsHash;
		const options = {
			method: "POST",
			maxBodyLength: Infinity,
			headers: {
				Authorization: `Bearer ${process.env.PINATA_JWT}`,
				"Content-Type": "application/json",
			},
			body: `{"pinataOptions":{"groupId":"${process.env.GROUP_ID}"},"pinataMetadata":{"name":"${fileName}"},"pinataContent":{"applicationId": "${fileName}", "jobId": "${jobId}", "desc": "${desc}"}}`,
		};
		await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				IpfsHash = response.IpfsHash;
			})
			.catch((err) => console.error(err));
		return NextResponse.json({
			message: "Data processed successfully",
			data: IpfsHash,
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
