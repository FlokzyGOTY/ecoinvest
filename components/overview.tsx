"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

export function Overview({ data = [] }: { data?: any[] }) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] border rounded-lg">
        <div className="text-center">
          <p className="text-muted-foreground">Keine Daten verfügbar</p>
          <p className="text-sm text-muted-foreground mt-1">Fügen Sie Investitionen hinzu, um die Übersicht zu sehen</p>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="investments" fill="#adfa1d" radius={[4, 4, 0, 0]} name="Investitionen (€)" />
        <Bar dataKey="co2Reduction" fill="#2563eb" radius={[4, 4, 0, 0]} name="CO₂-Reduktion (kg)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

