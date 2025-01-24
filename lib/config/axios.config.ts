let BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9092';

// Set the base URL dynamically
export const setBaseUrl = (newBaseUrl?: string): void => {
  BASE_URL = newBaseUrl || BASE_URL;
};

// Define a custom error class
export class ApiError extends Error {
  constructor(message: string, public statusCode: number, public details?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper to add Authorization header if token is available
const getAuthHeaders = (): Record<string, string> => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Interface for API call options
export interface ApiCallOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: Record<string, any>;
}

// Function to build query parameters
const buildQueryParams = (params: Record<string, any>): string => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
};

const UseFetchHook = async (
  endpoint: string,
  method: string,
  options: ApiCallOptions = {}
): Promise<any> => {
  const { headers = {}, params = {}, body = {} } = options;

  const url = `${BASE_URL}${endpoint}${buildQueryParams(params)}`;

  // Create a `Headers` object for better compatibility
  const allHeaders = new Headers({
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...headers,
  });

  try {
    const response = await fetch(url, {
      method,
      headers: allHeaders,
      body: ['GET', 'HEAD'].includes(method.toUpperCase()) ? undefined : JSON.stringify(body),
    });

    const contentType = response.headers.get('Content-Type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      console.log('API Error:', data);
      throw new ApiError(response.statusText, response.status, data);
    }

    return data;
  } catch (error: any) {
    console.log('Fetch API Error:', error.message);
    throw new ApiError(error.message, 500, error);
  }
};

export default UseFetchHook;
