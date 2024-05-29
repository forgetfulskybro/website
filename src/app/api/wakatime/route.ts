import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { wakaData } from "./wakatimeData";

export const runtime = "edge";

export async function GET() {
  const data = await wakaData();
  return data
    ? NextResponse.json(data)
    : new Response(undefined, { status: 500 });
}

export const dynamic = "force-dynamic";
