"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book } from "lucide-react"

// Determinar qué materias tienen clase hoy (basado en la fecha actual)
const hoy = new Date()
const diaActual = hoy.getDate()
const mesActual = hoy.getMonth()
const anioActual = hoy.getFullYear()

// Asignar diferentes días de la semana a cada materia
const materias = [
  {
    id: 1,
    nombre: "Introducción a la Ingeniería",
    comision: "Com A",
    diaClase: "Lunes", // Día fijo de la semana
    tieneClaseHoy: hoy.getDay() === 1, // 1 es lunes
  },
  {
    id: 2,
    nombre: "Matemática I",
    comision: "Com B",
    diaClase: "Miércoles", // Día fijo de la semana
    tieneClaseHoy: hoy.getDay() === 3, // 3 es miércoles
  },
  {
    id: 3,
    nombre: "Programación",
    comision: "Com C",
    diaClase: "Viernes", // Día fijo de la semana
    tieneClaseHoy: hoy.getDay() === 5, // 5 es viernes
  },
  {
    id: 4,
    nombre: "Física I",
    comision: "Com A",
    diaClase: "Martes", // Día fijo de la semana
    tieneClaseHoy: hoy.getDay() === 2, // 2 es martes
  },
  {
    id: 5,
    nombre: "Química General",
    comision: "Com B",
    diaClase: "Jueves", // Día fijo de la semana
    tieneClaseHoy: hoy.getDay() === 4, // 4 es jueves
  },
]

export default function Materias() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Materias</h1>
        <p className="text-muted-foreground">Gestiona tus materias y comisiones</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {materias.map((materia) => (
          <Link key={materia.id} href={`/dashboard/materia/${materia.id}`} className="block">
            <Card
              className={`overflow-hidden transition-colors hover:bg-muted/50 ${materia.tieneClaseHoy ? "border-primary" : ""}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Book className="mr-2 h-5 w-5" />
                  {materia.nombre}
                  {materia.tieneClaseHoy && (
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Hoy</span>
                  )}
                </CardTitle>
                <CardDescription>{materia.comision}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>Día de clase: {materia.diaClase}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
