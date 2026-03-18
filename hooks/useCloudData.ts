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
  children?: CloudMetric[]; // The nested drill-down data
}

const fetcher = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate latency

  // Generating deterministic hierarchical data
  return ["A", "B", "C", "D"].map((letter, i) => {
    const multiplier = 4 - i;
    const baseTotal = 1500 * multiplier;

    return {
      id: `cluster-${letter}`,
      name: `Cluster ${letter}`,
      cpu: 500 * multiplier,
      ram: 300 * multiplier,
      storage: 50 * multiplier,
      network: 40 * multiplier,
      gpu: i < 2 ? 400 * multiplier : 0,
      efficiency: 10 + i * 8,
      total: baseTotal,
      // Nested namespace data for the drill-down
      children: [1, 2, 3].map((num) => ({
        id: `ns-${letter}-${num}`,
        name: `Namespace ${letter}-${num}`,
        cpu: (500 * multiplier) / 3,
        ram: (300 * multiplier) / 3,
        storage: (50 * multiplier) / 3,
        network: (40 * multiplier) / 3,
        gpu: i < 2 ? (400 * multiplier) / 3 : 0,
        efficiency: 10 + i * 8 + num,
        total: baseTotal / 3,
      })),
    };
  });
};

export function useCloudData() {
  const { data, error, isLoading } = useSWR<CloudMetric[]>(
    "/api/hierarchy",
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return { data, isLoading, isError: error };
}
