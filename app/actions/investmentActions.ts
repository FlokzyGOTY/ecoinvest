"use server"

import fs from "fs/promises"
import path from "path"
import os from "os"
import { v4 as uuidv4 } from "uuid"

interface Investment {
  id: string
  name: string
  amount: number
  type: string
  duration: number
}

const tmpDir = os.tmpdir()
const investmentsPath = path.join(tmpDir, "investments.json")
const notificationsPath = path.join(tmpDir, "notifications.json")

async function readJSONFile<T>(filePath: string): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    if (error.code === "ENOENT") {
      return [] as unknown as T
    }
    throw error
  }
}

async function writeJSONFile<T>(filePath: string, data: T): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function addInvestment(investment: Omit<Investment, "id">) {
  try {
    const investments = await readJSONFile<Investment[]>(investmentsPath)
    const newInvestment = { ...investment, id: uuidv4() }
    investments.push(newInvestment)
    await writeJSONFile(investmentsPath, investments)

    const notifications = await readJSONFile<string[]>(notificationsPath)
    notifications.unshift(`Neue Investition: ${newInvestment.name} (${newInvestment.amount} €)`)
    await writeJSONFile(notificationsPath, notifications.slice(0, 5))

    return { success: true, message: "Investition erfolgreich hinzugefügt" }
  } catch (error) {
    console.error("Fehler beim Hinzufügen der Investition:", error)
    return { success: false, message: "Fehler beim Hinzufügen der Investition: " + error.message }
  }
}

export async function getInvestments(): Promise<Investment[]> {
  try {
    return await readJSONFile<Investment[]>(investmentsPath)
  } catch (error) {
    console.error("Fehler beim Abrufen der Investitionen:", error)
    return []
  }
}

export async function getNotifications(): Promise<string[]> {
  try {
    return await readJSONFile<string[]>(notificationsPath)
  } catch (error) {
    console.error("Fehler beim Abrufen der Benachrichtigungen:", error)
    return []
  }
}

export async function clearNotifications() {
  try {
    await writeJSONFile(notificationsPath, [])
    return { success: true, message: "Benachrichtigungen erfolgreich gelöscht" }
  } catch (error) {
    console.error("Fehler beim Löschen der Benachrichtigungen:", error)
    return { success: false, message: "Fehler beim Löschen der Benachrichtigungen" }
  }
}

