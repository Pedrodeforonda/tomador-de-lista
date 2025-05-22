"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

// Determinar qué materias tienen clase hoy (basado en la fecha actual)
const hoy = new Date()
const diaActual = hoy.getDay() // 0 es domingo, 1 es lunes, etc.

// Datos de materias
const materias = [
  {
    id: 1,
    nombre: "Introducción a la Ingeniería",
    comision: "Com A",
    diasClase: [
      { dia: 1, horaInicio: "08:00", horaFin: "10:00" },
      { dia: 3, horaInicio: "14:00", horaFin: "16:00" },
    ],
    tieneClaseHoy: diaActual === 1 || diaActual === 3,
    totalAlumnos: 20,
  },
  {
    id: 2,
    nombre: "Matemática I",
    comision: "Com B",
    diasClase: [{ dia: 3, horaInicio: "08:00", horaFin: "10:00" }],
    tieneClaseHoy: diaActual === 3,
    totalAlumnos: 25,
  },
  {
    id: 3,
    nombre: "Programación",
    comision: "Com C",
    diasClase: [
      { dia: 5, horaInicio: "08:00", horaFin: "10:00" },
      { dia: 5, horaInicio: "10:30", horaFin: "12:30" },
    ],
    tieneClaseHoy: diaActual === 5,
    totalAlumnos: 18,
  },
  {
    id: 4,
    nombre: "Física I",
    comision: "Com A",
    diasClase: [{ dia: 2, horaInicio: "08:00", horaFin: "10:00" }],
    tieneClaseHoy: diaActual === 2,
    totalAlumnos: 22,
  },
  {
    id: 5,
    nombre: "Química General",
    comision: "Com B",
    diasClase: [{ dia: 4, horaInicio: "08:00", horaFin: "10:00" }],
    tieneClaseHoy: diaActual === 4,
    totalAlumnos: 19,
  },
]

// Mapeo de números de día a nombres
const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

// Filtrar materias que tienen clase hoy
const materiasHoy = materias.filter((materia) => materia.tieneClaseHoy)

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Materias</h1>
        <p className="text-muted-foreground">Bienvenido a tu panel de control de clases</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Clases de Hoy</CardTitle>
            <CardDescription>
              Materias con clases programadas para{" "}
              {hoy.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {materiasHoy.length > 0 ? (
              <div className="space-y-4">
                {materiasHoy.map((materia) => (
                  <div
                    key={materia.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-medium">{materia.nombre}</h3>
                      <p className="text-sm text-muted-foreground">
                        {materia.comision} -{" "}
                        {materia.diasClase.map(
                          (d, i) =>
                            diaActual === d.dia && (
                              <span key={i}>
                                {d.horaInicio} - {d.horaFin}
                              </span>
                            ),
                        )}
                      </p>
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/dashboard/tomar-foto?materiaId=${materia.id}`}>
                        <Camera className="mr-2 h-4 w-4" />
                        Tomar Asistencia
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <p className="text-muted-foreground">No tienes clases programadas para hoy.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Todas Mis Materias</CardTitle>
            <CardDescription>Accede rápidamente a tus materias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {materias.map((materia) => (
                <Button key={materia.id} asChild variant="outline" className="w-full justify-start">
                  <Link href={`/dashboard/materia/${materia.id}`}>
                    <Book className="mr-2 h-4 w-4" />
                    {materia.nombre} - {materia.comision}
                    {materia.tieneClaseHoy && (
                      <span className="ml-auto px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Hoy</span>
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
