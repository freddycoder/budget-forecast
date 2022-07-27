import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { SimulationState } from './type/SimulationState';
import { SimulationStep } from './type/SimulationStep';

const infoInLocalstorage = localStorage.getItem('simulation');

let initialState: SimulationState = {
  costOfProperty: 0,
  cashDown: 0,
  cashDownPercentage: 0,
  interestRate: 0,
  term: 0,
  paymentAmount: 0,
  paymentTable: [],

  initialValue: 0,
  income: 0,
  expenses: 0,
  simulationTable: []
};

if (infoInLocalstorage) {
  initialState = JSON.parse(infoInLocalstorage);

  if (initialState.initialValue === undefined) {
    initialState.initialValue = 0;
  }
  if (initialState.income === undefined) {
    initialState.income = 0;
  }
  if (initialState.expenses === undefined) {
    initialState.expenses = 0;
  }
  if (initialState.simulationTable === undefined) {
    initialState.simulationTable = [];
  }
  initialState.simulationTable = generateSimulation(initialState);
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

function generateSimulation(state: SimulationState): SimulationStep[] {
  const simulationTable: SimulationStep[] = [];
  const nbMount = 300;

  for (let i = 0; i < nbMount; i++) {
    let previousValue = 0;
    if (i == 0) {
      previousValue = state.initialValue;
    }
    else {
      previousValue = simulationTable[i - 1].solde;
    }

    let mortgagePayment = 0;
    if (state.paymentTable.length > i) {
      mortgagePayment = state.paymentTable[i].paymentAmount;
    }

    const diff = state.income - state.expenses - mortgagePayment

    simulationTable.push({
      mount: i + 1,
      income: state.income,
      expenses: state.expenses,
      mortgagePayment: mortgagePayment,
      diff: diff,
      solde: previousValue + diff
    })
  }

  return simulationTable;
}


export const simulationSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    setCostOfProperty: (state: SimulationState, action: PayloadAction<number>) => {
      state.costOfProperty = action.payload;
      state.paymentAmount = updatePaymentAmout(state);
      state.simulationTable = generateSimulation(state)
    },
    setCashdown: (state: SimulationState, action: PayloadAction<number>) => {
      state.cashDown = action.payload;
      state.cashDownPercentage = state.cashDown / state.costOfProperty * 100;
      state.paymentAmount = updatePaymentAmout(state);
      state.simulationTable = generateSimulation(state)
    },
    setCashdownPercentage: (state: SimulationState, action: PayloadAction<number>) => {
      state.cashDownPercentage = action.payload;
      state.cashDown = state.costOfProperty * state.cashDownPercentage / 100;
      state.paymentAmount = updatePaymentAmout(state);
      state.simulationTable = generateSimulation(state)
    },
    setInterestRate: (state: SimulationState, action: PayloadAction<number>) => {
      state.interestRate = action.payload;
      state.paymentAmount = updatePaymentAmout(state);
      state.simulationTable = generateSimulation(state)
    },
    setTerm: (state: SimulationState, action: PayloadAction<number>) => {
      state.term = action.payload;
      state.paymentAmount = updatePaymentAmout(state);
      state.simulationTable = generateSimulation(state)
    },
    setInitialValue: (state: SimulationState, action: PayloadAction<number>) => {
      state.initialValue = action.payload;
      state.simulationTable = generateSimulation(state)
    },
    setIncome: (state: SimulationState, action: PayloadAction<number>) => {
      state.income = action.payload;
      state.simulationTable = generateSimulation(state)
    },
    setOutcome: (state: SimulationState, action: PayloadAction<number>) => {
      state.expenses = action.payload;
      state.simulationTable = generateSimulation(state)
    }
  },
});

export const {
  setCostOfProperty,
  setCashdown,
  setCashdownPercentage,
  setInterestRate,
  setTerm,
  setInitialValue,
  setIncome,
  setOutcome } = simulationSlice.actions;

export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
