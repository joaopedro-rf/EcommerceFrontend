import useSWR, { mutate } from 'swr';


const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error('Fetch failed:', error.message);
    throw error;
  }
}; 

const useCart = ({userId}) => {
  const URL =  `https://api.joaopedrodev.com/api/carts/${userId}`;
  const { data, error } = useSWR(URL, fetcher, {
    onError: (err) => {
      console.error('SWR error:', err);
    },
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const isLoading = !data && !error;

  const refreshProducts = () => {
    mutate(URL);
  };

  return {
    data,
    error,
    isLoading,
    refreshProducts,
  };
};

export default useCart;