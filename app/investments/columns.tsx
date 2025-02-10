"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type Investment = {
  id: string
  name: string
  amount: number
  type: string
  duration: number
  createdAt: string
}

export const columns: ColumnDef<Investment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Betrag (€)",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Art",
  },
  {
    accessorKey: "duration",
    header: "Dauer (Jahre)",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const investment = row.original
      return (
        <div className="flex space-x-2">
          <Link href={`/edit-investment/${investment.id}`}>
            <Button variant="outline" size="sm">
              Bearbeiten
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={() => row.onDelete(investment.id)}>
            Löschen
          </Button>
        </div>
      )
    },
  },
]

