import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { tags } = await req.json();
  if (!Array.isArray(tags)) {
    return NextResponse.json({ error: 'tags must be an array' }, { status: 400 });
  }

  await prisma.savedRecipe.updateMany({
    where: { id: params.id, userId: session.user.id },
    data: { tags: JSON.stringify(tags) },
  });

  return NextResponse.json({ success: true });
}
