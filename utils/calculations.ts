import type { Investment } from "../app/investments/columns"

// CO2-Reduktionsfaktoren (Tonnen CO2 pro 1000 € Investition pro Jahr)
const CO2_REDUCTION_FACTORS = {
  renewable_energy: 0.5,
  infrastructure: 0.3,
  it_systems: 0.1,
}

// ROI-Faktoren (jährliche Rendite in %)
const ROI_FACTORS = {
  renewable_energy: 0.08,
  infrastructure: 0.06,
  it_systems: 0.12,
}

// Nachhaltigkeitsfaktoren
const SUSTAINABILITY_FACTORS = {
  renewable_energy: 1.5,
  infrastructure: 1.2,
  it_systems: 1.0,
}

export function calculateCO2Reduction(investment: Investment): number {
  const factor = CO2_REDUCTION_FACTORS[investment.type as keyof typeof CO2_REDUCTION_FACTORS] || 0
  return factor * (investment.amount / 1000) * investment.duration
}

export function calculateROI(investment: Investment): number {
  const factor = ROI_FACTORS[investment.type as keyof typeof ROI_FACTORS] || 0
  return (Math.pow(1 + factor, investment.duration) - 1) * 100
}

export function calculateSustainabilityScore(investment: Investment): number {
  const co2Reduction = calculateCO2Reduction(investment)
  const roi = calculateROI(investment)
  const factor = SUSTAINABILITY_FACTORS[investment.type as keyof typeof SUSTAINABILITY_FACTORS] || 1

  // Gewichtung: 50% CO2-Reduktion, 30% ROI, 20% Investitionstyp
  const score = (co2Reduction * 0.5 + roi * 0.3) * factor
  return Math.min(Math.round(score), 100) // Maximaler Score ist 100
}

export function calculateOverallSustainabilityScore(investments: Investment[]): number {
  if (investments.length === 0) return 0
  const totalScore = investments.reduce((sum, inv) => sum + calculateSustainabilityScore(inv), 0)
  return Math.round(totalScore / investments.length)
}

export function calculateTotalInvestment(investments: Investment[]): number {
  return investments.reduce((sum, inv) => sum + inv.amount, 0)
}

export function calculateTotalCO2Reduction(investments: Investment[]): number {
  return investments.reduce((sum, inv) => sum + calculateCO2Reduction(inv), 0)
}

export function calculateAverageROI(investments: Investment[]): number {
  if (investments.length === 0) return 0
  const totalROI = investments.reduce((sum, inv) => sum + calculateROI(inv), 0)
  return totalROI / investments.length
}

