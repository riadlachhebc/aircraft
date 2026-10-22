import { Author } from "@/lib/types";

export const AUTHORS: Record<string, Author> = {
  "marcus-vance": {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Lead Technical Editor & Building Science Researcher",
    bio: "Marcus has spent over 12 years analyzing residential thermodynamics, indoor airflow dynamics, and consumer appliance efficiency. He previously worked as an architectural energy auditor and holds a degree in Mechanical Engineering.",
    experienceYears: 12,
    credentials: "B.S. Mechanical Engineering, BPI Building Analyst Certified",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
  },
  "elena-rostova": {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Indoor Air Quality & Environmental Specialist",
    bio: "Elena specializes in particulate filtration (HEPA), volatile organic compounds (VOCs), and residential ventilation standards. She writes transparent consumer guides breaking down CADR ratings and manufacturer specifications.",
    experienceYears: 9,
    credentials: "M.S. Environmental Health, Certified Indoor Environmentalist (CIE)",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80",
  },
  "david-chen": {
    id: "david-chen",
    name: "David Chen",
    role: "Energy Economics & Appliance Testing Contributor",
    bio: "David evaluates the real-world operational costs of home heating, cooling, and ventilation appliances against US Energy Information Administration (EIA) utility rate structures.",
    experienceYears: 7,
    credentials: "B.A. Economics, Certified Energy Auditor (CEA)",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
  },
};

export const AUTHOR_LIST = Object.values(AUTHORS);
