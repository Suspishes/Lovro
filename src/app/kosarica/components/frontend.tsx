'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Trash, Plus, Minus, Facebook, Phone } from 'lucide-react'
import { Menu as MenuIcon } from 'lucide-react'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  IconButton,
  TextField,

  useMediaQuery,
  ThemeProvider,
  AppBar,
  Toolbar,
  List,
  Drawer,
  ListItem,
  ListItemText
} from "@mui/material"
import { useKosaricaStore } from './backend'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'


import { Email, LocationOn, Close as CloseIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material';
import { Vstavljanje_podatkov } from './testeram'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutFormProps {
  skupnaCena: number;
  onSuccess: (address: AddressFormData) => void;
  onClose: () => void;
}

export interface AddressFormData {
  name: string;
  surname: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}

const StripeCheckoutForm = ({ skupnaCena, onSuccess, onClose }: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressFormData>({
    name: '',
    surname: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'SI',
    email: '',
    phone: '',
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${address.name} ${address.surname}`,
          email: address.email,
          phone: address.phone,
          address: {
            line1: address.street,
            city: address.city,
            postal_code: address.postalCode,
            country: address.country,
          },
        },
      });

      if (pmError ?? !paymentMethod?.id) throw pmError ?? new Error('Payment method creation failed');

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: skupnaCena,
          paymentMethodId: paymentMethod.id,
          email: address.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error ?? 'Payment failed');
      }

      const result = await response.json() as { requiresAction: boolean, clientSecret: string };
      if (result.requiresAction) {
        const { error: confirmError } = await stripe.confirmCardPayment(result.clientSecret);
        if (confirmError) throw confirmError;
      }

      onSuccess(address);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Dostavni podatki
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ime"
              name="name"
              value={address.name}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Priimek"
              name="surname"
              value={address.surname}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ulica in hišna številka"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Kraj"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Poštna številka"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Država"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              fullWidth
              required
              helperText="Uporabite 2-znakovno kodo države, npr. 'SI' za Slovenijo"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={address.email}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefon"
              name="phone"
              type="tel"
              value={address.phone}
              onChange={handleAddressChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Podatki o kreditni kartici
        </Typography>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1f2937',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                '::placeholder': { color: '#a0aec0' },
              },
              invalid: {
                color: '#e53935',
              },
            },
            hidePostalCode: true, // Optional: Hides the postal code field
          }}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{ color: '#6CA748', borderColor: '#6CA748' }}
        >
          Prekliči
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || loading}
          sx={{
            color: 'white',
            bgcolor: '#6CA748',
            '&:hover': { bgcolor: '#5A8E3A' },
            textTransform: 'none',
          }}
        >
          {loading ? 'Procesiram...' : `Plačaj ${skupnaCena.toFixed(2).replace('.', ',')} €`}
        </Button>
      </Box>
    </form>
  );
};

export default function KosaricaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const kosarica = useKosaricaStore((state) => state.kosarica);
  const odstraniIzdelek = useKosaricaStore((state) => state.odstraniIzdelek)
  const povecajKolicino = useKosaricaStore((state) => state.povecajKolicino)
  const zmanjsajKolicino = useKosaricaStore((state) => state.zmanjsajKolicino)
  const izprazniKosarico = useKosaricaStore((state) => state.izprazniKosarico)

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const skupnaCena = kosarica.reduce((total, izdelek) => total + izdelek.Cena * izdelek.KolicinaVKosarici, 0);

  const handlePaymentSuccess = async (customerData: AddressFormData) => {
    setShowCheckout(false);
    try {
      await Vstavljanje_podatkov(
        customerData,
        kosarica.map((item) => ({
          ...item,
          Kolicina: item.KolicinaVKosarici,
        })),
        skupnaCena
      );
      izprazniKosarico();
      alert('Plačilo uspešno! Hvala za nakup.');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Napaka pri shranjevanju naročila');
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Link href="/Izdelki" passHref>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#6CA748',
              color: '#fff',
              '&:hover': { bgcolor: '#5A8E3A' },
              mb: 4
            }}
            startIcon={<ArrowLeft />}
          >
            Nazaj na izdelke
          </Button>
        </Link>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 4, color: '#1f2937' }}>
          Vaša košarica
        </Typography><Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {kosarica.map((izdelek) => (
              <Paper
                key={izdelek.IzdelkiID}
                sx={{ mb: 3, p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '150px',
                        bgcolor: '#f5f5f5',
                        borderRadius: 2
                      }}
                    >
                      <Image
                        src={izdelek.Slika || "/168.jpg"}
                        alt={izdelek.Ime}
                        layout="fill" // Corrected from `fill` to `layout="fill"`
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 100vw, 50vw" />
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
                sx={{
                  bgcolor: '#6CA748',
                  color: '#fff',
                  py: 2,
                  fontSize: '1.25rem',
                  '&:hover': { bgcolor: '#5A8E3A' }
                }}
                onClick={() => setShowCheckout(true)}
              >
                Zaključi nakup
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {
          showCheckout && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                zIndex: 1300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
                  Plačilo s kreditno kartico
                </Typography>
                <Elements stripe={stripePromise}>
                  <StripeCheckoutForm
                    skupnaCena={skupnaCena}
                    onSuccess={(address) => handlePaymentSuccess(address)}
                    onClose={() => setShowCheckout(false)}
                  />
                </Elements>
              </Paper>
            </Box>
          )
        }

      </Container >
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
                  <Box sx={{ mr: 1, display: 'inline-flex' }}>
                    <Phone />
                  </Box>
                  041 726 602
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
                    <Facebook style={{ marginRight: '8px' }} /> Facebook
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
              {/* &copy; {new Date().getFullYear()} parket-ravbar.com | <Link href="/piskotki" color="inherit">Piškotki</Link> */}
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
