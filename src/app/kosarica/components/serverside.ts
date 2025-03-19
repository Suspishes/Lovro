"use server "
import { db } from "~/server/db";
import type { Narocila, Stranka, Izdelki } from "@prisma/client";

export async function saveOrderAndCustomer(
    stranka: Stranka,
    order: Narocila,
    izdelki: Izdelki[]
) {
    try {
        // Fixed typo from 'costumer' to 'customer'
        const customer = await db.stranka.upsert({
            where: { Email: stranka.Email ?? "" },
            update: {
                Ime: stranka.Ime,
                Priimek: stranka.Priimek,
                Telefon: stranka.Telefon,
                Naslov: stranka.Naslov,
            },
            create: {
                Ime: stranka.Ime,
                Priimek: stranka.Priimek,
                Telefon: stranka.Telefon,
                Naslov: stranka.Naslov,
                Email: stranka.Email ?? "",
            },
        });

        // Create order with connected products
        const newOrder = await db.narocila.create({ // Renamed variable from 'order' to avoid conflict
            data: {
                StrankaID: customer.StrankaID,
                Datum: order.Datum,
                Status: order.Status,
                Cena: order.Cena, // Added missing required field
                Izdelki: {
                    connect: izdelki.map(izdelek => ({ // Fixed variable name casing
                        IzdelkiID: izdelek.IzdelkiID
                    }))
                }
            },
            include: {
                Izdelki: true
            }
        });

        // Update product quantities
        for (const izdelek of izdelki) {
            await db.izdelki.update({
                where: { IzdelkiID: izdelek.IzdelkiID },
                data: {
                    Kolicina: {
                        decrement: izdelek.Kolicina
                    }
                }
            });
        }

        return newOrder;

    } catch (error) {
        console.error('Napaka pri shranjevanju:', error);
        throw new Error('Napaka pri obdelavi naročila');
    }
}