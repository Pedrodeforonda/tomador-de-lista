"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, RefreshCw, Download, Check, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function TomarFoto() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const materiaId = searchParams.get("materiaId") || "1"

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      // Limpiar el stream cuando el componente se desmonte
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const iniciarCamara = async () => {
    setLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setStreaming(true)
        setCapturedImage(null)
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err)
      toast({
        title: "Error",
        description: "No se pudo acceder a la cámara. Por favor, verifica los permisos.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const capturarFoto = () => {
    if (videoRef.current && canvasRef.current && streaming) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Configurar el tamaño del canvas para que coincida con el video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Dibujar el frame actual del video en el canvas
      const context = canvas.getContext("2d")
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Obtener la imagen como data URL
        const dataUrl = canvas.toDataURL("image/png")
        setCapturedImage(dataUrl)

        // Detener la cámara
        const stream = video.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        setStreaming(false)

        toast({
          title: "Foto capturada",
          description: "La foto ha sido capturada correctamente.",
        })
      }
    }
  }

  const descargarFoto = () => {
    if (capturedImage) {
      const link = document.createElement("a")
      link.href = capturedImage
      link.download = `foto-materia-${materiaId}-${new Date().toISOString().slice(0, 10)}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Foto descargada",
        description: "La foto ha sido descargada correctamente.",
      })
    }
  }

  const guardarYVolver = () => {
    if (capturedImage) {
      toast({
        title: "Asistencia registrada",
        description: "La asistencia ha sido registrada correctamente mediante foto.",
      })

      // Redirigir de vuelta a la materia después de un breve delay
      setTimeout(() => {
        router.push(`/dashboard/materia/${materiaId}`)
      }, 1500)
    }
  }

  const volverAMateria = () => {
    router.push(`/dashboard/materia/${materiaId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tomar Foto</h1>
        <Button variant="outline" size="sm" onClick={volverAMateria}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la materia
        </Button>
      </div>
      <p className="text-muted-foreground">Captura una foto para registrar asistencia</p>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            Capturar Imagen
          </CardTitle>
          <CardDescription>Toma una foto de la clase para registrar la asistencia</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-muted">
            {streaming ? (
              <video ref={videoRef} className="w-full h-auto" style={{ display: streaming ? "block" : "none" }}></video>
            ) : capturedImage ? (
              <img src={capturedImage || "/placeholder.svg"} alt="Foto capturada" className="w-full h-auto" />
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Haga clic en "Iniciar Cámara" para comenzar</p>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-center">
          {!streaming && !capturedImage && (
            <Button onClick={iniciarCamara} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Iniciar Cámara
                </>
              )}
            </Button>
          )}

          {streaming && (
            <Button onClick={capturarFoto}>
              <Camera className="mr-2 h-4 w-4" />
              Capturar
            </Button>
          )}

          {capturedImage && (
            <>
              <Button variant="outline" onClick={iniciarCamara}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Volver a Tomar
              </Button>

              <Button variant="outline" onClick={descargarFoto}>
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>

              <Button onClick={guardarYVolver}>
                <Check className="mr-2 h-4 w-4" />
                Guardar y Volver
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}
