import { SimulationState } from "./type/SimulationState";
import { SimulationStep } from "./type/SimulationStep";
import { InsuranceSCHLArray, InsuranceSCHLTaxes } from './mortgage/InsuranceSCHL';

export function generateSimulation(state: SimulationState): SimulationStep[] {
    const simulationTable: SimulationStep[] = [];
    const nbMount = 25 * 12; // simulate for 25 years

    for (let i = 0; i < nbMount; i++) {
        simulationIteration(i, state, simulationTable);
    }

    return simulationTable;
}

function simulationIteration(mount: number, state: SimulationState, simulationTable: SimulationStep[]) {
    let previousValue = 0;
    if (mount === 0) {
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
        previousValue = simulationTable[mount - 1].solde;
    }

    let mortgagePayment = 0;
    if (state.paymentTable.length > mount) {
        mortgagePayment = state.paymentTable[mount].paymentAmount;
    }

    let totalExpenses = state.expenses +
        (state.houseInsurance + (state.houseInsurance * (state.houseInsuranceTaxes / 100))) +
        state.energyCost +
        state.aditionnalOutcome.reduce((total, outcome) => {
            if (mount < outcome.monthsDuration) {
                if (mount % outcome.frequency === 0) {
                    return total + outcome.amount;
                }
            }
            
            return total
        }, 0);

    if (mount > 0 && mount % 12 === 0) {
        totalExpenses += state.municipalTaxes + state.scollarTaxes;
    }

    const diff = state.income +
        state.aditionnalIncomes.reduce((total, income) => mount < income.monthsDuration ? total + income.amount : total, 0) -
        totalExpenses - mortgagePayment;

    simulationTable.push({
        mount: mount + 1,
        income: state.income,
        expenses: totalExpenses,
        mortgagePayment: mortgagePayment,
        diff: diff,
        solde: previousValue + diff
    });
}

export function CalculateSCHL(state: SimulationState) {
    let percentSCHL = 0;

    if (state.cashDownPercentage < 20) {
        const x = 1 - (state.cashDownPercentage / 100);
        for (const insurance of InsuranceSCHLArray) {
            const y = insurance.ratio;
            if (x <= y) {
                percentSCHL = insurance.prime;
                break;
            }
        }
    }

    return (state.costOfProperty - state.cashDown) * percentSCHL
}

export const updateMortgagePaymentAmount = (state: SimulationState) => {
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