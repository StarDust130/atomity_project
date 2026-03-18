import { NextResponse } from "next/server";

export async function GET() {
  const data = [
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

  // 600ms artificial delay to trigger loading states
  await new Promise((resolve) => setTimeout(resolve, 600));

  return NextResponse.json(data);
}
