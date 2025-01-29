const isDevelopment = process.env.NODE_ENV === 'development';
const LOCAL_IP = '192.168.190.25'; // Your computer's local IP

// Make sure to use the correct port numbers
export const API_URL = isDevelopment 
  ? `http://${LOCAL_IP}:4000`  // Local backend URL for development
  : 'https://clgevent-back.onrender.com'; // Deployed backend URL

export const SOCKET_URL = isDevelopment 
  ? `http://${LOCAL_IP}:4000`  // Local backend URL for development
  : 'https://clgevent-back.onrender.com'; // Deployed backend URL

// Add this for debugging
console.log('API_URL:', API_URL);
console.log('SOCKET_URL:', SOCKET_URL);
