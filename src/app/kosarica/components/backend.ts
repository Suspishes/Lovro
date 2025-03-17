import { create, type StateCreator } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";

export type Izdelek = {
    IzdelkiID: number;
    Ime: string;
    Cena: number;
    Kategorija: string;
    Slika: string;
    Opis: string;
    Kolicina: number;
};

interface KosaricaState {
    kosarica: Izdelek[];
    dodajIzdelek: (izdelek: Izdelek) => void;
    odstraniIzdelek: (izdelek: Izdelek) => void;
    povecajKolicino: (izdelekID: number) => void;
    zmanjsajKolicino: (izdelekID: number) => void;
};

const initialState = {
    kosarica: [],
};

const Kosarica: StateCreator<KosaricaState> = (set) => ({
    kosarica: [],
    dodajIzdelek: (izdelek: Izdelek) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelek.IzdelkiID);
        if (izdelekIndex === -1) {
            draft.kosarica.push({ ...izdelek, Kolicina: 1 });
        } else {
            if (izdelekIndex !== -1) {
                if (draft.kosarica[izdelekIndex]) {
                    draft.kosarica[izdelekIndex].Kolicina += 1;
                }
            }
        }
    })),
    odstraniIzdelek: (izdelek: Izdelek) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelek.IzdelkiID);
        if (izdelekIndex !== -1) {
            draft.kosarica.splice(izdelekIndex, 1);
        }
    })),
    povecajKolicino: (izdelekID: number) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelekID);
        if (izdelekIndex !== -1 && draft.kosarica[izdelekIndex]) {
            draft.kosarica[izdelekIndex].Kolicina += 1;
        }
    })),
    zmanjsajKolicino: (izdelekID: number) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelekID);
        if (izdelekIndex !== -1 && draft.kosarica[izdelekIndex] && draft.kosarica[izdelekIndex].Kolicina > 1) {
            draft.kosarica[izdelekIndex].Kolicina -= 1;
        }
    })),
});

export const useKosaricaStore = create<KosaricaState>()(
    persist(Kosarica, {
        name: "kosarica-store",
        storage: createJSONStorage(() => localStorage),
    })
);