export function ellipseAddress(
	address: string = "",
	postwidth: number = 4,
	prewidth?: number
): string {
	return `${address.slice(
		0,
		prewidth ? prewidth : postwidth + 2
	)}...${address.slice(-postwidth)}`;
}
