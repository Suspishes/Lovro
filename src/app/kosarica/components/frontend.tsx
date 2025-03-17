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
  IconButton
} from "@mui/material"
import { useKosaricaStore } from './backend'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe("za jutri");

interface StripeCheckoutFormProps {
  skupnaCena: number;
  onSuccess: () => void;
  onClose: () => void;
}

const StripeCheckoutForm = ({ skupnaCena, onSuccess, onClose }: StripeCheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        setError('Napaka pri pridobivanju elementa kartice')
        return
      }
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })

      if (stripeError) {
        setError(stripeError.message ?? 'Unknown error')
        return
      }

      const response = await fetch('/api/create-payment-intent', {/// tole pa manka
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(skupnaCena * 100),
          paymentMethodId: paymentMethod.id
        })
      })

      if (!response.ok) throw new Error('Napaka pri plačilu')

      await response.json()
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
  const [showCheckout, setShowCheckout] = useState(false)
  const izprazniKosarico = useKosaricaStore((state) => state.izprazniKosarico)
  const skupnaCena = kosarica.reduce((total, izdelek) =>
    total + izdelek.Cena * izdelek.KolicinaVKosarici, 0
  )

  const handlePaymentSuccess = () => {
    setShowCheckout(false)
    // Dodatna logika po uspešnem plačilu
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

      <Typography variant="h3" component="h1" sx={{
        fontWeight: 'bold',
        mb: 4,
        color: '#1f2937'
      }}>
        Vaša košarica
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {kosarica.map((izdelek) => (
            <Paper
              key={izdelek.IzdelkiID}
              sx={{
                mb: 3,
                p: 3,
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: 3
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: '150px',
                    bgcolor: '#f5f5f5',
                    borderRadius: 2
                  }}>
                    <Image
                      src={izdelek.Slika || "/168.jpg"}
                      alt={izdelek.Ime}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#1f2937'
                  }}>
                    {izdelek.Ime}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                    Cena: {izdelek.Cena.toFixed(2).replace(".", ",")} €
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton
                      sx={{ color: '#6CA748' }}
                      onClick={() => zmanjsajKolicino(izdelek.IzdelkiID)}
                    >
                      <Minus />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2, fontWeight: 'bold' }}>
                      {izdelek.KolicinaVKosarici}
                    </Typography>
                    <IconButton
                      sx={{ color: '#6CA748' }}
                      onClick={() => povecajKolicino(izdelek.IzdelkiID)}
                    >
                      <Plus />
                    </IconButton>
                  </Box>

                  <IconButton
                    sx={{
                      color: '#c62828',
                      '&:hover': { bgcolor: '#ffebee' }
                    }}
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
          <Paper sx={{
            p: 3,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Typography variant="h5" sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#1f2937'
            }}>
              Povzetek košarice
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Skupna cena:
              </Typography>
              <Typography variant="body1" sx={{
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
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

      {showCheckout && (
        <Box sx={{
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
        }}>
          <Box sx={{
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            maxWidth: 500,
            width: '90%',
            position: 'relative'
          }}>
            <Typography variant="h5" sx={{
              mb: 3,
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
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
      )}
    </Container>
  )
}