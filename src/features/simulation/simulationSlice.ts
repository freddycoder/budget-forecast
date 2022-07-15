import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SimulationState {
  costOfProperty: number
  cashDown: number
  cashDownPercentage: number
  interestRate: number
  term: number
  paymentFrequency: "mountly" | "bi-monthly" | "two-week" | "hebdomadaly"
  paymentAmount: number
}

const initialState: SimulationState = {
  costOfProperty: 0,
  cashDown: 0,
  cashDownPercentage: 0,
  interestRate: 0,
  term: 0,
  paymentFrequency: "mountly",
  paymentAmount: 0,
};

const compoundInterest = (state: SimulationState) => {
  return (state.costOfProperty - state.cashDown) * (1 + state.interestRate / 100) ** state.term;
}

const updatePaymentAmout = (state: SimulationState) => {
  return ((state.costOfProperty - state.cashDown) / state.term / 12) + compoundInterest(state);
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
