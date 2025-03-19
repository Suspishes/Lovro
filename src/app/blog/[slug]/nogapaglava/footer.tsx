"use client"
import { Container } from "@mui/material";
import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { Email, Facebook, LocationOn, Phone } from "@mui/icons-material";

export default function Footer() {
    const theme = useTheme();

    return (
        <Container
            maxWidth="lg"
            sx={{
                padding: { xs: 3, md: 4 },
                bgcolor: '#1f2937',
                color: 'white',
                [theme.breakpoints.up('md')]: {
                    px: 4
                }
            }}
        >
            <Grid container spacing={4}>
                {/* Prvi stolpec */}
                <Grid item xs={12} md={4}>
                    <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                        Parketarstvo Ravbar
                    </Typography>
                    <Typography variant="body2">
                        K Roku 139
                        <br />
                        8000, Novo Mesto
                    </Typography>
                </Grid>

                {/* Logo sredina */}
                <Grid item xs={12} md={4} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src="/C1_LOGOTIP RAVBAR_vodoraven_ no 01.png"
                        alt="Ravbar Parketarstvo Logo"
                        style={{
                            height: theme.breakpoints.up('md') ? 100 : 70,
                            width: 'auto',
                            maxWidth: '100%'
                        }}
                    />
                </Grid>

                {/* Tretji stolpec - Kontakti */}
                <Grid item xs={12} md={4}>
                    <Box sx={{
                        textAlign: { xs: 'left', md: 'right' },
                        '& > .MuiTypography-root': { mb: 1 }
                    }}>
                        <Typography variant="body2">
                            <Link
                                href="tel:041726602"
                                color="inherit"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: { xs: 'flex-start', md: 'flex-end' }
                                }}
                            >
                                <Phone sx={{ mr: 1 }} /> 041 726 602
                            </Link>
                        </Typography>

                        <Typography variant="body2">
                            <Link
                                href="mailto:info@parket-ravbar.com"
                                color="inherit"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: { xs: 'flex-start', md: 'flex-end' }
                                }}
                            >
                                <Email sx={{ mr: 1 }} /> info@parket-ravbar.com
                            </Link>
                        </Typography>

                        <Typography variant="body2">
                            <Link
                                href="https://www.facebook.com/parketarstvoravbar"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: { xs: 'flex-start', md: 'flex-end' }
                                }}
                            >
                                <Facebook sx={{ mr: 1 }} /> Facebook
                            </Link>
                        </Typography>

                        <Typography variant="body2">
                            <Link
                                href="#"
                                color="inherit"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: { xs: 'flex-start', md: 'flex-end' }
                                }}
                            >
                                <LocationOn sx={{ mr: 1 }} /> Prikaži zemljevid
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Spodnji del */}
            <Box sx={{
                mt: 4,
                textAlign: 'center',
                px: { xs: 2, md: 0 }
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        lineHeight: 1.2
                    }}
                >
                    LES JE NARAVEN, PUSTIMO DA TAK TUDI OSTANE
                </Typography>
            </Box>

            <Box sx={{
                mt: 3,
                textAlign: 'center',
                '& > .MuiTypography-root': {
                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                }
            }}>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} parket-ravbar.com |{' '}
                    <Link href="/piskotki" color="inherit">Piškotki</Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Lovro Ravbar
                </Typography>
            </Box>
        </Container>
    )
}