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
  Box,
  useMediaQuery
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

export default function Reference() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const projects = [
    { 
      title: 'Lekarna novak', 
      description: 'Polaganje laminata',
      image: '/lekarnanovak.jpg?height=300&width=400'
    },
    { 
      title: 'Penthouse v Novem mestu', 
      description: 'Polaganje v stilu ribje kosti',
      image: '/stanovanje.jpg?height=300&width=400'
    },
    { 
      title: 'Hiša v tujini', 
      description: 'Polaganje eksotičnega lesa v hiši',
      image: '/stanovanje2.jpg?height=300&width=400'
    },
    { 
      title: 'Prenova teras', 
      description: 'Prenova teras v vrtcu',
      image: '/terase.jpg?height=300&width=400'
    },
  ];

  const clients = [
    "Okrožno sodišče Novo mesto",
    "Okrožno državno tožilstvo Novo mesto",
    "Okrožno državno tožilstvo v Ljubljani",
    "Okrajno sodišče v Grosupljem",
    "Okrajno sodišče v Kočevju",
    "Okrožno sodišče v Kranju",
    "Dolenjska projektiva Novo mesto",
    "CGP Novo mesto",
    "Ministrstvo za obrambo – Uprava za obrambo Novo mesto",
    "Terme Čatež",
    "Mega d.o.o. Kranj",
    "Lekarna Novak, Novo mesto",
    "Vrtec pedenjped Novo Mesto",
    "Mikrografija d.o.o. Novo Mesto",
    "AS invest d.o.o."
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
                backgroundImage: 'url("/rena.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.45)',
              },
            }}
          >
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Naše reference
              </Typography>
              <Typography variant="h5" paragraph>
                Odkrijte naše uspešne projekte in zadovoljne stranke
              </Typography>
            </Box>
          </Box>

          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Izbrani projekti
            </Typography>
            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid item key={index} xs={12} sm={6}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box
                      component="img"
                      src={project.image}
                      alt={project.title}
                      sx={{
                        width: '100%',
                        height: 256,
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Box sx={{ bgcolor: 'grey.200', py: 8 }}>
            <Container maxWidth="lg">
              <Typography variant="h3" component="h2" align="center" gutterBottom>
                Naše cenjene stranke
              </Typography>
              <Grid container spacing={3}>
                {clients.map((client, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', border: '2px solid #6CA748' }}>
                      <CardContent>
                        <Typography variant="body1" align="center">
                          {client}
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
              Želite postati naša naslednja stranka?
            </Typography>
            <Typography variant="h5" paragraph>
              Kontaktirajte nas za brezplačen ogled ponudbe in svetovanje
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
                      <Facebook sx={{ mr: 1}} /> Facebook
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

