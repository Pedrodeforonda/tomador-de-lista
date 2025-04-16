"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, AlertTriangle, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos mockeados
const materias = {
  "1": {
    nombre: "Introducción a la Ingeniería",
    comision: "Com A",
    totalAlumnosInscriptos: 20,
    diaClase: 1, // 1 = Lunes
  },
  "2": {
    nombre: "Matemática I",
    comision: "Com B",
    totalAlumnosInscriptos: 25,
    diaClase: 3, // 3 = Miércoles
  },
  "3": {
    nombre: "Programación",
    comision: "Com C",
    totalAlumnosInscriptos: 18,
    diaClase: 5, // 5 = Viernes
  },
  "4": {
    nombre: "Física I",
    comision: "Com A",
    totalAlumnosInscriptos: 22,
    diaClase: 2, // 2 = Martes
  },
  "5": {
    nombre: "Química General",
    comision: "Com B",
    totalAlumnosInscriptos: 19,
    diaClase: 4, // 4 = Jueves
  },
}

// Mapeo de números de día a nombres
const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

// Lista fija de alumnos por materia
const alumnosMateria = {
  "1": [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martínez",
    "Pedro Rodríguez",
    "Laura Sánchez",
    "Miguel González",
    "Sofía Fernández",
    "Diego Torres",
    "Valentina Ramírez",
    "Andrés Díaz",
    "Camila Hernández",
    "Lucas Flores",
    "Isabella Ruiz",
    "Mateo Vargas",
    "Victoria Castro",
    "Nicolás Silva",
    "Gabriela Rojas",
    "Sebastián Morales",
    "Valeria Ortiz",
  ],
  "2": [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martínez",
    "Pedro Rodríguez",
    "Laura Sánchez",
    "Miguel González",
    "Sofía Fernández",
    "Diego Torres",
    "Valentina Ramírez",
    "Andrés Díaz",
    "Camila Hernández",
    "Lucas Flores",
    "Isabella Ruiz",
    "Mateo Vargas",
    "Victoria Castro",
    "Nicolás Silva",
    "Gabriela Rojas",
    "Sebastián Morales",
    "Valeria Ortiz",
    "Alejandro Mendoza",
    "Carolina Gutiérrez",
    "Javier Acosta",
    "Daniela Molina",
    "Emilio Vega",
  ],
  "3": [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martínez",
    "Pedro Rodríguez",
    "Laura Sánchez",
    "Miguel González",
    "Sofía Fernández",
    "Diego Torres",
    "Valentina Ramírez",
    "Andrés Díaz",
    "Camila Hernández",
    "Lucas Flores",
    "Isabella Ruiz",
    "Mateo Vargas",
    "Victoria Castro",
    "Nicolás Silva",
    "Gabriela Rojas",
  ],
  "4": [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martínez",
    "Pedro Rodríguez",
    "Laura Sánchez",
    "Miguel González",
    "Sofía Fernández",
    "Diego Torres",
    "Valentina Ramírez",
    "Andrés Díaz",
    "Camila Hernández",
    "Lucas Flores",
    "Isabella Ruiz",
    "Mateo Vargas",
    "Victoria Castro",
    "Nicolás Silva",
    "Gabriela Rojas",
    "Sebastián Morales",
    "Valeria Ortiz",
    "Alejandro Mendoza",
    "Carolina Gutiérrez",
  ],
  "5": [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martínez",
    "Pedro Rodríguez",
    "Laura Sánchez",
    "Miguel González",
    "Sofía Fernández",
    "Diego Torres",
    "Valentina Ramírez",
    "Andrés Díaz",
    "Camila Hernández",
    "Lucas Flores",
    "Isabella Ruiz",
    "Mateo Vargas",
    "Victoria Castro",
    "Nicolás Silva",
    "Gabriela Rojas",
    "Sebastián Morales",
  ],
}

// Alumnos con problemas graves de asistencia (tendrán muchas faltas, estado "Libre")
const alumnosConProblemasGraves = ["Pedro Rodríguez", "Sofía Fernández", "Nicolás Silva"]

// Alumnos con problemas moderados de asistencia (tendrán algunas faltas, pero seguirán "Regular")
const alumnosConProblemasModerados = [
  "Carlos López",
  "Diego Torres",
  "Valentina Ramírez",
  "Lucas Flores",
  "Victoria Castro",
]

// Número fijo de clases totales
const CLASES_TOTALES = 16

// Generar fechas de clases (desde la primera semana de marzo)
const generarFechasClases = (materiaId) => {
  const fechas = []
  const hoy = new Date()
  const alumnosDeLaMateria = alumnosMateria[materiaId] || []
  const materia = materias[materiaId]

  if (!materia) return fechas

  // Calcular la fecha de la primera semana de marzo
  const primerDiaMarzo = new Date(hoy.getFullYear(), 2, 1) // Marzo es el mes 2 (0-indexed)

  // Encontrar el primer día de clase para esta materia
  const primerClase = new Date(primerDiaMarzo)

  // Ajustar al día de la semana correspondiente a esta materia
  const diaSemanaMarzo1 = primerDiaMarzo.getDay() // 0 es domingo, 1 es lunes, etc.
  const diasHastaPrimerClase = (materia.diaClase - diaSemanaMarzo1 + 7) % 7

  primerClase.setDate(primerDiaMarzo.getDate() + diasHastaPrimerClase)

  // Si el primer día de clase cae antes del 1 de marzo, avanzar una semana
  if (primerClase < primerDiaMarzo) {
    primerClase.setDate(primerClase.getDate() + 7)
  }

  // Patrones de asistencia para cada alumno (para mantener consistencia)
  const patronesAsistencia = {}
  alumnosDeLaMateria.forEach((nombre) => {
    // Asignar un patrón de asistencia según el tipo de alumno
    if (alumnosConProblemasGraves.includes(nombre)) {
      // Alumnos con problemas graves: faltan mucho (60-70% de faltas)
      patronesAsistencia[nombre] = {
        baseAsistencia: 0.35, // 35% de probabilidad base de asistir
        variacion: 0.15, // ±15% de variación por clase
      }
    } else if (alumnosConProblemasModerados.includes(nombre)) {
      // Alumnos con problemas moderados: faltan ocasionalmente (30-40% de faltas)
      patronesAsistencia[nombre] = {
        baseAsistencia: 0.65, // 65% de probabilidad base de asistir
        variacion: 0.15, // ±15% de variación por clase
      }
    } else {
      // Alumnos regulares: rara vez faltan (5-15% de faltas)
      patronesAsistencia[nombre] = {
        baseAsistencia: 0.9, // 90% de probabilidad base de asistir
        variacion: 0.1, // ±10% de variación por clase
      }
    }
  })

  for (let i = 0; i < CLASES_TOTALES; i++) {
    // Una clase por semana
    const fecha = new Date(primerClase)
    fecha.setDate(primerClase.getDate() + i * 7)

    // Verificar si esta fecha es hoy
    const esHoy = fecha.toDateString() === new Date().toDateString()

    // Solo incluir clases hasta hoy (pasadas y la de hoy)
    if (fecha <= new Date()) {
      // Si es hoy, no generar asistencia aún
      if (esHoy) {
        fechas.push({
          id: i,
          fecha: fecha.toLocaleDateString("es-ES"),
          alumnos: [],
          fechaObj: fecha,
          esHoy: true,
        })
      } else {
        // Generar asistencia para esta clase pasada
        const alumnosClase = alumnosDeLaMateria.map((nombre, index) => {
          const patron = patronesAsistencia[nombre]

          // Generar un valor pseudoaleatorio pero determinista para este alumno y esta clase
          const seed = i * 1000 + index
          const randomValue = Math.abs(Math.sin(seed)) // Valor entre 0 y 1

          // Calcular probabilidad de asistencia para esta clase específica
          const probabilidadClase = patron.baseAsistencia + (randomValue * patron.variacion * 2 - patron.variacion)

          // Determinar si está presente basado en la probabilidad
          const presente = randomValue < probabilidadClase

          return {
            id: index,
            nombre: nombre,
            presente: presente,
            llegadaTarde: presente && randomValue > 0.7, // Algunos alumnos presentes llegan tarde
          }
        })

        fechas.push({
          id: i,
          fecha: fecha.toLocaleDateString("es-ES"),
          alumnos: alumnosClase,
          fechaObj: fecha,
          esHoy: false,
        })
      }
    }
  }

  return fechas
}

// Función para calcular faltas totales por alumno
const calcularFaltasTotales = (clases, materiaId) => {
  const alumnosFaltas = {}
  const alumnosDeLaMateria = alumnosMateria[materiaId] || []

  // Inicializar todos los alumnos de la materia
  alumnosDeLaMateria.forEach((nombre) => {
    alumnosFaltas[nombre] = {
      nombre: nombre,
      clasesTotal: CLASES_TOTALES,
      faltas: 0,
      porcentajeAsistencia: 0,
    }
  })

  // Recorrer todas las clases pasadas (no incluir la clase de hoy)
  const clasesPasadas = clases.filter((clase) => !clase.esHoy)

  clasesPasadas.forEach((clase) => {
    clase.alumnos.forEach((alumno) => {
      // Si no estuvo presente, incrementar faltas
      if (!alumno.presente) {
        alumnosFaltas[alumno.nombre].faltas++
      }
    })
  })

  // Calcular porcentaje de asistencia basado en el total de clases (CLASES_TOTALES)
  Object.values(alumnosFaltas).forEach((alumno: any) => {
    // Asumimos que el alumno asistirá a todas las clases futuras
    const faltasActuales = alumno.faltas
    alumno.porcentajeAsistencia = Math.round(((CLASES_TOTALES - faltasActuales) / CLASES_TOTALES) * 100)
  })

  // Convertir a array y ordenar por nombre
  return Object.values(alumnosFaltas).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre))
}

export default function DetalleMateria() {
  const params = useParams()
  const id = params.id as string
  const [fechasClases, setFechasClases] = useState<any[]>([])
  const [claseSeleccionada, setClaseSeleccionada] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("asistencia")
  const [alumnosFaltas, setAlumnosFaltas] = useState<any[]>([])
  const [mostrarFaltasTotales, setMostrarFaltasTotales] = useState(false)

  useEffect(() => {
    const fechas = generarFechasClases(id)
    setFechasClases(fechas)

    // Buscar si hay una clase hoy
    const claseHoy = fechas.find((clase) => clase.esHoy)

    // Si hay una clase hoy, seleccionarla por defecto
    if (claseHoy) {
      setClaseSeleccionada(claseHoy)
    } else {
      // Si no hay clase hoy, seleccionar la última clase pasada
      const ultimaClasePasada = [...fechas].reverse().find((clase) => !clase.esHoy)
      setClaseSeleccionada(ultimaClasePasada || fechas[0])
    }

    // Calcular faltas totales
    const faltasTotales = calcularFaltasTotales(fechas, id)
    setAlumnosFaltas(faltasTotales)
  }, [id])

  const materia = materias[id as keyof typeof materias]

  if (!materia) {
    return <div>Materia no encontrada</div>
  }

  const estadisticasClase = (clase: any) => {
    if (!clase) return { total: materia.totalAlumnosInscriptos, presentes: 0, ausentes: materia.totalAlumnosInscriptos }

    if (clase.esHoy) {
      return { total: materia.totalAlumnosInscriptos, presentes: 0, ausentes: materia.totalAlumnosInscriptos }
    }

    const presentes = clase.alumnos.filter((a: any) => a.presente).length
    const ausentes = clase.alumnos.length - presentes

    return {
      total: materia.totalAlumnosInscriptos,
      presentes: presentes,
      ausentes: ausentes,
    }
  }

  const stats = claseSeleccionada ? estadisticasClase(claseSeleccionada) : null

  const toggleFaltasTotales = () => {
    setMostrarFaltasTotales(!mostrarFaltasTotales)
  }

  // Función para determinar el estado del alumno
  const determinarEstadoAlumno = (porcentajeAsistencia) => {
    if (porcentajeAsistencia >= 75) {
      return { texto: "Regular", clase: "bg-green-100 text-green-800" }
    } else {
      return { texto: "Libre", clase: "bg-red-100 text-red-800" }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{materia.nombre}</h1>
          <p className="text-muted-foreground">
            {materia.comision} - Día de clase: {diasSemana[materia.diaClase]}
          </p>
        </div>
        <Button
          onClick={toggleFaltasTotales}
          variant={mostrarFaltasTotales ? "default" : "outline"}
          className="flex items-center"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Faltas Totales
        </Button>
      </div>

      {mostrarFaltasTotales ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Registro de Faltas Totales
            </CardTitle>
            <CardDescription>
              Listado de alumnos con sus faltas acumuladas - Total inscriptos: {materia.totalAlumnosInscriptos}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumno</TableHead>
                  <TableHead>Clases Totales</TableHead>
                  <TableHead>Faltas</TableHead>
                  <TableHead>% Asistencia</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alumnosFaltas.map((alumno, index) => {
                  const estado = determinarEstadoAlumno(alumno.porcentajeAsistencia)
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{alumno.nombre}</TableCell>
                      <TableCell>{alumno.clasesTotal}</TableCell>
                      <TableCell>{alumno.faltas}</TableCell>
                      <TableCell>{alumno.porcentajeAsistencia}%</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${estado.clase}`}>{estado.texto}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Selector de fechas */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="w-full mb-2">
              <h2 className="text-sm font-medium text-muted-foreground">Seleccionar fecha de clase:</h2>
            </div>
            {fechasClases.map((clase) => (
              <Card
                key={clase.id}
                className={`cursor-pointer p-2 ${
                  claseSeleccionada?.id === clase.id ? "border-primary" : ""
                } ${clase.esHoy ? "bg-primary/10" : ""}`}
                onClick={() => setClaseSeleccionada(clase)}
              >
                <div className="text-sm font-medium">
                  {clase.fecha}
                  {clase.esHoy && <span className="ml-2 text-xs text-primary">(Hoy)</span>}
                </div>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="asistencia" onValueChange={setActiveTab} value={activeTab}>
            <TabsList>
              <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="asistencia" className="space-y-4">
              {claseSeleccionada && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Asistencia del {claseSeleccionada.fecha}
                    </CardTitle>
                    <CardDescription>
                      Listado de alumnos presentes y ausentes - Total inscriptos: {materia.totalAlumnosInscriptos}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Si la clase es hoy, mostrar solo el botón "Tomar Foto" */}
                    {claseSeleccionada.esHoy ? (
                      <div className="flex flex-col items-center py-4">
                        <p className="text-muted-foreground mb-4">Es hora de tomar asistencia para la clase de hoy.</p>
                        <Button asChild size="lg">
                          <Link href={`/dashboard/tomar-foto?materiaId=${id}`}>
                            <Camera className="mr-2 h-5 w-5" />
                            Tomar Foto para Asistencia
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Alumno</TableHead>
                              <TableHead>Estado</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {claseSeleccionada.alumnos.map((alumno: any) => (
                              <TableRow key={alumno.id}>
                                <TableCell className="font-medium">{alumno.nombre}</TableCell>
                                <TableCell>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      alumno.presente ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {alumno.presente ? "Presente" : "Ausente"}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Botón para tomar foto debajo de la lista */}
                        <div className="flex justify-center mt-6">
                          <Button asChild variant="outline">
                            <Link href={`/dashboard/tomar-foto?materiaId=${id}`}>
                              <Camera className="mr-2 h-4 w-4" />
                              Tomar Foto
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="estadisticas">
              {claseSeleccionada && stats && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Estadísticas del {claseSeleccionada.fecha}
                    </CardTitle>
                    <CardDescription>
                      Resumen de asistencia para esta clase - Total inscriptos: {materia.totalAlumnosInscriptos}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {claseSeleccionada.esHoy ? (
                      <div className="flex flex-col items-center py-4">
                        <p className="text-muted-foreground mb-4">
                          No hay estadísticas disponibles aún para la clase de hoy.
                        </p>
                        <Button asChild size="lg">
                          <Link href={`/dashboard/tomar-foto?materiaId=${id}`}>
                            <Camera className="mr-2 h-5 w-5" />
                            Tomar Foto para Asistencia
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-4 md:grid-cols-3">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Total Alumnos</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                {stats.total}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Presentes</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold text-green-600">
                                {stats.presentes}
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                  ({Math.round((stats.presentes / stats.total) * 100)}%)
                                </span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold text-red-600">
                                {stats.ausentes}
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                  ({Math.round((stats.ausentes / stats.total) * 100)}%)
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Botón para tomar foto en la pestaña de estadísticas */}
                        <div className="flex justify-center mt-6">
                          <Button asChild variant="outline">
                            <Link href={`/dashboard/tomar-foto?materiaId=${id}`}>
                              <Camera className="mr-2 h-4 w-4" />
                              Tomar Foto
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
