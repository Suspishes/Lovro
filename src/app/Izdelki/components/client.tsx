'use client'

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllIzdelki } from './server';
import ProductCard from './product-card';

export default function IzdelkiList() {
    const { data: izdelki, isLoading, error } = useQuery({
        queryKey: ['izdelki'],
        queryFn: () => getAllIzdelki(),
    });

    if (isLoading) return <p>Nalaganje...</p>;
    if (error instanceof Error) return <p>{error.message}</p>;

    return (
        <div>
            <h1>Seznam izdelkov</h1>
            {izdelki && izdelki.length > 0 ? (
                <div>
                    {izdelki.map((izdelek: { IzdelkiID: number; Ime: string; Opis: string; Cena: number; Proizvajalec: string }) => (
                        <ProductCard key={izdelek.IzdelkiID} izdelek={izdelek} />
                    ))}
                </div>
            ) : (
                <p>Ni izdelkov za prikaz.</p>
            )}
        </div>
    );
}