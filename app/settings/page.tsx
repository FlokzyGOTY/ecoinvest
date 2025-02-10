"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { updateSettings } from "../actions/settingsActions"

export default function SettingsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateSettings({ name, email, company })
      toast({
        title: "Einstellungen aktualisiert",
        description: "Ihre Einstellungen wurden erfolgreich gespeichert.",
      })
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es gab einen Fehler beim Speichern der Einstellungen.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Einstellungen</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ihr Name" />
        </div>
        <div>
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ihre.email@beispiel.de"
          />
        </div>
        <div>
          <Label htmlFor="company">Unternehmen</Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Ihr Unternehmen"
          />
        </div>
        <Button type="submit">Einstellungen speichern</Button>
      </form>
    </div>
  )
}

