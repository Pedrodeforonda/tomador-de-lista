"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, User, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
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
            <h2 className="font-semibold flex items-center mb-4">
              <BookOpen className="mr-2 h-4 w-4" />
              Mis Materias
            </h2>
            <nav className="grid gap-1">
              <Link href="/dashboard/materia/1" className="text-sm rounded-md px-3 py-2 hover:bg-muted">
                Introducción a la Ingeniería / Com A
              </Link>
              <Link href="/dashboard/materia/2" className="text-sm rounded-md px-3 py-2 hover:bg-muted">
                Matemática I / Com B
              </Link>
              <Link href="/dashboard/materia/3" className="text-sm rounded-md px-3 py-2 hover:bg-muted">
                Programación / Com C
              </Link>
              <Link href="/dashboard/materia/4" className="text-sm rounded-md px-3 py-2 hover:bg-muted">
                Física I / Com A
              </Link>
              <Link href="/dashboard/materia/5" className="text-sm rounded-md px-3 py-2 hover:bg-muted">
                Química General / Com B
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
