import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Plataforma Educativa</CardTitle>
          <CardDescription>Sistema de gestión de asistencia para profesores</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/registro">Registrarse</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
