"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { getInvestments, deleteInvestment } from "../actions/investmentActions"
import { toast } from "@/components/ui/use-toast"

export default function Investments() {
  const [investments, setInvestments] = useState([])

  useEffect(() => {
    fetchInvestments()
  }, [])

  const fetchInvestments = async () => {
    const data = await getInvestments()
    setInvestments(data)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteInvestment(id)
      toast({
        title: "Investition gelöscht",
        description: "Die Investition wurde erfolgreich gelöscht.",
      })
      fetchInvestments()
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es gab einen Fehler beim Löschen der Investition.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Investitionen</h1>
        <Link href="/new-investment">
          <Button>Neue Investition</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={investments} onDelete={handleDelete} />
    </div>
  )
}

