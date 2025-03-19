'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getAllIzdelki } from './server'
import ProductCard from './product-card'
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Drawer,
  Toolbar,
  AppBar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery
} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Menu as MenuIcon, Close as CloseIcon, Phone, Email, Facebook, LocationOn, ShoppingCart } from '@mui/icons-material';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
      <AppBar position="relative" sx={{ bgcolor: '#1f2937', boxShadow: 2, py: 2 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, mx: -22, display: 'flex', justifyContent: 'flex-start' }}>
              <Link href="/">
                <Box component="a" sx={{ display: 'inline-block' }}>
                  <img src="/C1_LOGOTIP RAVBAR_vodoraven_ no 01.png" alt="Ravbar Parketarstvo Logo" style={{ height: 64, width: 'auto' }} />
                </Box>
              </Link>
            </Box>
            {isMobile ? (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            ) : (
              <Box component="nav" sx={{ display: 'flex', mx: -22, justifyContent: 'flex-end' }}>
                {['O NAS', 'STORITVE', 'IZDELKI', 'REFERENCE', 'NOVICE', 'KONTAKT'].map((text, index) => (
                  <Button
                    key={text}
                    component={Link}
                    href={text === 'IZDELKI' ? '/Izdelki' : `/${text.toLowerCase().replace(' ', '')}`}
                    sx={{
                      color: 'white',
                      mx: 1,
                      px: 2,
                      py: 1,
                      borderRadius: '4px',
                      fontWeight: 'normal',
                      border: '2px solid transparent',
                      transition: 'all 0.3s',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'transparent',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={isMobile && isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <List>
          {['O NAS', 'STORITVE', 'IZDELKI', 'REFERENCE', 'NOVICE', 'KONTAKT'].map((text) => (
            <ListItem
              key={text}
              component={Link}
              href={text === 'IZDELKI' ? '/Izdelki' : `/${text.toLowerCase().replace(' ', '')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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
                marginLeft: 2,
              }}
            >
              Počisti
            </Button>
            <Button
              variant="contained"
              href="/kosarica"
              startIcon={<ShoppingCart />}
              sx={{
                bgcolor: 'primary.main',
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                marginLeft: 2,
              }}
            >
              Košarica
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

        <Box component="footer" sx={{ bgcolor: '#1f2937', color: 'common.white', py: 6 }}>
          <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Parketarstvo Ravbar
                </Typography>
                <Typography variant="body2">
                  K Roku 139
                  <br />
                  8000, Novo Mesto
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/C1_LOGOTIP RAVBAR_vodoraven_ no 01.png" alt="Ravbar Parketarstvo Logo" style={{ height: 80 }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" align="right">
                  <Link href="tel:041726602" color="inherit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Phone sx={{ mr: 1 }} /> 041 726 602
                  </Link>
                </Typography>
                <Typography variant="body2" align="right">
                  <Link href="mailto:info@parket-ravbar.com" color="inherit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Email sx={{ mr: 1 }} /> info@parket-ravbar.com
                  </Link>
                </Typography>
                <Typography variant="body2" align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Link href="https://www.facebook.com/parketarstvoravbar" target="_blank" rel="noopener noreferrer" color="inherit">
                      <Facebook sx={{ mr: 1 }} /> Facebook
                    </Link>
                  </Box>
                </Typography>
                <Typography variant="body2" align="right">
                  <Link href="#" color="inherit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <LocationOn sx={{ mr: 1 }} /> Prikaži zemljevid
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6">
                LES JE NARAVEN, PUSTIMO DA TAK TUDI OSTANE
              </Typography>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                &copy; {new Date().getFullYear()} parket-ravbar.com | <Link href="/piskotki" color="inherit">Piškotki</Link>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lovro Ravbar
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}