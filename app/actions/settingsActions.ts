"use server"

import fs from "fs/promises"
import path from "path"

interface Settings {
  name: string
  email: string
  company: string
}

export async function updateSettings(settings: Settings) {
  const filePath = path.join(process.cwd(), "public", "data", "settings.json")

  try {
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2))
    return { success: true, message: "Einstellungen erfolgreich aktualisiert" }
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Einstellungen:", error)
    return { success: false, message: "Fehler beim Aktualisieren der Einstellungen" }
  }
}

export async function getSettings(): Promise<Settings> {
  const filePath = path.join(process.cwd(), "public", "data", "settings.json")

  try {
    const fileContent = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Fehler beim Abrufen der Einstellungen:", error)
    return { name: "", email: "", company: "" }
  }
}

