import { cookies } from "next/headers";

export async function getShareTokenFromCookie(): Promise<string | undefined> {
  const c = await cookies();
  return c.get("cv_share_token")?.value;
}
