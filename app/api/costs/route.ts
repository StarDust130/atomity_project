import { NextResponse } from "next/server";

// We keep the structure hierarchical so it matches the recursive drill-down design.
export async function GET() {
  // Real-world scenario: You'd fetch this from a database or external Cloud telemetry API.
  // ⏳ Simulating network latency for realistic loading states
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 🚀 Generating deterministic hierarchical data (3 levels: Cluster -> Namespace -> Pod)
  const data = ["A", "B", "C", "D"].map((letter, i) => {
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
      // Nested namespace data for the drill-down 📂
      children: [1, 2, 3].map((num) => ({
        id: `ns-${letter}-${num}`,
        name: `NS ${letter}-${num}`,
        cpu: (500 * multiplier) / 3,
        ram: (300 * multiplier) / 3,
        storage: (50 * multiplier) / 3,
        network: (40 * multiplier) / 3,
        gpu: i < 2 ? (400 * multiplier) / 3 : 0,
        efficiency: 10 + i * 8 + num,
        total: baseTotal / 3,
        // Nested pod data for the 3rd level drill-down 🧊
        children: [1, 2, 3, 4, 5].map((podNum) => ({
          id: `pod-${letter}-${num}-${podNum}`,
          name: `Pod ${podNum}`,
          cpu: (500 * multiplier) / 15,
          ram: (300 * multiplier) / 15,
          storage: (50 * multiplier) / 15,
          network: (40 * multiplier) / 15,
          gpu: i < 2 ? (400 * multiplier) / 15 : 0,
          efficiency: 10 + i * 8 + num + podNum,
          total: baseTotal / 15,
        })),
      })),
    };
  });

  return NextResponse.json(data);
}
