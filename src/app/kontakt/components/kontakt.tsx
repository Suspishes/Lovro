'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Phone,
  Email,
  Facebook,
  LocationOn,
  ExpandMore,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#6CA748' },
    secondary: { main: '#5A8E3A' },
    background: { default: '#f5f5f5' },
  },
});

const faqItems = [
  {
    question: 'Kakšna je garancija na vaše storitve?',
    answer:
      'Na vse naše storitve nudimo 2-letno garancijo. Za specifične izdelke lahko velja daljša garancijska doba proizvajalca.',
  },
  {
    question: 'Koliko časa traja polaganje parketa?',
    answer:
      'Čas polaganja je odvisen od velikosti prostora in vrste parketa. V povprečju lahko za stanovanje velikosti 60-80 m² računate na 1-2 dni dela.',
  },
  {
    question: 'Ali izvajate brezplačne oglede?',
    answer:
      'Da, za vse večje projekte izvajamo brezplačne oglede na lokaciji. Tako lahko natančno ocenimo obseg dela in pripravimo točno ponudbo.',
  },
  {
    question: 'Katere vrste lesa priporočate za parket?',
    answer:
      'Najpogosteje priporočamo hrast, bukev in jesen zaradi njihove trpežnosti in estetike. Izbira je odvisna od vaših preferenc in namembnosti prostora.',
  },
];

export default function Kontakt() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

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
                  {['O NAS', 'STORITVE', 'REFERENCE', 'NOVICE', 'KONTAKT'].map((text, index) => (
                    <Button
                      key={text}
                      component={Link}
                      href={`/${text.toLowerCase().replace(' ', '')}`}
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
            {['O NAS', 'STORITVE', 'REFERENCE', 'NOVICE', 'KONTAKT'].map((text) => (
              <ListItem
                key={text}
                component={Link}
                href={`/${text.toLowerCase().replace(' ', '')}`}
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
              bgcolor: '#1f2937',
              color: 'white',
              py: 8,
              textAlign: 'center',
            }}
          >
            <Container>
              <Typography variant="h3" gutterBottom>
                Stopite v stik z nami
              </Typography>
              <Typography variant="h6" gutterBottom>
                Smo tukaj za vsa vaša vprašanja in povpraševanja
              </Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: 'primary.main', mr: 2 }}
              >
                Pokličite nas
              </Button>
              <Button variant="outlined" sx={{ borderColor: 'primary.main' }}>
                Pošljite e-pošto
              </Button>
            </Container>
          </Box>

          <Container sx={{ py: 6 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Phone color="primary" fontSize="large" />
                    <Typography variant="h6">Telefon</Typography>
                    <Typography>041 726 602</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Email color="primary" fontSize="large" />
                    <Typography variant="h6">E-pošta</Typography>
                    <Typography>info@parket-ravbar.com</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <LocationOn color="primary" fontSize="large" />
                    <Typography variant="h6">Naslov</Typography>
                    <Typography>K Roku 139, 8000 Novo Mesto</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Pošljite nam sporočilo
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Ime in priimek"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="E-pošta"
                    type="email"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField label="Telefon" fullWidth sx={{ mb: 2 }} />
                  <TextField
                    label="Sporočilo"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: 'primary.main', color: "white" }}
                  >
                    Pošlji sporočilo
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Pogosta vprašanja
                </Typography>
                {faqItems.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            </Grid>
            <br /><br /><br />
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
  );
}
