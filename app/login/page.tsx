"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin") {
      login()
      router.push("/")
    } else {
      toast({
        title: "Login fehlgeschlagen",
        description: "Falsches Passwort. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Anmelden
          </Button>
        </form>
      </div>
    </div>
  )
}

