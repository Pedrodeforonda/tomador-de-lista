"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Book, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

// Determinar qué materias tienen clase hoy
const hoy = new Date()
const diaActual = hoy.getDay() // 0 es domingo, 1 es lunes, etc.

// Datos de materias
const materias = [
  {
    id: 1,
    nombre: "Introducción a la Ingeniería",
    comision: "Com A",
    diaClase: 1, // 1 = Lunes
    tieneClaseHoy: diaActual === 1,
    totalAlumnos: 20,
    asistenciaPromedio: 85,
  },
  {
    id: 2,
    nombre: "Matemática I",
    comision: "Com B",
    diaClase: 3, // 3 = Miércoles
    tieneClaseHoy: diaActual === 3,
    totalAlumnos: 25,
    asistenciaPromedio: 78,
  },
  {
    id: 3,
    nombre: "Programación",
    comision: "Com C",
    diaClase: 5, // 5 = Viernes
    tieneClaseHoy: diaActual === 5,
    totalAlumnos: 18,
    asistenciaPromedio: 92,
  },
  {
    id: 4,
    nombre: "Física I",
    comision: "Com A",
    diaClase: 2, // 2 = Martes
    tieneClaseHoy: diaActual === 2,
    totalAlumnos: 22,
    asistenciaPromedio: 80,
  },
  {
    id: 5,
    nombre: "Química General",
    comision: "Com B",
    diaClase: 4, // 4 = Jueves
    tieneClaseHoy: diaActual === 4,
    totalAlumnos: 19,
    asistenciaPromedio: 88,
  },
]

// Mapeo de números de día a nombres
const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export default function Asistencia() {
  const [activeTab, setActiveTab] = useState("hoy")

  // Filtrar materias que tienen clase hoy
  const materiasHoy = materias.filter((materia) => materia.tieneClaseHoy)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Asistencia</h1>
        <p className="text-muted-foreground">Gestiona la asistencia de tus materias</p>
      </div>

      <Tabs defaultValue="hoy" onValueChange={setActiveTab} value={activeTab}>
        <TabsList>
          <TabsTrigger value="hoy">Clases de Hoy</TabsTrigger>
          <TabsTrigger value="todas">Todas las Materias</TabsTrigger>
        </TabsList>

        <TabsContent value="hoy" className="space-y-4">
          {materiasHoy.length > 0 ? (
            <div className="grid gap-4">
              {materiasHoy.map((materia) => (
                <Card key={materia.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Book className="mr-2 h-5 w-5" />
                      {materia.nombre} - {materia.comision}
                    </CardTitle>
                    <CardDescription>
                      Día de clase: {diasSemana[materia.diaClase]} - Total alumnos: {materia.totalAlumnos}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center py-4">
                      <p className="text-muted-foreground mb-4">Es hora de tomar asistencia para la clase de hoy.</p>
                      <Button asChild size="lg">
                        <Link href={`/dashboard/tomar-foto?materiaId=${materia.id}`}>
                          <Camera className="mr-2 h-5 w-5" />
                          Tomar Foto para Asistencia
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay clases programadas para hoy</h3>
                  <p className="text-muted-foreground">No tienes materias con clases programadas para el día de hoy.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="todas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Asistencia por Materia</CardTitle>
              <CardDescription>Información general de asistencia para todas tus materias</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Materia</TableHead>
                    <TableHead>Comisión</TableHead>
                    <TableHead>Día</TableHead>
                    <TableHead>Total Alumnos</TableHead>
                    <TableHead>Asistencia Promedio</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materias.map((materia) => (
                    <TableRow key={materia.id}>
                      <TableCell className="font-medium">{materia.nombre}</TableCell>
                      <TableCell>{materia.comision}</TableCell>
                      <TableCell>{diasSemana[materia.diaClase]}</TableCell>
                      <TableCell>{materia.totalAlumnos}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            materia.asistenciaPromedio >= 85
                              ? "bg-green-100 text-green-800"
                              : materia.asistenciaPromedio >= 75
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {materia.asistenciaPromedio}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/dashboard/materia/${materia.id}`}>Ver Detalle</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
