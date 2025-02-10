"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { CO2ReductionChart } from "@/components/co2-reduction-chart"
import { RecentInvestments } from "@/components/recent-investments"
import { ROIByInvestmentTypeChart } from "@/components/ROIByInvestmentTypeChart"
import { SustainabilityTrendChart } from "@/components/SustainabilityTrendChart"
import { InvestmentDistributionChart } from "@/components/InvestmentDistributionChart"
import { getInvestments } from "@/app/actions/investmentActions"
import { getSettings } from "@/app/actions/settingsActions"
import type { Investment } from "@/app/investments/columns"
import {
  calculateOverallSustainabilityScore,
  calculateTotalInvestment,
  calculateTotalCO2Reduction,
  calculateAverageROI,
  calculateCO2Reduction,
  calculateROI,
  calculateSustainabilityScore,
} from "@/utils/calculations"
import { EuroIcon, ScaleIcon, TrendingUpIcon, LeafIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function Dashboard() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [settings, setSettings] = useState({ name: "", email: "", company: "" })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const investmentsData = await getInvestments()
      const settingsData = await getSettings()
      setInvestments(investmentsData)
      setSettings(settingsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="container mx-auto p-6">Laden...</div>
  }

  const totalInvestment = calculateTotalInvestment(investments)
  const totalCO2Reduction = calculateTotalCO2Reduction(investments)
  const averageROI = calculateAverageROI(investments)
  const sustainabilityScore = calculateOverallSustainabilityScore(investments)

  // Prepare data for Overview chart
  const overviewData = investments.map((inv) => ({
    name: inv.name,
    investments: inv.amount,
    co2Reduction: calculateCO2Reduction(inv),
  }))

  // Prepare data for CO2 Reduction chart
  const co2ReductionData = investments.map((inv) => ({
    month: new Date(inv.createdAt).toLocaleString("default", { month: "short" }),
    reduction: calculateCO2Reduction(inv),
  }))

  // Prepare data for ROI by Investment Type chart
  const roiByTypeData = Object.entries(
    investments.reduce(
      (acc, inv) => {
        acc[inv.type] = (acc[inv.type] || 0) + calculateROI(inv)
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value: value / investments.filter((i) => i.type === name).length }))

  // Prepare data for Sustainability Trend chart
  const sustainabilityTrendData = investments
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((inv) => ({
      date: new Date(inv.createdAt).toLocaleDateString(),
      score: calculateSustainabilityScore(inv),
    }))

  // Prepare data for Investment Distribution chart
  const investmentDistributionData = Object.entries(
    investments.reduce(
      (acc, inv) => {
        acc[inv.type] = (acc[inv.type] || 0) + inv.amount
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value }))

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Betrag (€)",
      "Typ",
      "Dauer (Jahre)",
      "Erstellungsdatum",
      "CO2-Reduktion (Tonnen)",
      "ROI (%)",
      "Nachhaltigkeits-Score",
    ]

    const csvData = investments.map((inv) => [
      inv.id,
      inv.name,
      inv.amount.toLocaleString("de-DE"),
      inv.type,
      inv.duration,
      new Date(inv.createdAt).toLocaleDateString("de-DE"),
      calculateCO2Reduction(inv).toFixed(2),
      calculateROI(inv).toFixed(2),
      calculateSustainabilityScore(inv),
    ])

    const csvContent = [headers.join(";"), ...csvData.map((row) => row.join(";"))].join("\n")

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `nachhaltigkeits_investitionen_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={exportToCSV} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Daten exportieren</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="analytics">Analysen</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gesamtinvestition</CardTitle>
                <EuroIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInvestment.toLocaleString()} €</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO₂-Reduktion</CardTitle>
                <ScaleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCO2Reduction.toFixed(2)} Tonnen</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Durchschnittlicher ROI</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageROI.toFixed(2)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nachhaltigkeits-Score</CardTitle>
                <LeafIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sustainabilityScore}/100</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Übersicht</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={overviewData} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>CO₂-Reduktion</CardTitle>
              </CardHeader>
              <CardContent>
                <CO2ReductionChart data={co2ReductionData} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Letzte Investitionen</CardTitle>
              <CardDescription>
                {investments.length > 0
                  ? `Sie haben ${investments.length} Investitionen getätigt.`
                  : "Sie haben noch keine Investitionen getätigt."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentInvestments investments={investments} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>ROI nach Investitionstyp</CardTitle>
                <CardDescription>Durchschnittlicher ROI pro Investitionstyp</CardDescription>
              </CardHeader>
              <CardContent>
                {investments.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">Keine Daten verfügbar</p>
                  </div>
                ) : (
                  <ROIByInvestmentTypeChart data={roiByTypeData} />
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Nachhaltigkeits-Trends</CardTitle>
                <CardDescription>Entwicklung des Nachhaltigkeits-Scores über Zeit</CardDescription>
              </CardHeader>
              <CardContent>
                {investments.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">Keine Daten verfügbar</p>
                  </div>
                ) : (
                  <SustainabilityTrendChart data={sustainabilityTrendData} />
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Investitionsverteilung</CardTitle>
                <CardDescription>Verteilung nach Investitionstypen</CardDescription>
              </CardHeader>
              <CardContent>
                {investments.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground">Keine Daten verfügbar</p>
                  </div>
                ) : (
                  <InvestmentDistributionChart data={investmentDistributionData} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

