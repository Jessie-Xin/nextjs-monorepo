import { cache } from "react";
import { getShareTokenFromCookie } from "@/lib/share-token-cookie";

import {
  prisma,
  type ExperienceType,
  type ExportFormat,
  type ProjectStatus,
  type ThemeMode,
} from "@/lib/db";

const DEFAULT_ACCENT = "#3D8A5A";
const HEX_COLOR = /^#[0-9a-f]{3,8}$/i;

export type Project = {
  id: string;
  name: string;
  description: string;
  role: string;
  period: string;
  status: ProjectStatus;
  accentColor: string;
  tags: string[];
};

export type SkillCategory = {
  id: string;
  name: string;
  color: string;
  skills: string[];
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  type: ExperienceType;
  period: string;
  description: string;
};

export type Milestone = {
  id: string;
  title: string;
  description: string;
  date: string;
  color: string;
  projectName: string | null;
};

export type Profile = {
  name: string;
  jobTitle: string;
  subtitle: string | null;
  email: string;
  phone: string | null;
  city: string | null;
  github: string | null;
  githubUrl: string | null;
  bio: string | null;
  avatarUrl: string | null;
};

export type PortfolioSettings = {
  accentColor: string;
  themeMode: ThemeMode;
  defaultExportFormat: ExportFormat;
  publicShareEnabled: boolean;
};

export type PortfolioStat = {
  label: string;
  value: string | number;
};

export type Portfolio = {
  profile: Profile;
  settings: PortfolioSettings;
  projects: Project[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
  milestones: Milestone[];
  stats: PortfolioStat[];
};

export type PublicPortfolioPayload =
  | {
      state: "ready";
      publicShareEnabled: true;
      portfolio: Portfolio;
    }
  | {
      state: "ready";
      publicShareEnabled: false;
      portfolio: Portfolio;
      viaToken: true;
    }
  | {
      state: "disabled" | "missing-profile" | "token-required";
      publicShareEnabled: boolean;
      portfolio: null;
    }
  | {
      state: "database-unavailable";
      publicShareEnabled: false;
      portfolio: null;
      message: string;
    };

export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export const siteNav = [
  {
    href: "/",
    label: "首頁",
    description: "個人資料與快速入口",
  },
  {
    href: "/projects",
    label: "專案",
    description: "代表項目、角色、標籤與狀態",
  },
  {
    href: "/skills",
    label: "技能",
    description: "技能分類與標籤",
  },
  {
    href: "/experience",
    label: "經歷",
    description: "工作、教育與認證",
  },
  {
    href: "/timeline",
    label: "時間線",
    description: "項目里程碑",
  },
] satisfies NavItem[];

export const getPublicPortfolio = cache(
  async (shareToken?: string): Promise<PublicPortfolioPayload> => {
    const cookieToken = !shareToken ? await getShareTokenFromCookie() : undefined;
    const effectiveToken = shareToken ?? cookieToken;
    try {
      return await readPublicPortfolio(effectiveToken);
    } catch (error) {
      if (isDatabaseUnavailableError(error)) {
        return {
          state: "database-unavailable",
          publicShareEnabled: false,
          portfolio: null,
          message: "CMS 資料庫暫時無法連線。",
        };
      }

      throw error;
    }
  }
);

async function readPublicPortfolio(
  shareToken?: string
): Promise<PublicPortfolioPayload> {
  const [profile, setting] = await Promise.all([
    prisma.profile.findFirst({ orderBy: { createdAt: "asc" } }),
    prisma.setting.findUnique({ where: { id: "default" } }),
  ]);

  const publicShareEnabled = setting?.publicShareEnabled ?? false;
  let viaToken = false;

  if (!publicShareEnabled) {
    if (!shareToken) {
      return {
        state: "token-required",
        publicShareEnabled,
        portfolio: null,
      };
    }

    const tokenRecord = await prisma.shareToken.findUnique({
      where: { token: shareToken },
    });
    const now = new Date();
    if (
      !tokenRecord ||
      !tokenRecord.isActive ||
      now > tokenRecord.expiresAt
    ) {
      return {
        state: "token-required",
        publicShareEnabled,
        portfolio: null,
      };
    }
    viaToken = true;
  }

  if (!profile) {
    return {
      state: "missing-profile",
      publicShareEnabled,
      portfolio: null,
    };
  }

  const [dbProjects, dbMilestones, dbExperiences, dbSkillCategories] =
    await Promise.all([
      prisma.project.findMany({ orderBy: { startDate: "desc" } }),
      prisma.milestone.findMany({
        orderBy: { occurredAt: "desc" },
        include: {
          project: {
            select: {
              name: true,
              accentColor: true,
            },
          },
        },
      }),
      prisma.experience.findMany({ orderBy: { startDate: "desc" } }),
      prisma.skillCategory.findMany({
        orderBy: { order: "asc" },
        include: {
          skills: {
            orderBy: { order: "asc" },
          },
        },
      }),
    ]);

  const accentColor = colorOrFallback(setting?.accentColor, DEFAULT_ACCENT);
  const projects = dbProjects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    role: project.role,
    period: formatDateRange(project.startDate, project.endDate),
    status: project.status,
    accentColor: colorOrFallback(project.accentColor, accentColor),
    tags: project.tags,
  }));

  const skillCategories = dbSkillCategories.map((category) => ({
    id: category.id,
    name: category.name,
    color: colorOrFallback(category.color, accentColor),
    skills: category.skills.map((skill) => skill.name),
  }));

  const experiences = dbExperiences.map((experience) => ({
    id: experience.id,
    title: experience.title,
    organization: experience.organization,
    type: experience.type,
    period: formatDateRange(experience.startDate, experience.endDate),
    description: experience.description,
  }));

  const milestones = dbMilestones.map((milestone, index) => {
    const fallbackColor = projects[index]?.accentColor ?? accentColor;

    return {
      id: milestone.id,
      title: milestone.title,
      description: milestone.description,
      date: formatMonth(milestone.occurredAt),
      color: colorOrFallback(milestone.project?.accentColor, fallbackColor),
      projectName: milestone.project?.name ?? null,
    };
  });

  const portfolio: Portfolio = {
    profile: {
      name: profile.name,
      jobTitle: profile.jobTitle,
      subtitle: profile.subtitle,
      email: profile.email,
      phone: profile.phone,
      city: profile.city,
      github: profile.github,
      githubUrl: toExternalUrl(profile.github),
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
    },
    settings: {
      accentColor,
      themeMode: setting?.themeMode ?? "LIGHT",
      defaultExportFormat: setting?.defaultExportFormat ?? "PDF",
      publicShareEnabled,
    },
    projects,
    skillCategories,
    experiences,
    milestones,
    stats: [
      { label: "城市", value: profile.city ?? "-" },
      { label: "專案", value: projects.length },
      {
        label: "進行中",
        value: projects.filter((project) => project.status === "ACTIVE").length,
      },
      {
        label: "技能",
        value: skillCategories.reduce(
          (total, category) => total + category.skills.length,
          0
        ),
      },
    ],
  };

  return {
    state: "ready",
    publicShareEnabled,
    portfolio,
    ...(viaToken ? { viaToken: true } : {}),
  } as PublicPortfolioPayload;
}

export function toExternalUrl(value?: string | null) {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

function colorOrFallback(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && HEX_COLOR.test(trimmed) ? trimmed : fallback;
}

function formatDateRange(startDate: Date, endDate: Date | null) {
  return `${formatMonth(startDate)} - ${endDate ? formatMonth(endDate) : "至今"}`;
}

function formatMonth(date: Date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function isDatabaseUnavailableError(error: unknown) {
  if (!(error instanceof Error)) return false;

  return (
    error.name === "PrismaClientInitializationError" ||
    error.message.includes("Can't reach database server") ||
    error.message.includes("ECONNREFUSED")
  );
}
