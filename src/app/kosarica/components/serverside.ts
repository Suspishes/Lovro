import { db } from "~/server/db";
import { Narocila, Stranka } from "@prisma/client";
import { Izdelek } from "./backend";

export async function saveOrderAndCustomer(stranka: Stranka, order: Narocila, izdelki: Izdelek[]) {
) {
        try {
            const stranka = await db.stranka.upsert({
                where: { Email: customer.Email ?? "" },
                update: {
                    Ime: customerData.Ime,
                    Priimek: customerData.Priimek,
                    Telefon: customerData.Telefon,
                    Naslov: customerData.Naslov,
                },
                create: {
                    Ime: customerData.Ime,
                    Priimek: customerData.Priimek,
                    Email: customerData.Email ?? "",
                    Telefon: customerData.Telefon,
                    Naslov: customerData.Naslov,
                },
            });

            // Ustvari novo naročilo s povezanimi izdelki
            const order = await db.narocila.create({
                data: {
                    StrankaID: customer.StrankaID,
                    Datum: orderData.Datum,
                    Status: orderData.Status,
                    Izdelki: {
                        connect: orderData.Izdelki.map(izdelek => ({
                            IzdelkiID: izdelek.IzdelkiID
                        }))
                    }
                },
                include: {
                    Izdelki: true
                }
            });

            // Posodobi količine izdelkov v zalogi
            for (const izdelek of orderData.Izdelki) {
                await db.izdelki.update({
                    where: { IzdelkiID: izdelek.IzdelkiID },
                    data: {
                        Kolicina: {
                            decrement: izdelek.Kolicina
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Napaka pri shranjevanju:', error);
            throw new Error('Napaka pri obdelavi naročila');
        }
    }