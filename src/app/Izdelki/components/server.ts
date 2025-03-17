'use server'

import { db } from "~/server/db";
import type { Izdelek } from "~/app/kosarica/components/backend";

export async function getAllIzdelki() {
    const seznam_izdelkov: Izdelek[] = [];
    try {
        const izdelki = await db.izdelki.findMany();
        for (const izdelek of izdelki) {
            const izdelekObj: Izdelek = {
                IzdelkiID: izdelek.IzdelkiID,
                Ime: izdelek.Ime,
                Cena: izdelek.Cena,
                Proizvajalec: izdelek.Proizvajalec ?? '',
                Opis: izdelek.Opis ?? '',
                Slika: izdelek.Slika,
                KolicinaNaZalogi: izdelek.Kolicina,
                KolicinaVKosarici: 0,
            };
            seznam_izdelkov.push(izdelekObj);
        }

        return seznam_izdelkov;
    } catch (error) {
        console.error('Error fetching izdelki:', error);
        throw error;
    } finally {
        await db.$disconnect();
    }
}


