import { PaymentInfo } from "./PaiementInfo"

export interface SimulationState {
  costOfProperty: number
  cashDown: number
  cashDownPercentage: number
  interestRate: number
  term: number
  paymentAmount: number,
  paymentTable: Array<PaymentInfo>
}