// Environment configuration checker
const requiredEnvVars = [
  'VITE_API_URL',
  'VITE_GOOGLE_CLIENT_ID',
  'VITE_MERCADOPAGO_PUBLIC_KEY'
];

const checkEnvironment = () => {
  const missing = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing);
    console.warn('Please check your .env file');
  }
  
  // Check API URL accessibility
  if (import.meta.env.VITE_API_URL) {
    console.log('🔗 API URL configured:', import.meta.env.VITE_API_URL);
  }
  
  return {
    isValid: missing.length === 0,
    missing
  };
};

export default checkEnvironment;