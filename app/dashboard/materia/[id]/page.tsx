"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar,
  Users,
  Camera,
  Settings,
  Clock,
  Plus,
  Trash2,
  Edit,
  UserPlus,
  UserMinus,
  Search,
  SortAsc,
  SortDesc,
  Filter,
  FileText,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos mockeados
const materias = {
  "1": {
    nombre: "Introducción a la Ingeniería",
    comision: "Com A",
    totalAlumnosInscriptos: 28,
    diasClase: [
      { dia: 1, horaInicio: "08:00", horaFin: "10:00", fechaInicio: "2023-03-01", fechaFin: "2023-07-15" },
      { dia: 3, horaInicio: "14:00", horaFin: "16:00", fechaInicio: "2023-03-01", fechaFin: "2023-07-15" },
    ],
    asistenciaPromedio: 5.36,
    alumnosRegulares: 0,
    alumnosLibres: 28,
    totalClases: 4,
  },
  "2": {
    nombre: "Matemática I",
    comision: "Com B",
    totalAlumnosInscriptos: 25,
    diasClase: [{ dia: 3, horaInicio: "08:00", horaFin: "10:00", fechaInicio: "2023-03-01", fechaFin: "2023-07-15" }],
    asistenciaPromedio: 78,
    alumnosRegulares: 19,
    alumnosLibres: 6,
    totalClases: 8,
  },
  "3": {
    nombre: "Programación",
    comision: "Com C",
    totalAlumnosInscriptos: 18,
    diasClase: [
      { dia: 5, horaInicio: "08:00", horaFin: "10:00", fechaInicio: "2023-03-01", fechaFin: "2023-07-15" },
      { dia: 5, horaInicio: "10:30", horaFin: "12:30", fechaInicio: "2023-03-01", fechaFin: "2023-07-15" },
    ],
    asistenciaPromedio: 92,
    alumnosRegulares: 17,
    alumnosLibres: 1,
    totalClases: 10,
  },
  "4": {
    nombre: "Física I",
    comision: "Com A",
    totalAlumnosInscriptos: 22,
    diasClase: [{ dia: 2, horaInicio: "08:00", horaFin: "10:00", fechaInicio: "2023-03-01", fechaFin: "2023-07-15" }],
    asistenciaPromedio: 80,
    alumnosRegulares: 18,
    alumnosLibres: 4,
    totalClases: 9,
  },
  "5": {
    nombre: "Química General",
    comision: "Com B",
    totalAlumnosInscriptos: 19,
    diasClase: [{ dia: 4, horaInicio: "08:00", horaFin: "10:00", fechaInicio: "2023-03-01", fechaFin: "2023-07-15" }],
    asistenciaPromedio: 88,
    alumnosRegulares: 17,
    alumnosLibres: 2,
    totalClases: 7,
  },
}

// Mapeo de números de día a nombres
const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

// Lista fija de alumnos por materia
const alumnosMateria = {
  "1": [
    { nombre: "Paula Navarro", email: "paula.navarro@ejemplo.com" },
    { nombre: "Tomás Cabrera", email: "tomas.cabrera@ejemplo.com" },
    { nombre: "Julieta Rojas", email: "julieta.rojas@ejemplo.com" },
    { nombre: "Nicolás Vega", email: "nicolas.vega@ejemplo.com" },
    { nombre: "Martina Silva", email: "martina.silva@ejemplo.com" },
    { nombre: "Facundo Ortiz", email: "facundo.ortiz@ejemplo.com" },
    { nombre: "Agustina Paredes", email: "agustina.paredes@ejemplo.com" },
    { nombre: "Bruno Salas", email: "bruno.salas@ejemplo.com" },
    { nombre: "Pérez, Juan", email: "juan.perez@ejemplo.com" },
    { nombre: "García, María", email: "maria.garcia@ejemplo.com" },
    { nombre: "López, Carlos", email: "carlos.lopez@ejemplo.com" },
    { nombre: "Martínez, Ana", email: "ana.martinez@ejemplo.com" },
    { nombre: "Rodríguez, Pedro", email: "pedro.rodriguez@ejemplo.com" },
    { nombre: "Sánchez, Laura", email: "laura.sanchez@ejemplo.com" },
    { nombre: "González, Miguel", email: "miguel.gonzalez@ejemplo.com" },
    { nombre: "Fernández, Sofía", email: "sofia.fernandez@ejemplo.com" },
    { nombre: "Torres, Diego", email: "diego.torres@ejemplo.com" },
    { nombre: "Ramírez, Valentina", email: "valentina.ramirez@ejemplo.com" },
    { nombre: "Díaz, Andrés", email: "andres.diaz@ejemplo.com" },
    { nombre: "Hernández, Camila", email: "camila.hernandez@ejemplo.com" },
    { nombre: "Flores, Lucas", email: "lucas.flores@ejemplo.com" },
    { nombre: "Ruiz, Isabella", email: "isabella.ruiz@ejemplo.com" },
    { nombre: "Vargas, Mateo", email: "mateo.vargas@ejemplo.com" },
    { nombre: "Castro, Victoria", email: "victoria.castro@ejemplo.com" },
    { nombre: "Silva, Nicolás", email: "nicolas.silva@ejemplo.com" },
    { nombre: "Rojas, Gabriela", email: "gabriela.rojas@ejemplo.com" },
    { nombre: "Morales, Sebastián", email: "sebastian.morales@ejemplo.com" },
    { nombre: "Ortiz, Valeria", email: "valeria.ortiz@ejemplo.com" },
  ],
  "2": [
    { nombre: "Pérez, Juan", email: "juan.perez@ejemplo.com" },
    { nombre: "García, María", email: "maria.garcia@ejemplo.com" },
    { nombre: "López, Carlos", email: "carlos.lopez@ejemplo.com" },
    { nombre: "Martínez, Ana", email: "ana.martinez@ejemplo.com" },
    { nombre: "Rodríguez, Pedro", email: "pedro.rodriguez@ejemplo.com" },
    { nombre: "Sánchez, Laura", email: "laura.sanchez@ejemplo.com" },
    { nombre: "González, Miguel", email: "miguel.gonzalez@ejemplo.com" },
    { nombre: "Fernández, Sofía", email: "sofia.fernandez@ejemplo.com" },
    { nombre: "Torres, Diego", email: "diego.torres@ejemplo.com" },
    { nombre: "Ramírez, Valentina", email: "valentina.ramirez@ejemplo.com" },
    { nombre: "Díaz, Andrés", email: "andres.diaz@ejemplo.com" },
    { nombre: "Hernández, Camila", email: "camila.hernandez@ejemplo.com" },
    { nombre: "Flores, Lucas", email: "lucas.flores@ejemplo.com" },
    { nombre: "Ruiz, Isabella", email: "isabella.ruiz@ejemplo.com" },
    { nombre: "Vargas, Mateo", email: "mateo.vargas@ejemplo.com" },
    { nombre: "Castro, Victoria", email: "victoria.castro@ejemplo.com" },
    { nombre: "Silva, Nicolás", email: "nicolas.silva@ejemplo.com" },
    { nombre: "Rojas, Gabriela", email: "gabriela.rojas@ejemplo.com" },
    { nombre: "Morales, Sebastián", email: "sebastian.morales@ejemplo.com" },
    { nombre: "Ortiz, Valeria", email: "valeria.ortiz@ejemplo.com" },
    { nombre: "Mendoza, Alejandro", email: "alejandro.mendoza@ejemplo.com" },
    { nombre: "Gutiérrez, Carolina", email: "carolina.gutierrez@ejemplo.com" },
    { nombre: "Acosta, Javier", email: "javier.acosta@ejemplo.com" },
    { nombre: "Molina, Daniela", email: "daniela.molina@ejemplo.com" },
    { nombre: "Vega, Emilio", email: "emilio.vega@ejemplo.com" },
  ],
  "3": [
    { nombre: "Pérez, Juan", email: "juan.perez@ejemplo.com" },
    { nombre: "García, María", email: "maria.garcia@ejemplo.com" },
    { nombre: "López, Carlos", email: "carlos.lopez@ejemplo.com" },
    { nombre: "Martínez, Ana", email: "ana.martinez@ejemplo.com" },
    { nombre: "Rodríguez, Pedro", email: "pedro.rodriguez@ejemplo.com" },
    { nombre: "Sánchez, Laura", email: "laura.sanchez@ejemplo.com" },
    { nombre: "González, Miguel", email: "miguel.gonzalez@ejemplo.com" },
    { nombre: "Fernández, Sofía", email: "sofia.fernandez@ejemplo.com" },
    { nombre: "Torres, Diego", email: "diego.torres@ejemplo.com" },
    { nombre: "Ramírez, Valentina", email: "valentina.ramirez@ejemplo.com" },
    { nombre: "Díaz, Andrés", email: "andres.diaz@ejemplo.com" },
    { nombre: "Hernández, Camila", email: "camila.hernandez@ejemplo.com" },
    { nombre: "Flores, Lucas", email: "lucas.flores@ejemplo.com" },
    { nombre: "Ruiz, Isabella", email: "isabella.ruiz@ejemplo.com" },
    { nombre: "Vargas, Mateo", email: "mateo.vargas@ejemplo.com" },
    { nombre: "Castro, Victoria", email: "victoria.castro@ejemplo.com" },
    { nombre: "Silva, Nicolás", email: "nicolas.silva@ejemplo.com" },
    { nombre: "Rojas, Gabriela", email: "gabriela.rojas@ejemplo.com" },
  ],
  "4": [
    { nombre: "Pérez, Juan", email: "juan.perez@ejemplo.com" },
    { nombre: "García, María", email: "maria.garcia@ejemplo.com" },
    { nombre: "López, Carlos", email: "carlos.lopez@ejemplo.com" },
    { nombre: "Martínez, Ana", email: "ana.martinez@ejemplo.com" },
    { nombre: "Rodríguez, Pedro", email: "pedro.rodriguez@ejemplo.com" },
    { nombre: "Sánchez, Laura", email: "laura.sanchez@ejemplo.com" },
    { nombre: "González, Miguel", email: "miguel.gonzalez@ejemplo.com" },
    { nombre: "Fernández, Sofía", email: "sofia.fernandez@ejemplo.com" },
    { nombre: "Torres, Diego", email: "diego.torres@ejemplo.com" },
    { nombre: "Ramírez, Valentina", email: "valentina.ramirez@ejemplo.com" },
    { nombre: "Díaz, Andrés", email: "andres.diaz@ejemplo.com" },
    { nombre: "Hernández, Camila", email: "camila.hernandez@ejemplo.com" },
    { nombre: "Flores, Lucas", email: "lucas.flores@ejemplo.com" },
    { nombre: "Ruiz, Isabella", email: "isabella.ruiz@ejemplo.com" },
    { nombre: "Vargas, Mateo", email: "mateo.vargas@ejemplo.com" },
    { nombre: "Castro, Victoria", email: "victoria.castro@ejemplo.com" },
    { nombre: "Silva, Nicolás", email: "nicolas.silva@ejemplo.com" },
    { nombre: "Rojas, Gabriela", email: "gabriela.rojas@ejemplo.com" },
    { nombre: "Morales, Sebastián", email: "sebastian.morales@ejemplo.com" },
    { nombre: "Ortiz, Valeria", email: "valeria.ortiz@ejemplo.com" },
    { nombre: "Mendoza, Alejandro", email: "alejandro.mendoza@ejemplo.com" },
    { nombre: "Gutiérrez, Carolina", email: "carolina.gutierrez@ejemplo.com" },
  ],
  "5": [
    { nombre: "Pérez, Juan", email: "juan.perez@ejemplo.com" },
    { nombre: "García, María", email: "maria.garcia@ejemplo.com" },
    { nombre: "López, Carlos", email: "carlos.lopez@ejemplo.com" },
    { nombre: "Martínez, Ana", email: "ana.martinez@ejemplo.com" },
    { nombre: "Rodríguez, Pedro", email: "pedro.rodriguez@ejemplo.com" },
    { nombre: "Sánchez, Laura", email: "laura.sanchez@ejemplo.com" },
    { nombre: "González, Miguel", email: "miguel.gonzalez@ejemplo.com" },
    { nombre: "Fernández, Sofía", email: "sofia.fernandez@ejemplo.com" },
    { nombre: "Torres, Diego", email: "diego.torres@ejemplo.com" },
    { nombre: "Ramírez, Valentina", email: "valentina.ramirez@ejemplo.com" },
    { nombre: "Díaz, Andrés", email: "andres.diaz@ejemplo.com" },
    { nombre: "Hernández, Camila", email: "camila.hernandez@ejemplo.com" },
    { nombre: "Flores, Lucas", email: "lucas.flores@ejemplo.com" },
    { nombre: "Ruiz, Isabella", email: "isabella.ruiz@ejemplo.com" },
    { nombre: "Vargas, Mateo", email: "mateo.vargas@ejemplo.com" },
    { nombre: "Castro, Victoria", email: "victoria.castro@ejemplo.com" },
    { nombre: "Silva, Nicolás", email: "nicolas.silva@ejemplo.com" },
    { nombre: "Rojas, Gabriela", email: "gabriela.rojas@ejemplo.com" },
    { nombre: "Morales, Sebastián", email: "sebastian.morales@ejemplo.com" },
  ],
}

// Lista de profesores por materia
const profesoresMateria = {
  "1": [
    { nombre: "Roberto Gómez", email: "roberto.gomez@universidad.edu" },
    { nombre: "Marta Rodríguez", email: "marta.rodriguez@universidad.edu" },
  ],
  "2": [{ nombre: "Carlos Fernández", email: "carlos.fernandez@universidad.edu" }],
  "3": [
    { nombre: "Laura Martínez", email: "laura.martinez@universidad.edu" },
    { nombre: "Javier López", email: "javier.lopez@universidad.edu" },
  ],
  "4": [{ nombre: "Ana García", email: "ana.garcia@universidad.edu" }],
  "5": [{ nombre: "Miguel Torres", email: "miguel.torres@universidad.edu" }],
}

// Alumnos con excepciones de asistencia
const excepcionesAsistencia = {
  "1": [
    {
      alumno: "Rodríguez, Pedro",
      dia: 1,
      horaInicio: "08:00",
      horaFin: "09:00",
      motivo: "Superposición con otra materia",
    },
  ],
  "2": [
    {
      alumno: "García, María",
      dia: 3,
      horaInicio: "08:00",
      horaFin: "09:00",
      motivo: "Tratamiento médico",
    },
  ],
}

// Alumnos con problemas graves de asistencia (tendrán muchas faltas, estado "Libre")
const alumnosConProblemasGraves = ["Rodríguez, Pedro", "Fernández, Sofía", "Silva, Nicolás"]

// Alumnos con problemas moderados de asistencia (tendrán algunas faltas, pero seguirán "Regular")
const alumnosConProblemasModerados = [
  "López, Carlos",
  "Torres, Diego",
  "Ramírez, Valentina",
  "Flores, Lucas",
  "Castro, Victoria",
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

  // Para cada día de clase configurado
  materia.diasClase.forEach((configuracionDia, configIndex) => {
    // Encontrar el primer día de clase para esta configuración
    const primerClase = new Date(primerDiaMarzo)

    // Ajustar al día de la semana correspondiente a esta configuración
    const diaSemanaMarzo1 = primerDiaMarzo.getDay() // 0 es domingo, 1 es lunes, etc.
    const diasHastaPrimerClase = (configuracionDia.dia - diaSemanaMarzo1 + 7) % 7

    primerClase.setDate(primerDiaMarzo.getDate() + diasHastaPrimerClase)

    // Si el primer día de clase cae antes del 1 de marzo, avanzar una semana
    if (primerClase < primerDiaMarzo) {
      primerClase.setDate(primerClase.getDate() + 7)
    }

    // Patrones de asistencia para cada alumno (para mantener consistencia)
    const patronesAsistencia = {}
    alumnosDeLaMateria.forEach((alumno) => {
      // Asignar un patrón de asistencia según el tipo de alumno
      if (alumnosConProblemasGraves.includes(alumno.nombre)) {
        // Alumnos con problemas graves: faltan mucho (60-70% de faltas)
        patronesAsistencia[alumno.nombre] = {
          baseAsistencia: 0.35, // 35% de probabilidad base de asistir
          variacion: 0.15, // ±15% de variación por clase
        }
      } else if (alumnosConProblemasModerados.includes(alumno.nombre)) {
        // Alumnos con problemas moderados: faltan ocasionalmente (30-40% de faltas)
        patronesAsistencia[alumno.nombre] = {
          baseAsistencia: 0.65, // 65% de probabilidad base de asistir
          variacion: 0.15, // ±15% de variación por clase
        }
      } else {
        // Alumnos regulares: rara vez faltan (5-15% de faltas)
        patronesAsistencia[alumno.nombre] = {
          baseAsistencia: 0.9, // 90% de probabilidad base de asistir
          variacion: 0.1, // ±10% de variación por clase
        }
      }
    })

    // Generar 8 clases para cada configuración de día (la mitad del total)
    for (let i = 0; i < 8; i++) {
      // Una clase por semana para esta configuración
      const fecha = new Date(primerClase)
      fecha.setDate(primerClase.getDate() + i * 7)

      // Verificar si esta fecha es hoy
      const esHoy = fecha.toDateString() === new Date().toDateString()

      // Solo incluir clases hasta hoy (pasadas y la de hoy)
      if (fecha <= new Date()) {
        // Generar un ID único para esta clase
        const claseId = `${materiaId}-${configIndex}-${i}`

        // Si es hoy, no generar asistencia aún
        if (esHoy) {
          fechas.push({
            id: claseId,
            fecha: fecha.toLocaleDateString("es-ES"),
            horaInicio: configuracionDia.horaInicio,
            horaFin: configuracionDia.horaFin,
            diaSemana: diasSemana[configuracionDia.dia],
            alumnos: [],
            fechaObj: fecha,
            esHoy: true,
            tipo: "Pendiente",
            registros: [],
          })
        } else {
          // Generar asistencia para esta clase pasada
          const alumnosClase = alumnosDeLaMateria.map((alumno, index) => {
            const patron = patronesAsistencia[alumno.nombre]

            // Generar un valor pseudoaleatorio pero determinista para este alumno y esta clase
            const seed = Number.parseInt(claseId.replace(/\D/g, "")) * 1000 + index
            const randomValue = Math.abs(Math.sin(seed)) // Valor entre 0 y 1

            // Calcular probabilidad de asistencia para esta clase específica
            const probabilidadClase = patron.baseAsistencia + (randomValue * patron.variacion * 2 - patron.variacion)

            // Verificar si el alumno tiene una excepción para este día y hora
            const tieneExcepcion = (excepcionesAsistencia[materiaId] || []).some(
              (exc) =>
                exc.alumno === alumno.nombre &&
                exc.dia === configuracionDia.dia &&
                exc.horaInicio <= configuracionDia.horaInicio &&
                exc.horaFin >= configuracionDia.horaFin,
            )

            // Determinar si está presente basado en la probabilidad o excepción
            const presente = tieneExcepcion || randomValue < probabilidadClase

            return {
              id: index,
              nombre: alumno.nombre,
              email: alumno.email,
              presente: presente,
              justificado: tieneExcepcion,
            }
          })

          // Generar registros de asistencia para esta clase (1 o 2 registros)
          const registros = []

          // Primer registro (automático)
          const horaAutomatico = new Date(fecha)
          horaAutomatico.setHours(Number.parseInt(configuracionDia.horaInicio.split(":")[0]))
          horaAutomatico.setMinutes(Number.parseInt(configuracionDia.horaInicio.split(":")[1]) + 5)

          registros.push({
            id: `${claseId}-auto`,
            hora: `${horaAutomatico.getHours().toString().padStart(2, "0")}:${horaAutomatico.getMinutes().toString().padStart(2, "0")}`,
            tipo: "Automático",
            alumnos: [...alumnosClase],
            presentes: alumnosClase.filter((a) => a.presente).length,
            ausentes: alumnosClase.filter((a) => !a.presente).length,
          })

          // Segundo registro (manual) para algunas clases
          if (i % 2 === 0) {
            const horaManual = new Date(fecha)
            horaManual.setHours(Number.parseInt(configuracionDia.horaInicio.split(":")[0]))
            horaManual.setMinutes(Number.parseInt(configuracionDia.horaInicio.split(":")[1]) + 20)

            // Crear una copia ligeramente diferente de la asistencia para el registro manual
            const alumnosManual = alumnosClase.map((alumno) => {
              // 10% de probabilidad de cambiar el estado de asistencia
              const cambiarEstado = Math.random() < 0.1
              return {
                ...alumno,
                presente: cambiarEstado ? !alumno.presente : alumno.presente,
              }
            })

            registros.push({
              id: `${claseId}-manual`,
              hora: `${horaManual.getHours().toString().padStart(2, "0")}:${horaManual.getMinutes().toString().padStart(2, "0")}`,
              tipo: "Manual",
              alumnos: alumnosManual,
              presentes: alumnosManual.filter((a) => a.presente).length,
              ausentes: alumnosManual.filter((a) => !a.presente).length,
            })
          }

          fechas.push({
            id: claseId,
            fecha: fecha.toLocaleDateString("es-ES"),
            horaInicio: configuracionDia.horaInicio,
            horaFin: configuracionDia.horaFin,
            diaSemana: diasSemana[configuracionDia.dia],
            alumnos: alumnosClase,
            fechaObj: fecha,
            esHoy: false,
            registros: registros,
          })
        }
      }
    }
  })

  // Ordenar las fechas cronológicamente
  return fechas.sort((a, b) => a.fechaObj - b.fechaObj)
}

// Función para calcular faltas totales por alumno
const calcularFaltasTotales = (clases, materiaId) => {
  const alumnosFaltas = {}
  const alumnosDeLaMateria = alumnosMateria[materiaId] || []
  const materia = materias[materiaId]
  const totalClases = materia.totalClases || 4

  // Inicializar todos los alumnos de la materia
  alumnosDeLaMateria.forEach((alumno, index) => {
    // Asignar faltas de manera que algunos alumnos queden en estado "Libre"
    // Los primeros 8 alumnos tendrán 0% de asistencia (todas las faltas)
    if (index < 8) {
      alumnosFaltas[alumno.nombre] = {
        nombre: alumno.nombre,
        email: alumno.email,
        clasesTotal: totalClases,
        faltas: totalClases, // Todas las faltas
        porcentajeAsistencia: 0, // 0% de asistencia
      }
    } else {
      // El resto tendrá asistencia variable
      const faltas = Math.floor(Math.random() * (totalClases / 2)) // Entre 0 y la mitad de las clases
      const porcentajeAsistencia = Math.round(((totalClases - faltas) / totalClases) * 100)

      alumnosFaltas[alumno.nombre] = {
        nombre: alumno.nombre,
        email: alumno.email,
        clasesTotal: totalClases,
        faltas: faltas,
        porcentajeAsistencia: porcentajeAsistencia,
      }
    }
  })

  // Convertir a array y ordenar por nombre
  return Object.values(alumnosFaltas).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre))
}

export default function DetalleMateria() {
  const params = useParams()
  const id = params.id as string
  const [fechasClases, setFechasClases] = useState<any[]>([])
  const [claseSeleccionada, setClaseSeleccionada] = useState<any>(null)
  const [mainTab, setMainTab] = useState("asistencia")
  const [alumnosFaltas, setAlumnosFaltas] = useState<any[]>([])
  const [editandoAsistencia, setEditandoAsistencia] = useState(false)
  const [asistenciaEditada, setAsistenciaEditada] = useState<any[]>([])
  const [profesores, setProfesores] = useState<any[]>([])
  const [alumnos, setAlumnos] = useState<any[]>([])
  const [nuevoProfesor, setNuevoProfesor] = useState({ nombre: "", email: "" })
  const [nuevoAlumno, setNuevoAlumno] = useState({ nombre: "", email: "" })
  const [nuevaExcepcion, setNuevaExcepcion] = useState({
    alumno: "",
    dia: 1,
    horaInicio: "08:00",
    horaFin: "09:00",
    motivo: "",
  })
  const [excepciones, setExcepciones] = useState<any[]>([])
  const [nuevoHorario, setNuevoHorario] = useState({
    dia: 1,
    horaInicio: "08:00",
    horaFin: "10:00",
    fechaInicio: "",
    fechaFin: "",
  })
  const [horarios, setHorarios] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ordenAlumnos, setOrdenAlumnos] = useState("apellido-asc")
  const [filtroAsistencia, setFiltroAsistencia] = useState("todos")
  const [registroSeleccionado, setRegistroSeleccionado] = useState<any>(null)
  const [mostrarDetalleRegistro, setMostrarDetalleRegistro] = useState(false)

  useEffect(() => {
    const fechas = generarFechasClases(id)
    setFechasClases(fechas)

    // Buscar si hay una clase hoy
    const claseHoy = fechas.find((clase) => clase.esHoy)

    // Si hay una clase hoy, seleccionarla por defecto
    if (claseHoy) {
      setClaseSeleccionada(claseHoy)
      setAsistenciaEditada(claseHoy.alumnos.map((a) => ({ ...a })))
    } else {
      // Si no hay clase hoy, seleccionar la última clase pasada
      const ultimaClasePasada = [...fechas].reverse().find((clase) => !clase.esHoy)
      setClaseSeleccionada(ultimaClasePasada || fechas[0])
      if (ultimaClasePasada) {
        setAsistenciaEditada(ultimaClasePasada.alumnos.map((a) => ({ ...a })))
      }
    }

    // Calcular faltas totales
    const faltasTotales = calcularFaltasTotales(fechas, id)
    setAlumnosFaltas(faltasTotales)

    // Cargar profesores
    setProfesores(profesoresMateria[id] || [])

    // Cargar alumnos
    setAlumnos(alumnosMateria[id] || [])

    // Cargar excepciones
    setExcepciones(excepcionesAsistencia[id] || [])

    // Cargar horarios
    setHorarios(materias[id]?.diasClase || [])
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

  // Función para determinar el estado del alumno
  const determinarEstadoAlumno = (porcentajeAsistencia) => {
    if (porcentajeAsistencia >= 75) {
      return { texto: "Regular", clase: "bg-green-100 text-green-800" }
    } else {
      return { texto: "Libre", clase: "bg-red-100 text-red-800" }
    }
  }

  const handleSaveConfiguracion = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración de la materia ha sido actualizada correctamente.",
    })
  }

  const handleToggleAsistencia = (alumnoId) => {
    setAsistenciaEditada((prev) =>
      prev.map((alumno) => (alumno.id === alumnoId ? { ...alumno, presente: !alumno.presente } : alumno)),
    )
  }

  const handleSaveAsistencia = () => {
    // Actualizar la asistencia en el registro seleccionado
    const registroActualizado = {
      ...registroSeleccionado,
      alumnos: asistenciaEditada,
      presentes: asistenciaEditada.filter((a) => a.presente).length,
      ausentes: asistenciaEditada.filter((a) => !a.presente).length,
    }

    // Actualizar el registro en la clase seleccionada
    const clasesActualizadas = fechasClases.map((clase) => {
      if (clase.id === claseSeleccionada.id) {
        const registrosActualizados = clase.registros.map((reg) =>
          reg.id === registroSeleccionado.id ? registroActualizado : reg,
        )
        return { ...clase, registros: registrosActualizados }
      }
      return clase
    })

    setFechasClases(clasesActualizadas)

    // Actualizar la clase seleccionada si es necesario
    if (claseSeleccionada) {
      const registrosActualizados = claseSeleccionada.registros.map((reg) =>
        reg.id === registroSeleccionado.id ? registroActualizado : reg,
      )
      setClaseSeleccionada({ ...claseSeleccionada, registros: registrosActualizados })
    }

    setEditandoAsistencia(false)
    setMostrarDetalleRegistro(false)

    toast({
      title: "Asistencia guardada",
      description: "Los cambios en la asistencia han sido guardados correctamente.",
    })
  }

  const handleCancelEdit = () => {
    // Restaurar la asistencia original
    if (registroSeleccionado) {
      setAsistenciaEditada(registroSeleccionado.alumnos.map((a) => ({ ...a })))
    }
    setEditandoAsistencia(false)
    setMostrarDetalleRegistro(false)
  }

  const handleAddProfesor = () => {
    if (!nuevoProfesor.nombre || !nuevoProfesor.email) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos.",
        variant: "destructive",
      })
      return
    }

    setProfesores([...profesores, nuevoProfesor])
    setNuevoProfesor({ nombre: "", email: "" })

    toast({
      title: "Profesor agregado",
      description: `${nuevoProfesor.nombre} ha sido agregado como profesor.`,
    })
  }

  const handleRemoveProfesor = (index) => {
    const nuevos = [...profesores]
    nuevos.splice(index, 1)
    setProfesores(nuevos)

    toast({
      title: "Profesor eliminado",
      description: "El profesor ha sido eliminado de la materia.",
    })
  }

  const handleAddAlumno = () => {
    if (!nuevoAlumno.nombre || !nuevoAlumno.email) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos.",
        variant: "destructive",
      })
      return
    }

    setAlumnos([...alumnos, nuevoAlumno])
    setNuevoAlumno({ nombre: "", email: "" })

    toast({
      title: "Alumno agregado",
      description: `${nuevoAlumno.nombre} ha sido agregado como alumno.`,
    })
  }

  const handleRemoveAlumno = (index) => {
    const nuevos = [...alumnos]
    nuevos.splice(index, 1)
    setAlumnos(nuevos)

    toast({
      title: "Alumno eliminado",
      description: "El alumno ha sido eliminado de la materia.",
    })
  }

  const handleAddExcepcion = () => {
    if (!nuevaExcepcion.alumno || !nuevaExcepcion.motivo) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos.",
        variant: "destructive",
      })
      return
    }

    setExcepciones([nuevaExcepcion, ...excepciones])
    setNuevaExcepcion({
      alumno: "",
      dia: 1,
      horaInicio: "08:00",
      horaFin: "09:00",
      motivo: "",
    })

    toast({
      title: "Excepción agregada",
      description: `Se ha agregado una excepción para ${nuevaExcepcion.alumno}.`,
    })
  }

  const handleRemoveExcepcion = (index) => {
    const nuevas = [...excepciones]
    nuevas.splice(index, 1)
    setExcepciones(nuevas)

    toast({
      title: "Excepción eliminada",
      description: "La excepción ha sido eliminada.",
    })
  }

  const handleAddHorario = () => {
    setHorarios([nuevoHorario, ...horarios])
    setNuevoHorario({
      dia: 1,
      horaInicio: "08:00",
      horaFin: "10:00",
      fechaInicio: "",
      fechaFin: "",
    })

    toast({
      title: "Horario agregado",
      description: `Se ha agregado un nuevo horario para ${diasSemana[nuevoHorario.dia]}.`,
    })
  }

  const handleRemoveHorario = (index) => {
    const nuevos = [...horarios]
    nuevos.splice(index, 1)
    setHorarios(nuevos)

    toast({
      title: "Horario eliminado",
      description: "El horario ha sido eliminado.",
    })
  }

  const handleEditRegistro = (registro) => {
    setRegistroSeleccionado(registro)
    setAsistenciaEditada(registro.alumnos.map((a) => ({ ...a })))
    setEditandoAsistencia(true)
    setMostrarDetalleRegistro(true)
  }

  // Filtrar y ordenar alumnos para la edición de asistencia
  const filtrarYOrdenarAlumnos = () => {
    let alumnosFiltrados = [...asistenciaEditada]

    // Aplicar búsqueda
    if (searchTerm) {
      alumnosFiltrados = alumnosFiltrados.filter((alumno) =>
        alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Aplicar filtro de asistencia
    if (filtroAsistencia === "presentes") {
      alumnosFiltrados = alumnosFiltrados.filter((alumno) => alumno.presente)
    } else if (filtroAsistencia === "ausentes") {
      alumnosFiltrados = alumnosFiltrados.filter((alumno) => !alumno.presente)
    }

    // Aplicar ordenamiento
    if (ordenAlumnos === "apellido-asc") {
      alumnosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
    } else if (ordenAlumnos === "apellido-desc") {
      alumnosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre))
    } else if (ordenAlumnos === "presentes-primero") {
      alumnosFiltrados.sort((a, b) => Number(b.presente) - Number(a.presente))
    } else if (ordenAlumnos === "ausentes-primero") {
      alumnosFiltrados.sort((a, b) => Number(a.presente) - Number(b.presente))
    }

    return alumnosFiltrados
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{materia.nombre}</h1>
          <p className="text-muted-foreground">
            {materia.comision} -{" "}
            {materia.diasClase.map((d, i) => (
              <span key={i}>
                {i > 0 && ", "}
                {diasSemana[d.dia]} ({d.horaInicio} - {d.horaFin})
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Tabs principales: Asistencia, Estadísticas, Configuración, Gestión */}
      <Tabs defaultValue="asistencia" value={mainTab} onValueChange={setMainTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
          <TabsTrigger value="gestion">Gestión</TabsTrigger>
        </TabsList>

        {/* Contenido de la pestaña Asistencia */}
        <TabsContent value="asistencia" className="space-y-4">
          {/* Selector de clases */}
          <div className="mb-4">
            <div className="w-full mb-2">
              <h2 className="text-sm font-medium text-muted-foreground">Seleccionar clase:</h2>
            </div>
            <Select
              value={claseSeleccionada ? claseSeleccionada.id.toString() : ""}
              onValueChange={(value) => {
                const clase = fechasClases.find((c) => c.id.toString() === value)
                if (clase) {
                  setClaseSeleccionada(clase)
                  setAsistenciaEditada(clase.alumnos.map((a) => ({ ...a })))
                  setEditandoAsistencia(false)
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar clase" />
              </SelectTrigger>
              <SelectContent>
                {fechasClases.map((clase) => (
                  <SelectItem key={clase.id} value={clase.id.toString()}>
                    {clase.fecha} ({clase.horaInicio} - {clase.horaFin}) - {clase.diaSemana}
                    {clase.esHoy && " (Hoy)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cards de estadísticas de la clase seleccionada */}
          {claseSeleccionada && stats && (
            <div className="grid gap-4 md:grid-cols-3 mb-4">
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
          )}

          {/* Detalle de la clase seleccionada */}
          {claseSeleccionada && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Asistencia del {claseSeleccionada.fecha} ({claseSeleccionada.horaInicio} -{" "}
                    {claseSeleccionada.horaFin})
                  </CardTitle>
                  {!claseSeleccionada.esHoy && (
                    <Button variant="outline" onClick={() => setEditandoAsistencia(!editandoAsistencia)}>
                      <Edit className="mr-2 h-4 w-4" />
                      {editandoAsistencia ? "Cancelar" : "Editar"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar alumno..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <Select value={ordenAlumnos} onValueChange={setOrdenAlumnos}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Ordenar por..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apellido-asc">
                        <div className="flex items-center">
                          <SortAsc className="mr-2 h-4 w-4" />
                          Apellido A-Z
                        </div>
                      </SelectItem>
                      <SelectItem value="apellido-desc">
                        <div className="flex items-center">
                          <SortDesc className="mr-2 h-4 w-4" />
                          Apellido Z-A
                        </div>
                      </SelectItem>
                      <SelectItem value="presentes-primero">Presentes primero</SelectItem>
                      <SelectItem value="ausentes-primero">Ausentes primero</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroAsistencia} onValueChange={setFiltroAsistencia}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filtrar por..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          Todos
                        </div>
                      </SelectItem>
                      <SelectItem value="presentes">Presentes</SelectItem>
                      <SelectItem value="ausentes">Ausentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                        {filtrarYOrdenarAlumnos().map((alumno: any) => (
                          <TableRow key={alumno.id}>
                            <TableCell className="font-medium">{alumno.nombre}</TableCell>
                            <TableCell>
                              {editandoAsistencia ? (
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={alumno.presente}
                                    onCheckedChange={() => handleToggleAsistencia(alumno.id)}
                                  />
                                  <span>{alumno.presente ? "Presente" : "Ausente"}</span>
                                </div>
                              ) : (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    alumno.presente
                                      ? "bg-green-100 text-green-800"
                                      : alumno.justificado
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {alumno.presente
                                    ? "Presente"
                                    : alumno.justificado
                                      ? "Ausente (Justificado)"
                                      : "Ausente"}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {editandoAsistencia && (
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => setEditandoAsistencia(false)}>Guardar Cambios</Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Registros de asistencia */}
          {claseSeleccionada &&
            !claseSeleccionada.esHoy &&
            claseSeleccionada.registros &&
            claseSeleccionada.registros.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Registros de asistencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha y hora</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Presentes</TableHead>
                          <TableHead>Ausentes</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {claseSeleccionada.registros.map((registro) => (
                          <TableRow key={registro.id}>
                            <TableCell>
                              <div className="font-medium">{claseSeleccionada.fecha}</div>
                              <div className="text-sm text-muted-foreground">{registro.hora}</div>
                            </TableCell>
                            <TableCell>{registro.tipo}</TableCell>
                            <TableCell className="text-green-600 font-medium">{registro.presentes}</TableCell>
                            <TableCell className="text-red-600 font-medium">{registro.ausentes}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => handleEditRegistro(registro)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild>
                    <Link href={`/dashboard/tomar-foto?materiaId=${id}`}>
                      <Camera className="mr-2 h-5 w-5" />
                      Tomar Foto para Asistencia
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )}

          {/* Modal para editar asistencia */}
          <Dialog open={mostrarDetalleRegistro} onOpenChange={setMostrarDetalleRegistro}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Asistencia del {claseSeleccionada?.fecha} - {registroSeleccionado?.hora}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Barra de búsqueda y filtros */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar alumno..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <Select value={ordenAlumnos} onValueChange={setOrdenAlumnos}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Ordenar por..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apellido-asc">
                        <div className="flex items-center">
                          <SortAsc className="mr-2 h-4 w-4" />
                          Apellido A-Z
                        </div>
                      </SelectItem>
                      <SelectItem value="apellido-desc">
                        <div className="flex items-center">
                          <SortDesc className="mr-2 h-4 w-4" />
                          Apellido Z-A
                        </div>
                      </SelectItem>
                      <SelectItem value="presentes-primero">Presentes primero</SelectItem>
                      <SelectItem value="ausentes-primero">Ausentes primero</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filtroAsistencia} onValueChange={setFiltroAsistencia}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filtrar por..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          Todos
                        </div>
                      </SelectItem>
                      <SelectItem value="presentes">Presentes</SelectItem>
                      <SelectItem value="ausentes">Ausentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista de alumnos */}
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alumno</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtrarYOrdenarAlumnos().map((alumno) => (
                        <TableRow key={alumno.id}>
                          <TableCell className="font-medium">{alumno.nombre}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={alumno.presente}
                                onCheckedChange={() => handleToggleAsistencia(alumno.id)}
                              />
                              <span>{alumno.presente ? "Presente" : "Ausente"}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveAsistencia}>Guardar Cambios</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Contenido de la pestaña Estadísticas */}
        <TabsContent value="estadisticas" className="space-y-4">
          {/* Tarjetas de estadísticas generales */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Asistencia Promedio</p>
                    <h3 className="text-2xl font-bold">{materia.asistenciaPromedio}%</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Clases</p>
                    <h3 className="text-2xl font-bold">{materia.totalClases}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Alumnos</p>
                    <h3 className="text-2xl font-bold">{materia.totalAlumnosInscriptos}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de estadísticas por alumno */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas por Alumno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar alumno..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <Select value={ordenAlumnos} onValueChange={setOrdenAlumnos}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Ordenar por..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apellido-asc">
                      <div className="flex items-center">
                        <SortAsc className="mr-2 h-4 w-4" />
                        Apellido A-Z
                      </div>
                    </SelectItem>
                    <SelectItem value="apellido-desc">
                      <div className="flex items-center">
                        <SortDesc className="mr-2 h-4 w-4" />
                        Apellido Z-A
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroAsistencia} onValueChange={setFiltroAsistencia}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filtrar por..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        Todos
                      </div>
                    </SelectItem>
                    <SelectItem value="presentes">Regulares</SelectItem>
                    <SelectItem value="ausentes">Libres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Asistencia</TableHead>
                    <TableHead>Faltas</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alumnosFaltas.map((alumno, index) => {
                    const estado = determinarEstadoAlumno(alumno.porcentajeAsistencia)
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{alumno.nombre}</TableCell>
                        <TableCell>{alumno.email}</TableCell>
                        <TableCell>{alumno.porcentajeAsistencia}%</TableCell>
                        <TableCell>{alumno.faltas}</TableCell>
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
        </TabsContent>

        {/* Contenido de la pestaña Configuración */}
        <TabsContent value="configuracion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Configuración de la Materia
              </CardTitle>
              <CardDescription>Personaliza las opciones para esta materia específica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notificaciones">Notificaciones de Asistencia</Label>
                  <div className="text-sm text-muted-foreground">
                    Recibe alertas sobre alumnos con problemas de asistencia
                  </div>
                </div>
                <Switch id="notificaciones" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="recordatorios">Recordatorios de Clase</Label>
                  <div className="text-sm text-muted-foreground">Recibe recordatorios antes de cada clase</div>
                </div>
                <Switch id="recordatorios" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="umbral">Umbral de Asistencia para Regularidad (%)</Label>
                <Select defaultValue="75">
                  <SelectTrigger id="umbral">
                    <SelectValue placeholder="Selecciona un umbral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60%</SelectItem>
                    <SelectItem value="65">65%</SelectItem>
                    <SelectItem value="70">70%</SelectItem>
                    <SelectItem value="75">75%</SelectItem>
                    <SelectItem value="80">80%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfiguracion}>Guardar Configuración</Button>
            </CardFooter>
          </Card>

          {/* Horarios de clase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Horarios de Clase
              </CardTitle>
              <CardDescription>Configura los horarios para esta materia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Agregar Nuevo Horario</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="dia-clase">Día</Label>
                    <Select
                      value={nuevoHorario.dia.toString()}
                      onValueChange={(value) => setNuevoHorario({ ...nuevoHorario, dia: Number.parseInt(value) })}
                    >
                      <SelectTrigger id="dia-clase">
                        <SelectValue placeholder="Selecciona un día" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Lunes</SelectItem>
                        <SelectItem value="2">Martes</SelectItem>
                        <SelectItem value="3">Miércoles</SelectItem>
                        <SelectItem value="4">Jueves</SelectItem>
                        <SelectItem value="5">Viernes</SelectItem>
                        <SelectItem value="6">Sábado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="hora-inicio">Hora de Inicio</Label>
                      <Input
                        id="hora-inicio"
                        type="time"
                        value={nuevoHorario.horaInicio}
                        onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaInicio: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hora-fin">Hora de Fin</Label>
                      <Input
                        id="hora-fin"
                        type="time"
                        value={nuevoHorario.horaFin}
                        onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaFin: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                    <Input
                      id="fecha-inicio"
                      type="date"
                      value={nuevoHorario.fechaInicio}
                      onChange={(e) => setNuevoHorario({ ...nuevoHorario, fechaInicio: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha-fin">Fecha de Fin</Label>
                    <Input
                      id="fecha-fin"
                      type="date"
                      value={nuevoHorario.fechaFin}
                      onChange={(e) => setNuevoHorario({ ...nuevoHorario, fechaFin: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddHorario}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Horario
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Horarios Actuales</h3>
                {horarios.length > 0 ? (
                  <div className="space-y-2">
                    {horarios.map((horario, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <span className="font-medium">{diasSemana[horario.dia]}</span>
                          <span className="text-muted-foreground ml-2">
                            {horario.horaInicio} - {horario.horaFin}
                          </span>
                          {(horario.fechaInicio || horario.fechaFin) && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {horario.fechaInicio &&
                                `Desde: ${new Date(horario.fechaInicio).toLocaleDateString("es-ES")}`}
                              {horario.fechaInicio && horario.fechaFin && " - "}
                              {horario.fechaFin && `Hasta: ${new Date(horario.fechaFin).toLocaleDateString("es-ES")}`}
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveHorario(index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md bg-muted/50">
                    <p className="text-muted-foreground">No hay horarios configurados.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Excepciones de asistencia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Excepciones de Asistencia
              </CardTitle>
              <CardDescription>Configura excepciones para alumnos específicos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Agregar Nueva Excepción</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="alumno-excepcion">Alumno</Label>
                    <Select
                      value={nuevaExcepcion.alumno}
                      onValueChange={(value) => setNuevaExcepcion({ ...nuevaExcepcion, alumno: value })}
                    >
                      <SelectTrigger id="alumno-excepcion">
                        <SelectValue placeholder="Selecciona un alumno" />
                      </SelectTrigger>
                      <SelectContent>
                        {alumnos.map((alumno, index) => (
                          <SelectItem key={index} value={alumno.nombre}>
                            {alumno.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dia-excepcion">Día</Label>
                      <Select
                        value={nuevaExcepcion.dia.toString()}
                        onValueChange={(value) => setNuevaExcepcion({ ...nuevaExcepcion, dia: Number.parseInt(value) })}
                      >
                        <SelectTrigger id="dia-excepcion">
                          <SelectValue placeholder="Selecciona un día" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Lunes</SelectItem>
                          <SelectItem value="2">Martes</SelectItem>
                          <SelectItem value="3">Miércoles</SelectItem>
                          <SelectItem value="4">Jueves</SelectItem>
                          <SelectItem value="5">Viernes</SelectItem>
                          <SelectItem value="6">Sábado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hora-inicio-excepcion">Hora de Inicio</Label>
                      <Input
                        id="hora-inicio-excepcion"
                        type="time"
                        value={nuevaExcepcion.horaInicio}
                        onChange={(e) => setNuevaExcepcion({ ...nuevaExcepcion, horaInicio: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hora-fin-excepcion">Hora de Fin</Label>
                      <Input
                        id="hora-fin-excepcion"
                        type="time"
                        value={nuevaExcepcion.horaFin}
                        onChange={(e) => setNuevaExcepcion({ ...nuevaExcepcion, horaFin: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivo-excepcion">Motivo</Label>
                    <Input
                      id="motivo-excepcion"
                      placeholder="Ej: Superposición con otra materia"
                      value={nuevaExcepcion.motivo}
                      onChange={(e) => setNuevaExcepcion({ ...nuevaExcepcion, motivo: e.target.value })}
                    />
                  </div>
                </div>
                <Button className="mt-4" onClick={handleAddExcepcion}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Excepción
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Excepciones Actuales</h3>
                {excepciones.length > 0 ? (
                  <div className="space-y-2">
                    {excepciones.map((excepcion, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{excepcion.alumno}</div>
                            <div className="text-sm text-muted-foreground">
                              {diasSemana[excepcion.dia]}: {excepcion.horaInicio} - {excepcion.horaFin}
                            </div>
                            <div className="text-sm mt-1">Motivo: {excepcion.motivo}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveExcepcion(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md bg-muted/50">
                    <p className="text-muted-foreground">No hay excepciones configuradas.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido de la pestaña Gestión */}
        <TabsContent value="gestion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Gestión de Profesores
              </CardTitle>
              <CardDescription>Administra los profesores asociados a esta materia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Agregar Nuevo Profesor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre-profesor">Nombre</Label>
                    <Input
                      id="nombre-profesor"
                      placeholder="Nombre completo"
                      value={nuevoProfesor.nombre}
                      onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, nombre: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-profesor">Email</Label>
                    <Input
                      id="email-profesor"
                      type="email"
                      placeholder="correo@universidad.edu"
                      value={nuevoProfesor.email}
                      onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, email: e.target.value })}
                    />
                  </div>
                </div>
                <Button className="mt-4" onClick={handleAddProfesor}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Agregar Profesor
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Profesores Actuales</h3>
                {profesores.length > 0 ? (
                  <div className="space-y-2">
                    {profesores.map((profesor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">{profesor.nombre}</div>
                          <div className="text-sm text-muted-foreground">{profesor.email}</div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveProfesor(index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md bg-muted/50">
                    <p className="text-muted-foreground">No hay profesores asociados a esta materia.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Gestión de Alumnos
              </CardTitle>
              <CardDescription>Administra los alumnos asociados a esta materia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">Agregar Nuevo Alumno</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre-alumno">Nombre</Label>
                    <Input
                      id="nombre-alumno"
                      placeholder="Apellido, Nombre"
                      value={nuevoAlumno.nombre}
                      onChange={(e) => setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-alumno">Email</Label>
                    <Input
                      id="email-alumno"
                      type="email"
                      placeholder="alumno@ejemplo.com"
                      value={nuevoAlumno.email}
                      onChange={(e) => setNuevoAlumno({ ...nuevoAlumno, email: e.target.value })}
                    />
                  </div>
                </div>
                <Button className="mt-4" onClick={handleAddAlumno}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Agregar Alumno
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Alumnos Actuales</h3>
                {alumnos.length > 0 ? (
                  <div className="space-y-2">
                    {alumnos.map((alumno, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">{alumno.nombre}</div>
                          <div className="text-sm text-muted-foreground">{alumno.email}</div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveAlumno(index)}>
                          <UserMinus className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md bg-muted/50">
                    <p className="text-muted-foreground">No hay alumnos asociados a esta materia.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
