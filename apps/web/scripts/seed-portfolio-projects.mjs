import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(scriptDir, "..");
const generatedClientPath = path.join(
  appRoot,
  "src",
  "generated",
  "prisma",
  "index.js"
);

loadEnvFile(path.join(appRoot, ".env"));

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add it to apps/web/.env first.");
  process.exit(1);
}

if (!fs.existsSync(generatedClientPath)) {
  console.error(
    "Prisma client is missing. Run `pnpm --dir apps/web run db:generate` first."
  );
  process.exit(1);
}

const { PrismaClient } = await import(pathToFileURL(generatedClientPath).href);
const prisma = new PrismaClient();

const projects = [
  {
    id: "project-dsscu",
    name: "dsscu",
    description:
      "城市建設與公共服務入口，基於 Umi/React 建置多頁資訊、新聞、招標、地圖與訂閱功能，整合 OpenAPI 服務與多語系內容。",
    role: "前端工程師 / 維護與功能開發",
    startDate: "2023-09-01",
    endDate: null,
    status: "ACTIVE",
    accentColor: "#2563EB",
    tags: [
      "Umi",
      "React 17",
      "TypeScript",
      "OpenAPI",
      "i18n",
      "Mapbox",
      "Sentry",
    ],
  },
  {
    id: "project-nextjs-site",
    name: "nextjs-site",
    description:
      "Next.js 政府網站前台，包含多語系內容、服務目錄、媒體列表、動態頁面、CMS 資料串接與部署容器化設定。",
    role: "Next.js 前端工程師",
    startDate: "2024-06-01",
    endDate: "2026-05-01",
    status: "DONE",
    accentColor: "#0F766E",
    tags: ["Next.js 15", "React 18", "TypeScript", "next-intl", "CMS", "Docker"],
  },
  {
    id: "project-dsfsite",
    name: "dsfsite",
    description:
      "財政服務相關網站，實作稅務、表格下載、招標、多媒體、搜尋與專題內容，並維護 Next.js App Router 與多語系頁面。",
    role: "Next.js 前端工程師",
    startDate: "2024-08-01",
    endDate: "2026-05-01",
    status: "DONE",
    accentColor: "#16A34A",
    tags: ["Next.js 14", "React 18", "TypeScript", "next-intl", "Tailwind CSS", "Sitemap"],
  },
  {
    id: "project-isbn-site",
    name: "isbn-site",
    description:
      "ISBN/ISRC 申請與查詢系統，涵蓋出版者資料、檔案上傳、搜尋、表單驗證、帳戶流程與多語系內容管理。",
    role: "Next.js 前端工程師",
    startDate: "2024-10-01",
    endDate: null,
    status: "ACTIVE",
    accentColor: "#7C3AED",
    tags: ["Next.js 15", "React 19", "TypeScript", "React Hook Form", "Zod", "OpenAPI"],
  },
  {
    id: "project-planocp",
    name: "planocp",
    description:
      "市政/規劃資訊網站，實作首頁、預約、聯絡、FAQ、公告下載、查詢頁與多語系路由，並處理 staging/正式環境配置。",
    role: "Next.js 前端工程師",
    startDate: "2024-11-01",
    endDate: null,
    status: "ACTIVE",
    accentColor: "#DC2626",
    tags: ["Next.js 15", "React 19", "TypeScript", "next-intl", "GSAP", "Iron Session"],
  },
  {
    id: "project-next-start",
    name: "next-start",
    description:
      "Next.js 16 monorepo 啟動模板，沉澱共用 UI、請求層、管理路由、Auth、ESLint/TypeScript/Prettier 設定與 Turborepo 工作流。",
    role: "架構與前端工程師",
    startDate: "2025-05-01",
    endDate: null,
    status: "ACTIVE",
    accentColor: "#0891B2",
    tags: ["Next.js 16", "React 19", "Turborepo", "pnpm", "shadcn/ui", "TypeScript"],
  },
  {
    id: "project-tour-nextjs",
    name: "tour-nextjs",
    description:
      "旅遊業務管理 monorepo，包含前台與 admintools，處理季度資料、導遊、酒店、組織、角色、檔案與第三方服務整合。",
    role: "全端前端 / 後台架構工程師",
    startDate: "2025-05-01",
    endDate: "2026-05-01",
    status: "DONE",
    accentColor: "#CA8A04",
    tags: ["Next.js 15", "React 19", "Turborepo", "Admin UI", "Chart.js", "Zustand"],
  },
  {
    id: "project-next-paddock-pass",
    name: "next-paddock-pass",
    description:
      "Paddock Pass 活動票務流程，實作報名、資料補全、確認、付款、訂單、密碼重設與 CMS/付款/票券服務串接。",
    role: "Next.js 前端工程師",
    startDate: "2025-09-01",
    endDate: "2026-05-01",
    status: "DONE",
    accentColor: "#EA580C",
    tags: ["Next.js 15", "React 19", "Turborepo", "Payment", "Ticketing", "xlsx"],
  },
  {
    id: "project-libpass-renew",
    name: "libpass-renew",
    description:
      "圖書館通行證續期/申請前台，基於 Umi 與政府框架建置登入、回調、申請表單、步驟頁與成功頁。",
    role: "React 前端工程師",
    startDate: "2025-11-01",
    endDate: "2026-04-01",
    status: "DONE",
    accentColor: "#9333EA",
    tags: ["Umi", "React 17", "TypeScript", "Ant Design", "Gov Framework", "OpenAPI"],
  },
];

const milestones = [
  {
    title: "dsscu 可見開發起點",
    description:
      "建立 Umi/React 公共服務前台基礎，包含資訊頁、表單、OpenAPI 服務層與多語系資源。",
    occurredAt: "2023-09-01",
    projectId: "project-dsscu",
  },
  {
    title: "nextjs-site 專案啟動",
    description:
      "以 Next.js 建置政府網站前台，導入 CMS 串接、服務目錄、多媒體與 Docker 部署配置。",
    occurredAt: "2024-06-01",
    projectId: "project-nextjs-site",
  },
  {
    title: "dsfsite 稅務網站功能開發",
    description:
      "完成稅務、表格下載、搜尋、專題與多語系 App Router 頁面基礎。",
    occurredAt: "2024-08-01",
    projectId: "project-dsfsite",
  },
  {
    title: "isbn-site 申請與查詢流程",
    description:
      "建置 ISBN/ISRC 申請、出版者資料、查詢列表、檔案上傳與帳戶流程。",
    occurredAt: "2024-10-01",
    projectId: "project-isbn-site",
  },
  {
    title: "planocp 多語系網站建置",
    description:
      "導入 Next.js 15、next-intl、CMS 服務層與多個公共資訊頁面模組。",
    occurredAt: "2024-11-01",
    projectId: "project-planocp",
  },
  {
    title: "next-start monorepo 模板沉澱",
    description:
      "整理 Turborepo、共用 UI、請求層、管理路由與 Next.js 16 開發規範。",
    occurredAt: "2025-05-01",
    projectId: "project-next-start",
  },
  {
    title: "tour-nextjs 前後台架構",
    description:
      "建立 web 與 admintools 雙應用，支援旅遊季度資料、導遊、酒店、組織與權限管理。",
    occurredAt: "2025-05-01",
    projectId: "project-tour-nextjs",
  },
  {
    title: "next-paddock-pass 票務流程",
    description:
      "完成報名、確認、付款、訂單與票券/CMS 服務整合的活動票務體驗。",
    occurredAt: "2025-09-01",
    projectId: "project-next-paddock-pass",
  },
  {
    title: "libpass-renew 續期申請前台",
    description:
      "完成登入、回調、步驟式申請、成功頁與政府框架樣式整合。",
    occurredAt: "2025-11-01",
    projectId: "project-libpass-renew",
  },
  {
    title: "近期維護與優化集中交付",
    description:
      "對多個 Next.js 專案進行 React/Next 版本、文件上傳、環境配置、圖片尺寸與頁面結構優化。",
    occurredAt: "2026-06-01",
    projectId: "project-isbn-site",
  },
];

const skillCategories = [
  {
    id: "skill-next-react",
    name: "Next.js / React",
    color: "#111827",
    skills: [
      "Next.js 14/15/16",
      "App Router",
      "Server Components",
      "React 17/18/19",
      "Umi 3",
      "Turbopack",
    ],
  },
  {
    id: "skill-typescript-ui",
    name: "TypeScript 與 UI",
    color: "#2563EB",
    skills: [
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Ant Design",
      "Lucide React",
      "Responsive UI",
    ],
  },
  {
    id: "skill-forms-data",
    name: "表單與資料串接",
    color: "#16A34A",
    skills: [
      "React Hook Form",
      "Zod",
      "OpenAPI Client",
      "REST API",
      "檔案上傳",
      "搜尋與分頁",
      "付款/票券流程",
    ],
  },
  {
    id: "skill-i18n-cms",
    name: "多語系與 CMS",
    color: "#7C3AED",
    skills: [
      "next-intl",
      "i18n 路由",
      "CMS 內容頁",
      "動態頁面",
      "服務目錄",
      "新聞/媒體列表",
    ],
  },
  {
    id: "skill-tooling",
    name: "工程化與部署",
    color: "#EA580C",
    skills: [
      "Turborepo",
      "pnpm workspace",
      "ESLint",
      "Prettier",
      "Docker",
      "Sitemap",
      "Sentry sourcemaps",
    ],
  },
  {
    id: "skill-domain",
    name: "業務場景",
    color: "#0F766E",
    skills: [
      "政府網站",
      "公共服務入口",
      "票務報名",
      "圖書館申請",
      "ISBN/ISRC",
      "旅遊業務後台",
      "稅務資訊",
    ],
  },
];

try {
  await prisma.$transaction(async (tx) => {
    await tx.milestone.deleteMany();
    await tx.project.deleteMany();
    await tx.skill.deleteMany();
    await tx.skillCategory.deleteMany();

    await tx.setting.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        accentColor: "#3D8A5A",
        themeMode: "LIGHT",
        defaultExportFormat: "PDF",
        publicShareEnabled: true,
      },
      update: {
        publicShareEnabled: true,
      },
    });

    for (const project of projects) {
      await tx.project.create({
        data: {
          ...project,
          startDate: new Date(project.startDate),
          endDate: project.endDate ? new Date(project.endDate) : null,
        },
      });
    }

    for (const milestone of milestones) {
      await tx.milestone.create({
        data: {
          ...milestone,
          occurredAt: new Date(milestone.occurredAt),
        },
      });
    }

    for (const [categoryIndex, category] of skillCategories.entries()) {
      await tx.skillCategory.create({
        data: {
          id: category.id,
          name: category.name,
          color: category.color,
          order: categoryIndex,
          skills: {
            create: category.skills.map((skill, skillIndex) => ({
              name: skill,
              order: skillIndex,
            })),
          },
        },
      });
    }
  });

  console.log(
    JSON.stringify(
      {
        projects: projects.length,
        milestones: milestones.length,
        skillCategories: skillCategories.length,
        skills: skillCategories.reduce(
          (total, category) => total + category.skills.length,
          0
        ),
      },
      null,
      2
    )
  );
} catch (error) {
  console.error("Portfolio project seed failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    process.env[key] = unquote(value);
  }
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}
