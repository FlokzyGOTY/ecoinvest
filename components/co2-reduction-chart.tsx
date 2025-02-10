"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function CO2ReductionChart({ data = [] }: { data?: any[] }) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] border rounded-lg">
        <div className="text-center">
          <p className="text-muted-foreground">Keine CO₂-Reduktionsdaten verfügbar</p>
          <p className="text-sm text-muted-foreground mt-1">
            Fügen Sie Investitionen hinzu, um die CO₂-Reduktion zu verfolgen
          </p>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="reduction" stroke="#2563eb" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

