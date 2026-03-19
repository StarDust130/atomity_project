// 🎣 Custom Hook for fetching Cloud Cost Data
// Implements SWR for built-in caching, revalidation, and loading states! 🚀

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
  children?: CloudMetric[]; // 📂 The nested drill-down data
}

// 📡 Fetcher function making the real API request
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch cloud telemetry data ❌");
  }
  return res.json();
};

export function useCloudData() {
  const { data, error, isLoading } = useSWR<CloudMetric[]>(
    "/api/costs", // 🎯 Hitting our Next.js API Route!
    fetcher,
    {
      revalidateOnFocus: false, // Prevents aggressive refetches on tab switching 🛑
    },
  );

  return { data, isLoading, isError: error };
}
