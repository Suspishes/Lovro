import { Card, CardContent, CardHeader, CardActions, Typography, Button, Chip } from "@mui/material";
import Link from "next/link";
import { Euro } from "lucide-react";

type Izdelek = {
  IzdelkiID: number;
  Ime: string;
  Opis: string | null;
  Cena: number | null;
  Proizvajalec: string;
  Slika?: string;
};

interface ProductCardProps {
  izdelek: Izdelek;
}

export default function ProductCard({ izdelek }: ProductCardProps) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%", transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold", lineClamp: 2 }}>
            {izdelek.Ime}
          </Typography>
        }
        action={<Chip label={izdelek.Proizvajalec} variant="outlined" />}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {izdelek.Slika ? (
          <div style={{ position: "relative", height: "200px", background: "#f0f0f0", borderRadius: "8px", overflow: "hidden" }}>
            <img src={izdelek.Slika || "/placeholder.svg"} alt={izdelek.Ime} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : (
          <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", borderRadius: "8px" }}>
            <Typography variant="body2" color="textSecondary">Ni slike</Typography>
          </div>
        )}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, lineClamp: 3 }}>
          {izdelek.Opis ?? "Brez opisa"}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e0e0e0", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Euro size={16} style={{ marginRight: "4px", color: "gray" }} />
          <Typography fontWeight="medium">
            {izdelek.Cena ? `${izdelek.Cena.toFixed(2)} €` : "Ni cene"}
          </Typography>
        </div>
        <Button variant="contained" color="primary" component={Link} href={`/izdelek/${izdelek.IzdelkiID}`} passHref>
          Poglej izdelek
        </Button>
      </CardActions>
    </Card>
  );
}
