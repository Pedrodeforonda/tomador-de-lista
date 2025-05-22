"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2, PieChart, TrendingUp, Users } from "lucide-react"

// Datos de materias
const materias = [
  {
    id: 1,
    nombre: "Introducción a la Ingeniería",
    comision: "Com A",
    totalAlumnos: 20,
    asistenciaPromedio: 85,
    alumnosRegulares: 17,
    alumnosLibres: 3,
  },
  {
    id: 2,
    nombre: "Matemática I",
    comision: "Com B",
    totalAlumnos: 25,
    asistenciaPromedio: 78,
    alumnosRegulares: 19,
    alumnosLibres: 6,
  },
  {
    id: 3,
    nombre: "Programación",
    comision: "Com C",
    totalAlumnos: 18,
    asistenciaPromedio: 92,
    alumnosRegulares: 17,
    alumnosLibres: 1,
  },
  {
    id: 4,
    nombre: "Física I",
    comision: "Com A",
    totalAlumnos: 22,
    asistenciaPromedio: 80,
    alumnosRegulares: 18,
    alumnosLibres: 4,
  },
  {
    id: 5,
    nombre: "Química General",
    comision: "Com B",
    totalAlumnos: 19,
    asistenciaPromedio: 88,
    alumnosRegulares: 17,
    alumnosLibres: 2,
  },
]

export default function Estadisticas() {
  // Calcular totales
  const totalAlumnos = materias.reduce((sum, materia) => sum + materia.totalAlumnos, 0)
  const totalRegulares = materias.reduce((sum, materia) => sum + materia.alumnosRegulares, 0)
  const totalLibres = materias.reduce((sum, materia) => sum + materia.alumnosLibres, 0)
  const asistenciaPromedioGeneral = Math.round(
    materias.reduce((sum, materia) => sum + materia.asistenciaPromedio, 0) / materias.length,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas</h1>
        <p className="text-muted-foreground">Análisis de asistencia y rendimiento</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Alumnos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              {totalAlumnos}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alumnos Regulares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalRegulares}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({Math.round((totalRegulares / totalAlumnos) * 100)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alumnos Libres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalLibres}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({Math.round((totalLibres / totalAlumnos) * 100)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{asistenciaPromedioGeneral}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="materias">
        <TabsList>
          <TabsTrigger value="materias">Por Materia</TabsTrigger>
          <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="materias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Asistencia por Materia
              </CardTitle>
              <CardDescription>Porcentaje de asistencia promedio para cada materia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materias.map((materia) => (
                  <div key={materia.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {materia.nombre} - {materia.comision}
                      </span>
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
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          materia.asistenciaPromedio >= 85
                            ? "bg-green-600"
                            : materia.asistenciaPromedio >= 75
                              ? "bg-yellow-500"
                              : "bg-red-600"
                        }`}
                        style={{ width: `${materia.asistenciaPromedio}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Estado de Alumnos por Materia
              </CardTitle>
              <CardDescription>Distribución de alumnos regulares y libres por materia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materias.map((materia) => (
                  <div key={materia.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {materia.nombre} - {materia.comision}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-600">
                          Regulares: {materia.alumnosRegulares} (
                          {Math.round((materia.alumnosRegulares / materia.totalAlumnos) * 100)}%)
                        </span>
                        <span className="text-xs text-red-600">
                          Libres: {materia.alumnosLibres} (
                          {Math.round((materia.alumnosLibres / materia.totalAlumnos) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-green-600 h-2.5"
                        style={{ width: `${(materia.alumnosRegulares / materia.totalAlumnos) * 100}%` }}
                      ></div>
                      <div
                        className="bg-red-600 h-2.5"
                        style={{ width: `${(materia.alumnosLibres / materia.totalAlumnos) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencias">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Tendencias de Asistencia
              </CardTitle>
              <CardDescription>Evolución de la asistencia a lo largo del tiempo</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Gráficos de tendencia en desarrollo</h3>
                <p className="text-muted-foreground max-w-md">
                  Estamos trabajando en implementar gráficos detallados de tendencias de asistencia para ayudarte a
                  visualizar mejor los patrones a lo largo del tiempo.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
