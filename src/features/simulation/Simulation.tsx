import styles from './Simulation.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { InputField } from './InputField';
import {
  setCostOfProperty,
  selectSimulation,
  setCashdown,
  setCashdownPercentage,
  setInterestRate,
  setTerm
} from './simulationSlice';

export function Simulation() {
  const simulation = useAppSelector(selectSimulation);
  const dispatch = useAppDispatch();

  const format = (num: number) => num.toLocaleString('fr-CA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
      <div>
        <div className={styles.box}>
          <div className={styles.row}>
            <InputField label="Cost of property"
              ariaLabel="Cost of property"
              value={simulation.costOfProperty}
              onChange={(e) => dispatch(setCostOfProperty(parseInt(e.target.value)))} />
          </div>
          <div className={styles.row}>
            <InputField label="Cash down"
              ariaLabel="Cash down"
              value={simulation.cashDown}
              onChange={(e) => dispatch(setCashdown(parseInt(e.target.value)))} />
          </div>
          <div className={styles.row}>
            <InputField label="Cash down percent"
              ariaLabel="Cash down percent"
              value={simulation.cashDownPercentage}
              onChange={(e) => dispatch(setCashdownPercentage(parseInt(e.target.value)))} />
          </div>
          <div className={styles.row}>
            <InputField label="Interest rate"
              ariaLabel="Interest rate"
              value={simulation.interestRate}
              onChange={(e) => dispatch(setInterestRate(parseInt(e.target.value)))} />
          </div>
          <div className={styles.row}>
            <InputField label="Term"
              ariaLabel="Term"
              value={simulation.term}
              onChange={(e) => dispatch(setTerm(parseInt(e.target.value)))} />
          </div>
          <div className={styles.row}>
            <InputField label="Payment amount"
              ariaLabel="Payment amount"
              value={simulation.paymentAmount}
              onChange={(e) => { return; }} />
          </div>
        </div>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Month</th>
                <th>Payment</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {simulation.paymentTable.map((payment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{format(payment.paymentAmount)} $</td>
                  <td>{format(payment.interest)} $</td>
                  <td>{format(payment.principal)} $</td>
                  <td>{format(payment.balance)} $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
