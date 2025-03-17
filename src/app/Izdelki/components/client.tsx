'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllIzdelki } from './server'
import ProductCard from './product-card'
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { Izdelek } from '../../kosarica/components/backend';


const theme = createTheme({
  palette: {
    primary: {
      main: '#6CA748',
    },
    secondary: {
      main: '#5A8E3A',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

export default function IzdelkiList() {
  const { data: izdelki, isLoading, error } = useQuery<Izdelek[]>({
    queryKey: ['izdelki'],
    queryFn: () => getAllIzdelki(),
  })

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  if (isLoading) return <Typography>Nalaganje...</Typography>
  if (error instanceof Error) return <Typography>{error.message}</Typography>

  const filteredIzdelki = izdelki?.filter((izdelek: { Ime: string }) =>
    izdelek.Ime.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? []

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <TextField
              label="Išči izdelke"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: '80%' }}
            />
            <Button
              variant="contained"
              onClick={handleClear}
              sx={{
                bgcolor: 'primary.main',
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Počisti
            </Button>
          </Box>
          <Grid container spacing={4}>
            {filteredIzdelki.map((izdelek: { IzdelkiID: number; Ime: string; Opis: string; Cena: number; Proizvajalec: string }) => (
              <Grid item xs={12} sm={6} md={4} key={izdelek.IzdelkiID}>
                <ProductCard izdelek={izdelek} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}