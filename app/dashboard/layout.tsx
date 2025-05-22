"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LogOut, User, BookOpen, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/login")
  }

  // Función para verificar si un enlace está activo
  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    if (path !== "/dashboard" && pathname.startsWith(path)) {
      return true
    }
    return false
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex w-full h-16 items-center px-4 md:px-6">
          <Link href="/dashboard" className="font-bold mr-auto">
            Plataforma Educativa
          </Link>
          <div className="flex items-center gap-4 ml-auto">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/perfil">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40 hidden md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1">
              <Link
                href="/dashboard"
                className={`flex items-center text-sm rounded-md px-3 py-2 hover:bg-muted ${isActive("/dashboard") && pathname === "/dashboard" ? "bg-muted font-medium" : ""}`}
              >
                <Home className="mr-2 h-4 w-4" />
                Inicio
              </Link>

              <div className="mt-6 mb-2">
                <h3 className="px-3 text-xs font-medium text-muted-foreground">Mis Materias</h3>
              </div>

              <Link
                href="/dashboard/materia/1"
                className={`flex items-center text-sm rounded-md px-3 py-2 hover:bg-muted ${isActive("/dashboard/materia/1") ? "bg-muted font-medium" : ""}`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Introducción a la Ingeniería
              </Link>

              <Link
                href="/dashboard/materia/2"
                className={`flex items-center text-sm rounded-md px-3 py-2 hover:bg-muted ${isActive("/dashboard/materia/2") ? "bg-muted font-medium" : ""}`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Matemática I
              </Link>

              <Link
                href="/dashboard/materia/3"
                className={`flex items-center text-sm rounded-md px-3 py-2 hover:bg-muted ${isActive("/dashboard/materia/3") ? "bg-muted font-medium" : ""}`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Programación
              </Link>

              <Link
                href="/dashboard/materia/4"
                className={`flex items-center text-sm rounded-md px-3 py-2 hover:bg-muted ${isActive("/dashboard/materia/4") ? "bg-muted font-medium" : ""}`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Física I
              </Link>

              <Link
                href="/dashboard/materia/5"
                className={`flex items-center text-sm rounded-md px-3 py-2 hover:bg-muted ${isActive("/dashboard/materia/5") ? "bg-muted font-medium" : ""}`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Química General
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
