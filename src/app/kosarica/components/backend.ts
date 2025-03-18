import { create, type StateCreator } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";

export type Izdelek = {
    IzdelkiID: number;
    Ime: string;
    Cena: number;
    Proizvajalec: string;
    Slika: string;
    Opis: string;
    KolicinaNaZalogi: number;
    KolicinaVKosarici: number;

};

interface KosaricaState {
    kosarica: Izdelek[];
    dodajIzdelek: (izdelek: Izdelek) => void;
    odstraniIzdelek: (izdelek: number) => void;
    povecajKolicino: (izdelekID: number) => void;
    zmanjsajKolicino: (izdelekID: number) => void;
    izprazniKosarico: () => void;
};

const initialState = {
    kosarica: [],
};

const Kosarica: StateCreator<KosaricaState> = (set) => ({
    ...initialState,
    dodajIzdelek: (izdelek: Izdelek) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelek.IzdelkiID);
        if (izdelekIndex == -1) {
            draft.kosarica.push({ ...izdelek, KolicinaVKosarici: 1 });
        } else {
            if (izdelekIndex !== -1) {
                if (draft.kosarica[izdelekIndex]) {
                    draft.kosarica[izdelekIndex].KolicinaVKosarici += 1;
                }
            }
        }
    })),
    odstraniIzdelek: (izdelek: number) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelek);
        if (izdelekIndex !== -1) {
            draft.kosarica.splice(izdelekIndex, 1);
        }
    })),
    povecajKolicino: (izdelekID: number) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelekID);
        if (izdelekIndex !== -1 && draft.kosarica[izdelekIndex]) {
            draft.kosarica[izdelekIndex].KolicinaVKosarici += 1;
        }
    })),
    zmanjsajKolicino: (izdelekID: number) => set((state: KosaricaState) => produce(state, (draft: KosaricaState) => {
        const izdelekIndex = draft.kosarica.findIndex((i: Izdelek) => i.IzdelkiID === izdelekID);
        if (izdelekIndex !== -1 && draft.kosarica[izdelekIndex] && draft.kosarica[izdelekIndex].KolicinaVKosarici > 1) {
            draft.kosarica[izdelekIndex].KolicinaVKosarici -= 1;
        }
    })),
    izprazniKosarico: () => set(() => initialState),
});

export const useKosaricaStore = create<KosaricaState>()(
    persist(Kosarica, {
        name: "kosarica-store",
        storage: createJSONStorage(() => localStorage),
    })
);


