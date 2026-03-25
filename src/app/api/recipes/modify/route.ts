import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { Recipe } from '@/types/recipes';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} — ${err}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

function parseJsonFromResponse(text: string): any {
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  return JSON.parse(cleaned);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { recipe: Recipe; modificationRequest: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { recipe, modificationRequest } = body;

  if (!modificationRequest?.trim()) {
    return NextResponse.json({ error: 'Modification request is required' }, { status: 400 });
  }

  const prompt = `You are an expert executive chef. Modify the following recipe based on the chef's request.

CURRENT RECIPE:
${JSON.stringify(recipe, null, 2)}

MODIFICATION REQUEST: ${modificationRequest}

Return ONLY a valid JSON object with the same structure as the input recipe, with the requested changes applied. No markdown, no explanation — just the JSON object.`;

  try {
    const raw = await callGemini(prompt);
    const modified = parseJsonFromResponse(raw);
    return NextResponse.json({ recipe: { ...recipe, ...modified } });
  } catch (err) {
    console.error('[MenuSparks] Recipe modify error:', err);
    return NextResponse.json({ error: 'Failed to modify recipe' }, { status: 500 });
  }
}
