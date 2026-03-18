import useSWR from "swr";

export interface CloudMetric {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number;
  total: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API fetch failed");
  return res.json();
};

export function useCloudData() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users?_limit=4",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  );

  // Transform public dummy data into our highly specific cloud shape
  const transformedData: CloudMetric[] | undefined = data?.map(
    (user: any, index: number) => {
      const multiplier = 4 - index;
      return {
        id: user.id.toString(),
        name: `Cluster ${String.fromCharCode(65 + index)}`, // Cluster A, B, C, D
        cpu: 500 * multiplier + user.id * 15,
        ram: 300 * multiplier + user.id * 10,
        storage: 50 * multiplier,
        network: 40 * multiplier,
        gpu: index < 2 ? 400 * multiplier : 0,
        efficiency: 10 + index * 8,
        total: 1500 * multiplier + user.id * 50,
      };
    },
  );

  return { data: transformedData, isLoading, isError: error };
}
