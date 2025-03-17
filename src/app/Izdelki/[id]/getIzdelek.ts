// app/Izdelki/[id]/getIzdelek.ts
import { db } from '~/server/db'

export async function getIzdelek(id: number) {
  const izdelek = await db.izdelki.findUnique({
    where: { IzdelkiID: id },
  })
  return izdelek
}