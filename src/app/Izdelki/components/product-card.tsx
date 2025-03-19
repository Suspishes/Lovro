'use client'

import React from 'react'
import Link from 'next/link'
import { Euro } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
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

type Izdelek = {
  IzdelkiID: number
  Ime: string
  Opis: string | null
  Cena: number | null
  Proizvajalec: string
  Slika?: string
}

interface ProductCardProps {
  izdelek: Izdelek
}

export default function ProductCard({ izdelek }: ProductCardProps) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        transition: '0.3s', 
        '&:hover': { 
          boxShadow: 6 
        } 
      }}>
        <CardHeader 
          title={
            <Typography variant="h6" sx={{ fontWeight: 'bold', lineClamp: 2 }}>
              {izdelek.Ime}
            </Typography>
          }
          action={
            <Chip 
              label={izdelek.Proizvajalec} 
              variant="outlined" 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }} 
            />
          }
        />
        <CardContent sx={{ flexGrow: 1 }}>
          {izdelek.Slika ? (
            <Box 
              sx={{ 
                position: 'relative', 
                height: '200px', 
                bgcolor: 'grey.100', 
                borderRadius: '8px', 
                overflow: 'hidden' 
              }}
            >
              <img 
                src={izdelek.Slika || '/placeholder.svg'} 
                alt={izdelek.Ime} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </Box>
          ) : (
            <Box 
              sx={{ 
                height: '200px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                bgcolor: 'grey.100', 
                borderRadius: '8px' 
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Ni slike
              </Typography>
            </Box>
          )}
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2, lineClamp: 3 }}>
            {izdelek.Opis ?? "Brez opisa"}
          </Typography>
        </CardContent>
        <CardActions 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            borderTop: '1px solid #e0e0e0', 
            padding: '16px' 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Euro size={16} style={{ marginRight: '4px', color: 'gray' }} />
            <Typography fontWeight="medium">
              {izdelek.Cena ? `${izdelek.Cena.toFixed(2)} €` : "Ni cene"}
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            href={`/Izdelki/${izdelek.IzdelkiID}`} 
            passHref
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'common.white',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
          Poglej izdelek
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
}