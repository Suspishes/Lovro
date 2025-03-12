'use server'

import { db } from "~/server/db";

export async function getAllIzdelki() {
    try {
        const izdelki = await db.izdelki.findMany();
        return JSON.parse(JSON.stringify(izdelki));
    } catch (error) {
        console.error('Error fetching izdelki:', error);
        throw error;
    } finally {
        await db.$disconnect();
    }
}

getAllIzdelki().then(izdelki => console.log(izdelki));
