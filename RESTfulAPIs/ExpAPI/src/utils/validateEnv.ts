import { cleanEnv, port, str } from 'envalid';
const validateEnv = () => {
 cleanEnv(process.env, {
 NODE_ENV: str(),
 PORT: port(),
 API_NAME: str(),
 SESSION_SECRET_KEY: str(),
 });
};
export default validateEnv;