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
  colors
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon, Phone, Email, Facebook, LocationOn } from '@mui/icons-material';
import { object } from 'zod';

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

export default function Storitve() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const services = [
    {
      title: 'Polaganje parketa',
      description: 'Strokovno polaganje vseh vrst parketa, vključno z masivnim, večslojnim in laminatnim parketom.',
      image: '/polaganje.png'
    },
    {
      title: 'Brušenje parketa',
      description: 'Obnova in osvežitev obstoječega parketa s profesionalnim brušenjem in glajanjem.',
      image: '/brusenje.jpg'
    },
    {
      title: 'Lakiranje parketa',
      description: 'Zaščita in izboljšanje videza parketa z visokokakovostnimi laki in olji.',
      image: '/lakiranje.jpg'
    },
    {
      title: 'Oljenje parketa',
      description: 'Naravna zaščita in nega parketa z uporabo vrhunskih olj za les.',
      image: '/oljenje.jpg'
    },
    {
      title: 'Obnova starega parketa',
      description: 'Celovita obnova in restavracija starejših parketnih površin.',
      image: '/polaganje.jpg'
    },
    {
      title: 'Vzdrževanje parketa',
      description: 'Redni pregledi in vzdrževalna dela za dolgotrajno ohranjanje kakovosti parketa.',
      image: '/vzdrzevanje.png'
    },
  ];

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
              height: '60vh',
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
                backgroundImage: 'url("/slikaena.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.45)',
              },
            }}
          >
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Naše storitve
              </Typography>
              <Typography variant="h5" paragraph>
                Celovite rešitve za vaš parket
              </Typography>
            </Box>
          </Box>

          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Kaj ponujamo?
            </Typography>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      image={service.image}
                      alt={service.title}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '225px',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {service.title}
                      </Typography>
                      <Typography>
                        {service.description}
                      </Typography>
                      <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          href="/kontakt"
                          size='large'
                          sx={{
                            mt: 4,
                            color: 'white',
                          }}
                        >
                          Pošlji povpraševanje
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h2" align="center" gutterBottom>
                Zakaj izbrati nas?
              </Typography>
              <Grid container spacing={4}>
                {[
                  { title: 'Izkušnje in strokovnost', description: 'Z več kot 20-letnimi izkušnjami v parketarstvu zagotavljamo vrhunsko kakovost in strokovno izvedbo vseh storitev.' },
                  { title: 'Sodobna tehnologija', description: 'Uporabljamo najnovejšo opremo in tehnike za učinkovito in kakovostno delo na vašem parketu.' },
                  { title: 'Prilagodljivost', description: 'Naše storitve prilagajamo vašim specifičnim potrebam in željam za optimalne rezultate.' },
                  { title: 'Garancija kakovosti', description: 'Za vse naše storitve nudimo garancijo, kar odraža našo zavezanost h kakovosti in zadovoljstvu strank.' },
                ].map((item, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h3">
                          {item.title}
                        </Typography>
                        <Typography>
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Potrebujete naše storitve?
            </Typography>
            <Typography variant="h5" paragraph>
              Kontaktirajte nas za brezplačen ogled in ponudbo
            </Typography>
            <Button
              href="/kontakt"
              variant="contained"
              size="large"
              sx={{ mt: 2, color: "white" }}
            >
              Kontaktirajte nas
            </Button>
          </Container>
        </main>

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

