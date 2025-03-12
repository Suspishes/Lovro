"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@mui/material"
import { Card, CardContent } from "@mui/material"
import { Badge } from "@mui/material"
import { ArrowLeft, Euro } from "lucide-react"

type Izdelek = {
  IzdelkiID: number
  Ime: string
  Opis: string | null
  Cena: number | null
  Proizvajalec: string
  Slika?: string
}

export default function IzdelekPage() {
  const params = useParams()
  const router = useRouter()
  const [izdelek, setIzdelek] = useState<Izdelek | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchIzdelek = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/izdelki/${params.id}`)
        if (!response.ok) {
          throw new Error("Izdelek ni bil najden")
        }
        const data = await response.json()
        setIzdelek(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchIzdelek()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse text-lg text-center">Nalaganje izdelka...</div>
      </div>
    )
  }

  if (!izdelek) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Izdelek ni bil najden</h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Nazaj na seznam
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outlined" onClick={() => router.push("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Nazaj na seznam
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-muted rounded-lg overflow-hidden">
          {izdelek.Slika ? (
            <img
              src={izdelek.Slika || "/placeholder.svg"}
              alt={izdelek.Ime}
              className="w-full h-auto object-contain aspect-square"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center">
              <span className="text-muted-foreground">Ni slike</span>
            </div>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">{izdelek.Ime}</h1>
                <Badge className="text-sm">{izdelek.Proizvajalec}</Badge>
              </div>

              <div className="flex items-center mt-4 mb-6">
                <Euro className="h-5 w-5 mr-1" />
                <span className="text-2xl font-bold">{izdelek.Cena ? `${izdelek.Cena.toFixed(2)} €` : "Ni cene"}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Opis</h2>
              <p className="text-muted-foreground whitespace-pre-line">{izdelek.Opis ?? "Za ta izdelek ni opisa."}</p>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="flex-1">Dodaj v košarico</Button>
              <Button variant="outlined" className="flex-1">
                Dodaj med priljubljene
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

