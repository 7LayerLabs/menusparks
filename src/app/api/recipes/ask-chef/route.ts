import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { AskChefBody } from '@/types/recipes';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} — ${err}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: AskChefBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { question, recipe, history } = body;

  if (!question?.trim()) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 });
  }

  const conversationHistory = (history ?? [])
    .slice(1) // skip opening greeting
    .map(m => `${m.role === 'user' ? 'User' : 'Chef'}: ${m.text}`)
    .join('\n');

  const prompt = `You are an expert executive chef and culinary instructor embedded inside a restaurant recipe app. You are helping a restaurant operator understand and execute the following recipe.

CURRENT RECIPE:
Name: ${recipe.recipeName}
Ingredients: ${recipe.ingredients?.join(', ') ?? ''}
Instructions: ${recipe.instructions?.join(' | ') ?? ''}
Chef Notes: ${recipe.chefNotes ?? 'none'}

CONVERSATION SO FAR:
${conversationHistory || 'This is the first question.'}

USER'S QUESTION: ${question}

RULES:
- Only answer culinary questions: techniques, ingredients, substitutions, scaling, timing, equipment, food safety, plating
- If the question is not related to cooking or this recipe, politely decline and redirect to culinary topics
- Keep answers practical and kitchen-focused — no fluff
- For technique explanations, be clear and simple (the user may not have professional training)
- For substitutions, suggest 1-2 specific alternatives that work for a restaurant setting
- Be conversational, not robotic. You're a chef helping a colleague, not writing a textbook

Respond as the chef directly — no labels, no "Chef:" prefix, just the answer.`;

  try {
    const answer = await callGemini(prompt);
    return NextResponse.json({ answer });
  } catch (err) {
    console.error('[MenuSparks] Ask Chef error:', err);
    return NextResponse.json(
      { error: 'Failed to get response from chef' },
      { status: 500 }
    );
  }
}
