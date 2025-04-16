"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { User } from "lucide-react"

export default function Perfil() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    nombre: "",
    email: "",
    titulo: "",
    bio: "",
  })

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const email = localStorage.getItem("userEmail") || ""
    const nombre = localStorage.getItem("userName") || "Profesor"

    setProfile({
      nombre,
      email,
      titulo: "Profesor",
      bio: "Docente universitario con experiencia en educación superior.",
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular actualización
    setTimeout(() => {
      localStorage.setItem("userName", profile.nombre)
      localStorage.setItem("userEmail", profile.email)

      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido actualizados correctamente.",
      })

      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>Actualiza tus datos de perfil</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input id="nombre" name="nombre" value={profile.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input id="titulo" name="titulo" value={profile.titulo} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} rows={4} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
            <CardDescription>Detalles de tu cuenta en la plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium">Estado de la cuenta</span>
              <span className="font-normal">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Activa
                </span>
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium">Tipo de usuario</span>
              <span className="font-normal">Profesor</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium">Fecha de registro</span>
              <span className="font-normal">15 de Abril, 2025</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium">Último inicio de sesión</span>
              <span className="font-normal">Hoy</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Cambiar Contraseña
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
