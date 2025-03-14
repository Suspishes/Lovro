import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    const izdelki = await prisma.izdelki.findMany()

    return NextResponse.json(izdelki)
}
