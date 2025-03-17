'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Chip
} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

export default function IzdelekDetailPage({ izdelek }: { izdelek: any }) {
  // Če izdelek ne obstaja, prikažite sporočilo
  if (!izdelek) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper sx={{ bgcolor: 'error.light', p: 4, mb: 4 }}>
            <Typography variant="h6" color="error.main">
              Izdelek ni najden.
            </Typography>
          </Paper>
          <Link href="/Izdelki" passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowLeft />}
              sx={{ color: 'common.white' }}
            >
              Nazaj na seznam izdelkov
            </Button>
          </Link>
        </Container>
      </ThemeProvider>
    )
  }

  // Format price with 2 decimal places
  const formattedPrice = izdelek.Cena ? izdelek.Cena.toFixed(2).replace(".", ",") : "0,00"

  // Image URL (use a placeholder if not available)
  const imageUrl = izdelek.Slika || "/168.jpg/?height=600&width=600"

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Link href="/Izdelki" passHref>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowLeft />}
            sx={{ color: 'common.white', mb: 4 }}
          >
            Nazaj na seznam izdelkov
          </Button>
        </Link>

        <Paper sx={{ bgcolor: 'common.white', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
          <Grid container>
            {/* Product Image */}
            <Grid item xs={12} md={6} sx={{ bgcolor: 'grey.100', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
                <Image
                  src={imageUrl || "/168.jpg"}
                  alt={izdelek.Ime}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Box>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={6} sx={{ p: 4 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                {izdelek.Ime}
              </Typography>
              <Chip
                label={izdelek.Proizvajalec}
                variant="outlined"
                sx={{ bgcolor: 'primary.main', color: 'common.white', mb: 4 }}
              />

              <Paper sx={{ bgcolor: 'grey.100', p: 3, mb: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  {izdelek.Opis}
                </Typography>
              </Paper>

              <Box sx={{ mt: 'auto' }}>
                <Grid container spacing={4} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      Cena
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {formattedPrice} €
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      Proizvajalec
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
                      {izdelek.Proizvajalec}
                    </Typography>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCart />}
                  sx={{ color: 'common.white', py: 2, fontSize: '1.25rem' }}
                >
                  Dodaj v košarico
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}