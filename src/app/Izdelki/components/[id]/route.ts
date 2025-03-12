import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const izdelek = await prisma.izdelki.findUnique({
        where: {
            IzdelkiID: Number.parseInt(params.id),
        },
    })

    if (!izdelek) {
        return new Response("Izdelek ni bil najden", { status: 404 })
    }

    return NextResponse.json(izdelek)
}
