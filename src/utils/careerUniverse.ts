import jobsData from "@/data/jobs.json";
import type { Job } from "@/types";

export const careerSectors: Record<
  string,
  { name: string; color: string; center: [number, number, number] }
> = {
  ai: { name: "01 / AI LABORATORIES", color: "#67e5df", center: [-6, 0, -5] },
  web3: { name: "02 / WEB3 VAULTS", color: "#bfa0ff", center: [6, 0, -5] },
  frontend: {
    name: "03 / EXPERIENCE STUDIOS",
    color: "#efbd6a",
    center: [-6, 0, 5],
  },
  backend: { name: "04 / COMPUTE DOCKS", color: "#91c2fa", center: [6, 0, 5] },
};

// The full dataset defines stable addresses, so filtering never relocates a role.
export function stationPosition(
  job: Pick<Job, "id" | "category">,
): [number, number, number] {
  const siblings = jobsData.filter((item) => item.category === job.category);
  const index = Math.max(
    0,
    siblings.findIndex((item) => item.id === job.id),
  );
  const center = careerSectors[job.category].center;
  const angle = (index / siblings.length) * Math.PI * 2 - Math.PI / 2;
  return [
    center[0] + Math.cos(angle) * 2.95,
    0,
    center[2] + Math.sin(angle) * 2.95,
  ];
}
