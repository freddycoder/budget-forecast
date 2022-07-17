import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SimulationState {
  costOfProperty: number
  cashDown: number
  cashDownPercentage: number
  interestRate: number
  term: number
  paymentFrequency: "mountly" | "bi-monthly" | "two-week" | "hebdomadaly"
  paymentAmount: number,
  paymentTable: Array<PaymentInfo>
}

interface PaymentInfo {
  payment: number
  paymentAmount: number
  interest: number
  principal: number
  balance: number
}

const initialState: SimulationState = {
  costOfProperty: 0,
  cashDown: 0,
  cashDownPercentage: 0,
  interestRate: 0,
  term: 0,
  paymentFrequency: "mountly",
  paymentAmount: 0,
  paymentTable: []
};

const updatePaymentAmout = (state: SimulationState) => {
  state.paymentTable = [];

  let balance = state.costOfProperty - state.cashDown;
  
  const interestRate = state.interestRate / 100 / 12;
  const totalNumberOfPayment = 12 * state.term;

  let interest = interestRate * balance;

  state.paymentAmount = interest + balance / totalNumberOfPayment;
  
  for (var i = 0; i < totalNumberOfPayment; i++) {
    if (i > 0) {
      balance = state.paymentTable[i - 1].balance;
    }

    interest = interestRate * balance;

    state.paymentTable.push({
      payment: i + 1,
      interest: interest,
      principal: state.paymentAmount - interest,
      balance: balance - state.paymentAmount + interest,
      paymentAmount: state.paymentAmount
    })

    if (state.paymentTable[i].balance <= 0) {
      break;
    }
  }

  return state.paymentAmount
}

export const simulationSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    setCostOfProperty: (state: SimulationState, action: PayloadAction<number>) => {
      state.costOfProperty = action.payload;
      state.paymentAmount = updatePaymentAmout(state);
    },
    setCashdown: (state: SimulationState, action: PayloadAction<number>) => {
      state.cashDown = action.payload;
      state.cashDownPercentage = state.cashDown / state.costOfProperty * 100;
      state.paymentAmount = updatePaymentAmout(state);
    },
    setCashdownPercentage: (state: SimulationState, action: PayloadAction<number>) => {
      state.cashDownPercentage = action.payload;
      state.cashDown = state.costOfProperty * state.cashDownPercentage / 100;
      state.paymentAmount = updatePaymentAmout(state);
    },
    setInterestRate: (state: SimulationState, action: PayloadAction<number>) => {
      state.interestRate = action.payload;
      state.paymentAmount = updatePaymentAmout(state);
    },
    setTerm: (state: SimulationState, action: PayloadAction<number>) => {
      state.term = action.payload;
      state.paymentAmount = updatePaymentAmout(state);
    }
  },
});

export const { 
  setCostOfProperty, 
  setCashdown,
  setCashdownPercentage,
  setInterestRate,
  setTerm } = simulationSlice.actions;

export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
