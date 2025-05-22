"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, Moon, Sun } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Configuracion() {
  const [notificaciones, setNotificaciones] = useState({
    email: true,
    asistencia: true,
    recordatorios: false,
  })

  const [tema, setTema] = useState("light")

  const handleSaveGeneral = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente.",
    })
  }

  const handleSaveNotificaciones = () => {
    toast({
      title: "Notificaciones actualizadas",
      description: "Tus preferencias de notificaciones han sido guardadas.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra tus preferencias y ajustes</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Preferencias Generales
              </CardTitle>
              <CardDescription>Configura las opciones generales de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="idioma">
                    <SelectValue placeholder="Selecciona un idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zona-horaria">Zona Horaria</Label>
                <Select defaultValue="america-argentina">
                  <SelectTrigger id="zona-horaria">
                    <SelectValue placeholder="Selecciona una zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-argentina">América/Argentina/Buenos Aires</SelectItem>
                    <SelectItem value="america-santiago">América/Santiago</SelectItem>
                    <SelectItem value="america-bogota">América/Bogotá</SelectItem>
                    <SelectItem value="america-mexico">América/Ciudad de México</SelectItem>
                    <SelectItem value="america-lima">América/Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="tema">Tema</Label>
                  <div className="text-sm text-muted-foreground">Elige entre tema claro y oscuro</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className={`h-4 w-4 ${tema === "light" ? "text-primary" : "text-muted-foreground"}`} />
                  <Switch
                    id="tema"
                    checked={tema === "dark"}
                    onCheckedChange={(checked) => setTema(checked ? "dark" : "light")}
                  />
                  <Moon className={`h-4 w-4 ${tema === "dark" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Preferencias de Notificaciones
              </CardTitle>
              <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Notificaciones por Email</Label>
                  <div className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</div>
                </div>
                <Switch
                  id="email-notif"
                  checked={notificaciones.email}
                  onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, email: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="asistencia-notif">Alertas de Asistencia</Label>
                  <div className="text-sm text-muted-foreground">
                    Notificaciones sobre alumnos con problemas de asistencia
                  </div>
                </div>
                <Switch
                  id="asistencia-notif"
                  checked={notificaciones.asistencia}
                  onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, asistencia: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="recordatorios-notif">Recordatorios de Clase</Label>
                  <div className="text-sm text-muted-foreground">Recibe recordatorios antes de tus clases</div>
                </div>
                <Switch
                  id="recordatorios-notif"
                  checked={notificaciones.recordatorios}
                  onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, recordatorios: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificaciones}>Guardar Preferencias</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Seguridad de la Cuenta
              </CardTitle>
              <CardDescription>Administra la seguridad de tu cuenta y cambia tu contraseña</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 items-start">
              <Button>Cambiar Contraseña</Button>
              <p className="text-sm text-muted-foreground mt-2">
                La contraseña debe tener al menos 8 caracteres e incluir una combinación de letras, números y símbolos.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
