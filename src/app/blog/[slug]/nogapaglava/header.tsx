"use client"
import { AppBar, Box, Button, Container, Drawer, IconButton, Link, List, ListItem, ListItemText, Toolbar, useMediaQuery } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <AppBar position="relative" sx={{ bgcolor: '#1f2937', boxShadow: 2, py: 2 }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, mx: -22, display: 'flex', justifyContent: 'flex-start' }}>
                            <Link href="/" component="a" sx={{ display: 'inline-block' }}>
                                <img src="/C1_LOGOTIP RAVBAR_vodoraven_ no 01.png" alt="Ravbar Parketarstvo Logo" style={{ height: 64, width: 'auto' }} />
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
                                                color: '#6CA748',
                                                bgcolor: 'transparent',
                                                borderColor: '#6CA748',
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
        </>
    );
}