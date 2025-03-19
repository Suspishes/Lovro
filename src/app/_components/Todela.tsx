'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  useMediaQuery,
  Chip
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon, Phone, Email, Facebook, LocationOn } from '@mui/icons-material';

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
});

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="relative" sx={{ bgcolor: '#1f2937', boxShadow: 2, py: 2 }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, mx: -22, display: 'flex', justifyContent: 'flex-start' }}>
                <Link href="/" passHref>
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

        <main>
          <Box
            sx={{
              position: 'relative',
              height: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'common.white',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("/test_slika_1.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.45)',
              },
            }}
          >
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Kakovostno polaganje in obnova parketa
              </Typography>
              <Typography variant="h5" paragraph>
                Z več kot 20 leti izkušenj vam zagotavljamo vrhunske rezultate
              </Typography>
              <Button
                href="/kontakt"
                variant="contained"
                size="large"
                sx={{ mt: 2, color: "white" }}
              >
                Kontaktirajte nas
              </Button>
            </Box>
          </Box>

          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              O nas
            </Typography>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography paragraph>
                  Parketarstvo Ravbar je družinsko podjetje z 29 letnimi izkušnjami v svetu lesenih talnih oblog. Naša strast do lesa in predanost kakovosti sta temelj našega dela, ki ga opravljamo z največjo skrbnostjo in natančnostjo.
                </Typography>
                <Typography paragraph>
                  Specializirani smo za polaganje, obnovo in vzdrževanje vseh vrst parketa. Naš tim izkušenih strokovnjakov združuje tradicionalne tehnike z najnovejšimi tehnologijami, kar zagotavlja vrhunske rezultate pri vsakem projektu, ne glede na njegovo velikost ali zahtevnost.
                </Typography>
                <Box textAlign="center">
                  <Button
                    href="/kontakt"
                    variant="contained"
                    size="large"
                    sx={{ mt: 2, color: "white" }}
                  >
                    Izvedi več
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="/parketar.jpg"
                  alt="Tile Flooring"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </Grid>
            </Grid>
          </Container>

          <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h2" align="center" gutterBottom>
                Naše storitve
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom align="center">
                        Polaganje parketa
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        Zagotavljamo visoko kakovostno polaganje parketa z uporabo najboljših materialov in tehnik.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom align="center">
                        Brušenje parketa
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        Zagotavljamo visoko kakovostno brušenje parketa z uporabo najboljših materialov in tehnik.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom align="center">
                        Lakiranje parketa
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        Zagotavljamo visoko kakovostno lakiranje parketa z uporabo najboljših materialov in tehnik.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom align="center">
                        Oljenje parketa
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        Zagotavljamo visoko kakovostno oljenje parketa z uporabo najboljših materialov in tehnik.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom align="center">
                        Obnova starega parketa
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        Zagotavljamo visoko kakovostno obnovo starega parketa z uporabo najboljših materialov in tehnik.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom align="center">
                        Vzdrževanje parketa
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        Zagotavljamo visoko kakovostno vzdrževanje parketa z uporabo najboljših materialov in tehnik.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Box sx={{ bgcolor: '#1f2937', color: 'primary.contrastText', py: 8 }}>
            <Container sx={{ bgcolor: 'primary.main', textAlign: 'center', px: 4, py: 2, borderRadius: 2 }}>
              <Typography variant="h5" align="center" sx={{ color: 'white' }}>
                Z vrhunskim svetovanjem, prilagodljivostjo željam strank in strokovnostjo pri delu zagotavljamo rezultate, ki presegajo pričakovanja.
              </Typography>
            </Container>
          </Box>

          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Naše Reference
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
              <Chip
                label="Okrožno sodišče Novo mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Okrožno državno tožilstvo Novo mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Okrožno državno tožilstvo v Ljubljani"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Okrajno sodišče v Grosupljem"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Okrajno sodišče v Kočevju"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Okrožno sodišče v Kranju"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Dolenjska projektiva Novo mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="CGP Novo mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Ministrstvo za obrambo – Uprava za obrambo Novo mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Terme Čatež"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Mega d.o.o. Kranj"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Lekarna Novak, Novo mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Vrtec pedenjped Novo Mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="Mikrografija d.o.o. Novo Mesto"
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
              <Chip
                label="AS invest d.o.o."
                sx={{
                  bgcolor: 'white',
                  boxShadow: 1,
                  m: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              />
            </Box>
            <Box sx={{ mt: 4, bgcolor: 'primary.main', color: 'primary.contrastText', p: 3, borderRadius: 2 }}>
              <Typography align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                Poleg tega smo uspešno izvedli projekte v več kot 300 hišah in stanovanjih po Sloveniji in širše.
              </Typography>
            </Box>
          </Container>

          <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h2" align="center" gutterBottom>
                Novice
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="/haro.jpg"
                      alt="Haro Disano"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        Haro Disano
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        V kolikor razmišljate o novi talni oblogi in želite v svoj dom vnesti pridih pristne narave je HARO parket prava izbira za vas.
                      </Typography>
                      <Button component={Link} href="/novice/trendi-2023" variant="contained" color="primary" sx={{ color: 'white' }}>
                        Preberi več
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="/talnaobloga.jpg"
                      alt="Katero talno oblogo izbrati?"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        Katero talno oblogo izbrati?
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Ste v dilemi katero talno oblogo izbrat, ki bi vam služila dolgotrajno? Pravzaprav tu ni nobene dileme – edina prava rešitev je parket!
                      </Typography>
                      <Button component={Link} href="/novice/vzdrzevanje-poleti" variant="contained" color="primary" sx={{ color: 'white' }}>
                        Preberi več
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="/leseneterase.jpg"
                      alt="Lesene terase"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        Lesene terase
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Lesena terasa bo razširila bivalni prostor – omislite si še udobno vrtno garnituro in ustvarite zavidanja vreden kotiček za sprostitev, druženje ali lenarjenje.
                      </Typography>
                      <Button component={Link} href="/novice/projekt-narodni-muzej" variant="contained" color="primary" sx={{ color: 'white' }}>
                        Preberi več
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>


        </main>

        <Box component="footer" sx={{ bgcolor: '#1f2937', color: 'common.white', py: 6 }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 2, my: 2, width: '80%', alignContent: 'center', margin: 'auto', borderRadius: 2 }}>
            <Container>
              <Typography variant="h4" align="center" sx={{ color: 'white' }}>
                Zaupajte nam, da vaš dom oživimo s kakovostjo, ki traja.
              </Typography>
            </Container>
          </Box>
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