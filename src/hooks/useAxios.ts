import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = (dataUrl: string) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounded = true;
    let controller = new AbortController();
    let timerId: NodeJS.Timeout | null = null;

    const getData = async (url: string) => {
      setIsLoading(true);

      try {
        const response = await axios.get(url, {
          signal: controller.signal,
        });

        if (isMounded) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error: any) {
        if (isMounded) {
          setFetchError(error.message);
          setData([]);
        }
      } finally {
        if (isMounded) {
          timerId = setTimeout(() => setIsLoading(false), 2000);
        }
      }
    };

    getData(dataUrl);

    const cleanUp = () => {
      isMounded = false;
      controller.abort();

      if (timerId) {
        clearTimeout(timerId);
      }
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};
