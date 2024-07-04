/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config) => {
		config.externals.push("pino-pretty", "lokijs", "encoding");
		return config;
	},
	env: {
		KATA_TOKEN_ADDRESS: process.env.KATA_TOKEN_ADDRESS,
		JBT_TOKEN_ADDRESS: process.env.JBT_TOKEN_ADDRESS,
		STAKING_ADDRESS: process.env.STAKING_ADDRESS,
		JOB_BOARD_ADDRESS: process.env.JOB_BOARD_ADDRESS,
	},
};

module.exports = nextConfig;
