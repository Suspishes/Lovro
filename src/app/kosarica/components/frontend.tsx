'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Trash, Plus, Minus } from 'lucide-react'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  IconButton,
  TextField
} from "@mui/material"
import { useKosaricaStore } from './backend'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe("nek jak kluc");

interface StripeCheckoutFormProps {
  skupnaCena: number;
  onSuccess: () => void;
  onClose: () => void;
}

interface AddressFormData {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}

const StripeCheckoutForm = ({ skupnaCena, onSuccess, onClose }: StripeCheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState<AddressFormData>({
    street: '',
    city: '',
    postalCode: '',
    country: 'SI', // Use the ISO 3166-1 alpha-2 code for Slovenia
    email: '',
    phone: ''
  })

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('Card element not found')

      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { /* ... */ }
      })

      if (pmError ?? !paymentMethod?.id) throw pmError ?? new Error('Payment method creation failed')

      // Call your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: skupnaCena,
          paymentMethodId: paymentMethod.id,
          email: address.email,
          metadata: { /* ... */ }
        })
      })

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type')
        if (contentType?.includes('application/json')) {
          const errorData = await response.json() as { error?: string }
          throw new Error(errorData.error ?? 'Payment failed')
        } else {
          throw new Error('Unexpected response from server')
        }
      }

      const result = await response.json() as { requiresAction: boolean, clientSecret: string, error?: string }

      if (result.requiresAction) {
        // Handle 3D Secure authentication
        const { error: confirmError } = await stripe.confirmCardPayment(result.clientSecret)
        if (confirmError) throw confirmError
      }

      // Success logic
      onSuccess()

    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Dostavni podatki</Typography>
        <Grid container spacing={2}>
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
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Podatki o kreditni kartici</Typography>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1f2937',
                '::placeholder': { color: '#a0aec0' }
              }
            }
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
            bgcolor: '#6CA748',
            '&:hover': { bgcolor: '#5A8E3A' },
            textTransform: 'none'
          }}
        >
          {loading ? 'Procesiram...' : `Plačaj ${skupnaCena.toFixed(2).replace(".", ",")} €`}
        </Button>
      </Box>
    </form>
  )
}

export default function KosaricaPage() {
  const kosarica = useKosaricaStore((state) => state.kosarica)
  const odstraniIzdelek = useKosaricaStore((state) => state.odstraniIzdelek)
  const povecajKolicino = useKosaricaStore((state) => state.povecajKolicino)
  const zmanjsajKolicino = useKosaricaStore((state) => state.zmanjsajKolicino)
  const izprazniKosarico = useKosaricaStore((state) => state.izprazniKosarico)
  const [showCheckout, setShowCheckout] = useState(false)

  const skupnaCena = kosarica.reduce((total, izdelek) =>
    total + izdelek.Cena * izdelek.KolicinaVKosarici, 0
  )

  const handlePaymentSuccess = () => {
    setShowCheckout(false)
    // Additional logic after successful payment
    izprazniKosarico()
    alert('Plačilo uspešno! Hvala za nakup.')
  }

  return (
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
                      fill
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
            <Box
              sx={{
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                maxWidth: 500,
                width: '90%',
                position: 'relative'
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
                Plačilo s kreditno kartico
              </Typography>
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm
                  skupnaCena={skupnaCena}
                  onSuccess={handlePaymentSuccess}
                  onClose={() => setShowCheckout(false)}
                />
              </Elements>
            </Box>
          </Box>
        )
      }
    </Container >
  )
}
