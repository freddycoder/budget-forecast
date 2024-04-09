import { AdditionnalIncome } from "./AdditionnalIncome"
import { AdditionnalOutcome } from "./AdditionnalOutcome"
import { PaymentInfo } from "./PaiementInfo"
import { SimulationStep } from "./SimulationStep"

export interface SimulationState {
  // Mortgage information
  costOfProperty: number
  actualMortgageAmount: number
  cashDown: number
  cashDownPercentage: number
  interestRate: number
  term: number
  paymentAmount: number
  insuranceSCHL: number
  paymentTable: Array<PaymentInfo>

  totalCapital: number
  totalInterest: number

  // income information
  initialValue: number
  income: number
  aditionnalIncomes: Array<AdditionnalIncome>

  // expenses information
  expenses: number
  houseInsurance: number
  houseInsuranceTaxes: number
  municipalTaxes: number
  scollarTaxes: number
  energyCost: number
  aditionnalOutcome: Array<AdditionnalOutcome>

  // final information
  simulationTable: Array<SimulationStep>

  beginingDate: Date
}