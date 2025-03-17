'use client'

import Link from 'next/link'
import Image from 'next/image'
import { use, useState } from 'react'
import { ArrowLeft, ShoppingCart, Trash, Plus, Minus } from 'lucide-react'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  IconButton
} from "@mui/material"
import { useKosaricaStore, Izdelek } from './backend'

export default function KosaricaPage() {
  // Pridobitev podatkov iz košarice
  const kosarica = useKosaricaStore((state) => state.kosarica);

  const odstraniIzdelek = useKosaricaStore((state) => state.odstraniIzdelek);
  const povecajKolicino = useKosaricaStore((state) => state.povecajKolicino);
  const zmanjsajKolicino = useKosaricaStore((state) => state.zmanjsajKolicino);

  // Izračun skupne cene
  const skupnaCena = kosarica.reduce((total, izdelek) => total + izdelek.Cena * izdelek.KolicinaVKosarici, 0)

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Link href="/Izdelki" passHref>
        <Button
          variant="contained"
          sx={{ bgcolor: '#6CA748', color: '#fff', '&:hover': { bgcolor: '#5A8E3A' }, mb: 4 }}
          startIcon={<ArrowLeft />}
        >
          Nazaj na seznam izdelkov
        </Button>
      </Link>

      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: '#1f2937' }}>
        Vaša košarica
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {kosarica.map((izdelek) => (
            <Paper key={izdelek.IzdelkiID} sx={{ mb: 3, p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ position: 'relative', width: '100%', height: '150px', bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <Image
                      src={izdelek.Slika || "/168.jpg"}
                      alt={izdelek.Ime}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#1f2937' }}>
                    {izdelek.Ime}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                    Cena: {izdelek.Cena.toFixed(2).replace(".", ",")} €
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton sx={{ color: '#6CA748' }} onClick={() => zmanjsajKolicino(izdelek.IzdelkiID)}>
                      <Minus />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2, fontWeight: 'bold' }}>
                      {izdelek.KolicinaVKosarici}
                    </Typography>
                    <IconButton sx={{ color: '#6CA748' }} onClick={() => povecajKolicino(izdelek.IzdelkiID)}>
                      <Plus />
                    </IconButton>
                  </Box>

                  <IconButton
                    sx={{ color: '#c62828', '&:hover': { bgcolor: '#ffebee' } }}
                    onClick={() => odstraniIzdelek(izdelek.IzdelkiID)}
                  >
                    <Trash />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937' }}>
              Povzetek košarice
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Skupna cena:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                {skupnaCena.toFixed(2).replace(".", ",")} €
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCart />}
              sx={{ bgcolor: '#6CA748', color: '#fff', py: 2, fontSize: '1.25rem', '&:hover': { bgcolor: '#5A8E3A' } }}
            >
              Zaključi nakup
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
