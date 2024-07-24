import dotenv from 'dotenv';

dotenv.config();

const config = {
	environment: process.env.VITE_ENVIRONMENT ?? 'development',
	devApiUrl: process.env.VITE_DEV_API_URL ?? 'http://localhost:3000',
	prodApiUrl: process.env.VITE_PROD_API_URL ?? 'http://localhost:3000'
};

export default config;
