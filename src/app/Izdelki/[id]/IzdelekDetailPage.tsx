'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  useMediaQuery,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Izdelek, useKosaricaStore } from '~/app/kosarica/components/backend'
import { useState } from 'react'
import { Email, Facebook, LocationOn, Phone, Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'

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

export default function IzdelekDetailPage({ izdelek }: { izdelek: Izdelek }) {
  const dodajIzdelek = useKosaricaStore((state) => state.dodajIzdelek)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!izdelek) {
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
      </ThemeProvider>
    )
  }

  // Format price with 2 decimal places
  const formattedPrice = izdelek.Cena ? izdelek.Cena.toFixed(2).replace(".", ",") : "0,00"

  const imageUrl = izdelek.Slika || "/168.jpg/?height=600&width=600"

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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
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

          <Link href="/kosarica" passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCart />}
              sx={{ color: 'common.white' }}
            >
              Košarica
            </Button>
          </Link>
        </Box>

        <Paper sx={{ bgcolor: 'common.white', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
          <Grid container>
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
                  onClick={() => dodajIzdelek(izdelek)
                  }
                >
                  Dodaj v košarico
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
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
    </ThemeProvider>
  )
}