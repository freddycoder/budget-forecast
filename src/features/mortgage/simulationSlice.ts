import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SimulationState } from './type/SimulationState';

const infoInLocalstorage = localStorage.getItem('simulation');

let initialState: SimulationState = {
  costOfProperty: 0,
  cashDown: 0,
  cashDownPercentage: 0,
  interestRate: 0,
  term: 0,
  paymentAmount: 0,
  paymentTable: []
};

if (infoInLocalstorage) {
  initialState = JSON.parse(infoInLocalstorage);
}

const updatePaymentAmout = (state: SimulationState) => {
  state.paymentTable = [];

  let balance = state.costOfProperty - state.cashDown;
  
  const tauxHypothecaire = state.interestRate / 100;
  const interestRate = tauxHypothecaire / 12;
  const totalNumberOfPayment = 12 * state.term;

  let interest = interestRate * balance;

  const num = ((balance * tauxHypothecaire) / 12);
  const den = 1 - Math.pow(1 + tauxHypothecaire / 12, - totalNumberOfPayment);
  state.paymentAmount = num / den   
  
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
