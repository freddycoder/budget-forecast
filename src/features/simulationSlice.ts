import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { InsuranceSCHLArray, InsuranceSCHLTaxes } from './mortgage/InsuranceSCHL';
import { SimulationState } from './type/SimulationState';
import { SimulationStep } from './type/SimulationStep';

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

  if (initialState.actualMortgageAmount === undefined) {
    initialState.actualMortgageAmount = 0;
  }
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
  if (initialState.insuranceSCHL === undefined) {
    initialState.insuranceSCHL = 0;
  }
  if (initialState.houseInsurance === undefined) {
    initialState.houseInsurance = 0;
  }
  if (initialState.houseInsuranceTaxes === undefined) {
    initialState.houseInsuranceTaxes = 0;
  }
  if (initialState.municipalTaxes === undefined) {
    initialState.municipalTaxes = 0;
  }
  if (initialState.scollarTaxes === undefined) {
    initialState.scollarTaxes = 0;
  }
  if (initialState.energyCost === undefined) {
    initialState.energyCost = 0;
  }
  if (initialState.aditionnalIncomes === undefined) {
    initialState.aditionnalIncomes = [];
  }
  if (initialState.aditionnalOutcome === undefined) {
    initialState.aditionnalOutcome = [];
  }
  initialState.insuranceSCHL = CalculateSCHL(initialState);
  initialState.simulationTable = generateSimulation(initialState);
}

const updateMortgagePaymentAmount = (state: SimulationState) => {
  state.paymentTable = [];

  let balance = (state.costOfProperty == 0 ? state.actualMortgageAmount : state.costOfProperty) + state.insuranceSCHL - state.cashDown;

  const tauxHypothecaire = state.interestRate / 100;
  const interestRate = tauxHypothecaire / 12;
  const totalNumberOfPayment = 12 * state.term;

  let interest = interestRate * balance;

  const num = ((balance * tauxHypothecaire) / 12);
  const den = 1 - Math.pow(1 + tauxHypothecaire / 12, - totalNumberOfPayment);
  state.paymentAmount = num / den

  for (let i = 0; i < totalNumberOfPayment; i++) {
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
    if (i === 0) {
      if (state.actualMortgageAmount > 0) {
        previousValue = state.initialValue;
      }
      else {
        let schl = 0;

        if (state.cashDownPercentage < 20) {
          schl = state.insuranceSCHL + (state.insuranceSCHL * InsuranceSCHLTaxes);
        }

        previousValue = state.initialValue - state.cashDown - schl;
      }
    }
    else {
      previousValue = simulationTable[i - 1].solde;
    }

    let mortgagePayment = 0;
    if (state.paymentTable.length > i) {
      mortgagePayment = state.paymentTable[i].paymentAmount;
    }

    let totalExpenses = state.expenses +
      (state.houseInsurance + (state.houseInsurance * (state.houseInsuranceTaxes / 100))) +
      state.aditionnalOutcome.reduce((total, outcome) => total + outcome.amount, 0) +
      state.energyCost;

    if (i > 0 && i % 12 === 0) {
      totalExpenses += state.municipalTaxes + state.scollarTaxes;
    }

    const diff = state.income +
      state.aditionnalIncomes.reduce((total, income) => total + income.amount, 0) -
      totalExpenses - mortgagePayment

    simulationTable.push({
      mount: i + 1,
      income: state.income,
      expenses: totalExpenses,
      mortgagePayment: mortgagePayment,
      diff: diff,
      solde: previousValue + diff
    })
  }

  return simulationTable;
}

function CalculateSCHL(state: SimulationState) {
  let percentSCHL = 0;

  if (state.cashDownPercentage < 20) {
    for (let i = 0; i < InsuranceSCHLArray.length; i++) {
      const x = 1 - (state.cashDownPercentage / 100);
      const y = InsuranceSCHLArray[i].ratio
      if (x <= y) {
        percentSCHL = InsuranceSCHLArray[i].prime
        break;
      }
    }
  }

  return (state.costOfProperty - state.cashDown) * percentSCHL
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
      state.aditionnalOutcome.push({ amount: 0, description: "", frequency: 0, interest: 0 });
      state.simulationTable = generateSimulation(state);
    },
    addAdditionalIncome: (state: SimulationState) => {
      state.aditionnalIncomes.push({ amount: 0, description: "", frequency: 0, interest: 0 });
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
  updateAdditionalIncomeAmount
} = simulationSlice.actions;

export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
