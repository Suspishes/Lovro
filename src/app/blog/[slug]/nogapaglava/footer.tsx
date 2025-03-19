"use client"
import { Container } from "@mui/material";
import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { Email, Facebook, LocationOn, Phone } from "@mui/icons-material";

export default function Footer() {
    const theme = useTheme();

    return (
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
    )
}