import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const id = parseInt(req.query.id as any);
    await prisma.note.delete({ where: { id } });
    res.status(204).end();
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
