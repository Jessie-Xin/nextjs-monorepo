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

try {
  const [
    profile,
    setting,
    projectCount,
    milestoneCount,
    experienceCount,
    skillCategoryCount,
    skillCount,
  ] = await Promise.all([
    prisma.profile.findFirst({
      orderBy: { createdAt: "asc" },
      select: { name: true, jobTitle: true, email: true },
    }),
    prisma.setting.findUnique({
      where: { id: "default" },
      select: { publicShareEnabled: true, accentColor: true },
    }),
    prisma.project.count(),
    prisma.milestone.count(),
    prisma.experience.count(),
    prisma.skillCategory.count(),
    prisma.skill.count(),
  ]);

  console.log(
    JSON.stringify(
      {
        databaseUrl: maskDatabaseUrl(process.env.DATABASE_URL),
        publicShareEnabled: setting?.publicShareEnabled ?? false,
        accentColor: setting?.accentColor ?? null,
        profile,
        counts: {
          projects: projectCount,
          milestones: milestoneCount,
          experiences: experienceCount,
          skillCategories: skillCategoryCount,
          skills: skillCount,
        },
      },
      null,
      2
    )
  );

  if (!profile) {
    console.error("CMS verify failed: Profile is missing.");
    process.exitCode = 1;
  }

  if (!setting?.publicShareEnabled) {
    console.error(
      "CMS verify failed: publicShareEnabled is false or Setting is missing."
    );
    process.exitCode = 1;
  }
} catch (error) {
  console.error("CMS verify failed:");
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

function maskDatabaseUrl(value) {
  try {
    const url = new URL(value);
    if (url.password) url.password = "****";
    return url.toString();
  } catch {
    return "<invalid DATABASE_URL>";
  }
}
