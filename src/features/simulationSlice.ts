import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { SimulationState } from './type/SimulationState';
import { generateSimulation, CalculateSCHL, updateMortgagePaymentAmount } from './simulationFunctions';

const infoInLocalstorage = localStorage.getItem('simulation');

let initialState: SimulationState = {
  costOfProperty: 0,
  actualMortgageAmount: 0,
  cashDown: 0,
  cashDownPercentage: 0,
  interestRate: 0,
  term: 0,
  paymentAmount: 0,
  insuranceSCHL: 0,
  paymentTable: [],

  totalCapital: 0,
  totalInterest: 0,

  initialValue: 0,
  income: 0,
  aditionnalIncomes: [],
  expenses: 0,
  houseInsurance: 0,
  houseInsuranceTaxes: 0,
  municipalTaxes: 0,
  scollarTaxes: 0,
  energyCost: 0,
  aditionnalOutcome: [],
  simulationTable: [],

  beginingDate: new Date()
};

if (infoInLocalstorage) {
  initialState = JSON.parse(infoInLocalstorage);

  initialState.actualMortgageAmount ??= 0;
  initialState.initialValue ??= 0;
  initialState.income ??= 0;
  initialState.expenses ??= 0;
  initialState.simulationTable ??= [];
  initialState.insuranceSCHL ??= 0;
  initialState.houseInsurance ??= 0;
  initialState.houseInsuranceTaxes ??= 0;
  initialState.municipalTaxes ??= 0;
  initialState.scollarTaxes ??= 0;
  initialState.energyCost ??= 0;
  initialState.aditionnalIncomes ??= [];
  initialState.aditionnalOutcome ??= [];
  initialState.insuranceSCHL = CalculateSCHL(initialState);
  initialState.simulationTable = generateSimulation(initialState);
}

export interface SetCostOfPropertyProps {
  costOfProperty: number;
  percentLock: boolean;
}

export interface SetActualMortageAmountProps {
  actualMortgageAmount: number;
  actualMortageIsLock: boolean;
}

export const simulationSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    setCostOfProperty: (state: SimulationState, action: PayloadAction<SetCostOfPropertyProps>) => {
      state.costOfProperty = action.payload.costOfProperty;
      state.actualMortgageAmount = 0;
      if (action.payload.percentLock) {
        state.cashDown = state.costOfProperty * state.cashDownPercentage / 100;
      }
      else {
        state.cashDownPercentage = state.cashDown / state.costOfProperty * 100;
      }
      state.insuranceSCHL = CalculateSCHL(state);
      state.paymentAmount = updateMortgagePaymentAmount(state);
      state.simulationTable = generateSimulation(state);
    },
    setActuelMortgageAmount: (state: SimulationState, action: PayloadAction<SetActualMortageAmountProps>) => {
      state.actualMortgageAmount = action.payload.actualMortgageAmount;
      state.costOfProperty = 0;
      state.cashDown = 0;
      state.paymentAmount = updateMortgagePaymentAmount(state);
      state.insuranceSCHL = 0;
      state.simulationTable = generateSimulation(state)
    },
    setCashdown: (state: SimulationState, action: PayloadAction<number>) => {
      state.cashDown = action.payload;
      state.cashDownPercentage = state.cashDown / state.costOfProperty * 100;
      state.paymentAmount = updateMortgagePaymentAmount(state);
      state.insuranceSCHL = CalculateSCHL(state);
      state.simulationTable = generateSimulation(state);
    },
    setCashdownPercentage: (state: SimulationState, action: PayloadAction<number>) => {
      state.cashDownPercentage = action.payload;
      state.cashDown = state.costOfProperty * state.cashDownPercentage / 100;
      state.paymentAmount = updateMortgagePaymentAmount(state);
      state.insuranceSCHL = CalculateSCHL(state);
      state.simulationTable = generateSimulation(state)
    },
    setInterestRate: (state: SimulationState, action: PayloadAction<number>) => {
      state.interestRate = action.payload;
      state.paymentAmount = updateMortgagePaymentAmount(state);
      state.simulationTable = generateSimulation(state)
    },
    setTerm: (state: SimulationState, action: PayloadAction<number>) => {
      state.term = action.payload;
      state.paymentAmount = updateMortgagePaymentAmount(state);
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
    },
    setHouseInsurance: (state: SimulationState, action: PayloadAction<number>) => {
      state.houseInsurance = action.payload;
      state.simulationTable = generateSimulation(state)
    },
    setHouseInsuranceTaxes: (state: SimulationState, action: PayloadAction<number>) => {
      state.houseInsuranceTaxes = action.payload;
      state.simulationTable = generateSimulation(state)
    },
    setMinucipalTaxes: (state: SimulationState, action: PayloadAction<number>) => {
      state.municipalTaxes = action.payload;
      state.simulationTable = generateSimulation(state)
    },
    setScollarTaxes: (state: SimulationState, action: PayloadAction<number>) => {
      state.scollarTaxes = action.payload;
      state.simulationTable = generateSimulation(state)
    },
    setEnergyCost: (state: SimulationState, action: PayloadAction<number>) => {
      state.energyCost = action.payload;
      state.simulationTable = generateSimulation(state)
    },
    addAdditionalOutcome: (state: SimulationState) => {
      state.aditionnalOutcome.push({ amount: 0, description: "", frequency: 1, interest: 0, monthsDuration: 0 });
      state.simulationTable = generateSimulation(state);
    },
    addAdditionalIncome: (state: SimulationState) => {
      state.aditionnalIncomes.push({ amount: 0, description: "", frequency: 1, interest: 0, monthsDuration: 0 });
      state.simulationTable = generateSimulation(state);
    },
    removeAdditionalIncome: (state: SimulationState, action: PayloadAction<number>) => {
      state.aditionnalIncomes.splice(action.payload, 1);
      state.simulationTable = generateSimulation(state);
    },
    removeAdditionalOutcome: (state: SimulationState, action: PayloadAction<number>) => {
      state.aditionnalOutcome.splice(action.payload, 1);
      state.simulationTable = generateSimulation(state);
    },
    updateAdditionalOutcomeDescription: (state: SimulationState, action: PayloadAction<{ index: number; description: string }>) => {
      const { index, description } = action.payload;
      if (state.aditionnalOutcome[index]) {
        state.aditionnalOutcome[index].description = description;
      }
    },
    updateAdditionalIncomeDescription: (state: SimulationState, action: PayloadAction<{ index: number; description: string }>) => {
      const { index, description } = action.payload;
      if (state.aditionnalIncomes[index]) {
        state.aditionnalIncomes[index].description = description;
      }
    },
    updateAdditionalOutcomeAmount: (state: SimulationState, action: PayloadAction<{ index: number; amount: number }>) => {
      const { index, amount } = action.payload;
      if (state.aditionnalOutcome[index]) {
        state.aditionnalOutcome[index].amount = amount;
        state.simulationTable = generateSimulation(state);
      }
    },
    updateAdditionalIncomeAmount: (state: SimulationState, action: PayloadAction<{ index: number; amount: number }>) => {
      const { index, amount } = action.payload;
      if (state.aditionnalIncomes[index]) {
        state.aditionnalIncomes[index].amount = amount;
        state.simulationTable = generateSimulation(state);
      }
    },
    updateAdditionalIncomeMonthsDuration: (state: SimulationState, action: PayloadAction<{ index: number; monthsDuration: number }>) => {
      const { index, monthsDuration } = action.payload;
      if (state.aditionnalIncomes[index]) {
        state.aditionnalIncomes[index].monthsDuration = monthsDuration;
        state.simulationTable = generateSimulation(state);
      }
    },
    updateAdditionalOutcomeMonthsDuration: (state: SimulationState, action: PayloadAction<{ index: number; monthsDuration: number }>) => {
      const { index, monthsDuration } = action.payload;
      if (state.aditionnalOutcome[index]) {
        state.aditionnalOutcome[index].monthsDuration = monthsDuration;
        state.simulationTable = generateSimulation(state);
      }
    },
    updateAdditionalOutcomeFrequency: (state: SimulationState, action: PayloadAction<{ index: number; frequency: number }>) => {
      const { index, frequency } = action.payload;
      if (state.aditionnalOutcome[index]) {
        state.aditionnalOutcome[index].frequency = frequency;
        state.simulationTable = generateSimulation(state);
      }
    },
  },
});

export const {
  setCostOfProperty,
  setActuelMortgageAmount,
  setCashdown,
  setCashdownPercentage,
  setInterestRate,
  setTerm,
  setInitialValue,
  setIncome,
  setOutcome,
  setHouseInsurance,
  setHouseInsuranceTaxes,
  setMinucipalTaxes,
  setScollarTaxes,
  setEnergyCost,
  addAdditionalOutcome,
  addAdditionalIncome,
  removeAdditionalIncome,
  removeAdditionalOutcome,
  updateAdditionalOutcomeDescription,
  updateAdditionalIncomeDescription,
  updateAdditionalOutcomeAmount,
  updateAdditionalIncomeAmount,
  updateAdditionalIncomeMonthsDuration,
  updateAdditionalOutcomeMonthsDuration,
  updateAdditionalOutcomeFrequency,
} = simulationSlice.actions;

export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
