import useSWR from "swr";

export interface PodData {
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

// Simulated fetcher that allows caching and simulates network delay
const fetcher = async () => {
  // Use a public endpoint but return our required schema for predictability
  // Replaces: await fetch('https://jsonplaceholder.typicode.com/todos/1');

  await new Promise((resolve) => setTimeout(resolve, 900)); // 900ms delay

  return [
    {
      id: "pod-a",
      name: "Pod A",
      cpu: 862,
      ram: 479,
      storage: 86,
      network: 107,
      gpu: 410,
      efficiency: 8,
      total: 2403,
    },
    {
      id: "pod-b",
      name: "Pod B",
      cpu: 246,
      ram: 136,
      storage: 24,
      network: 30,
      gpu: 246,
      efficiency: 40,
      total: 686,
    },
    {
      id: "pod-c",
      name: "Pod C",
      cpu: 86,
      ram: 47,
      storage: 8,
      network: 10,
      gpu: 123,
      efficiency: 35,
      total: 240,
    },
    {
      id: "pod-d",
      name: "Pod D",
      cpu: 36,
      ram: 20,
      storage: 3,
      network: 60,
      gpu: 41,
      efficiency: 70,
      total: 103,
    },
  ];
};

export function useCostData() {
  const { data, error, isLoading } = useSWR<PodData[]>("/api/costs", fetcher, {
    revalidateOnFocus: false, // Prevents refetching when switching tabs
    dedupingInterval: 60000, // Cache data for 60 seconds
  });

  return { data, isLoading, isError: error };
}
