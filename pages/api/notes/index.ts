import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import * as client from '../../../lib/api/types';
import { makeClientNote, makeServerNewNote } from '../_convertions';

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    const note: client.NewNote = req.body;
    const newNote = await prisma.note.create({ data: makeServerNewNote(note) });
    res.status(200).send(makeClientNote(newNote));
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
