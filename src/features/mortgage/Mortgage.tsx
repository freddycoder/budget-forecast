import styles from '../Simulation.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { InputField } from '../../components/InputField';
import {
  setCostOfProperty,
  selectSimulation,
  setCashdown,
  setCashdownPercentage,
  setInterestRate,
  setTerm
} from '../simulationSlice';
import { format } from '../../utils/formatUtil';
import { useTranslation } from 'react-i18next';
import { MortgageChart } from './MortgageChart';
import { useState } from 'react';
import { InsuranceSCHL } from './InsuranceSCHL';

export function Mortgage() {
  const simulation = useAppSelector(selectSimulation);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const lockFromStorage = localStorage.getItem('lock');
  const [percentLock, setPercentLock] = useState(lockFromStorage === 'true' || lockFromStorage === null);

  const switchLock = (args: any) => {
    setPercentLock(!percentLock);
    localStorage.setItem('lock', String(!percentLock));
  }

  return (
      <div>
        <div className={styles.row}>
          <div className={styles.box}>
            <div className={styles.row}>
              <InputField label={t('CostOfProperty')}
                ariaLabel={t('CostOfProperty')}
                value={simulation.costOfProperty}
                onChange={(e) => dispatch(setCostOfProperty({ costOfProperty: parseInt(e.target.value), percentLock: percentLock}))} />
            </div>
            <div className={styles.row}>
              <InputField label={t('CashDown')}
                ariaLabel={t('CashDown')}
                value={simulation.cashDown}
                onChange={(e) => dispatch(setCashdown(parseInt(e.target.value)))}
                lockable={true} 
                onLock={(args) => switchLock(args)}
                isLock={percentLock} />
            </div>
            <div className={styles.row}>
              <InputField label={t('CashDownPercentage')}
                ariaLabel={t('CashDownPercentage')}
                value={simulation.cashDownPercentage}
                onChange={(e) => dispatch(setCashdownPercentage(parseInt(e.target.value)))}
                lockable={true}
                onLock={(args) => switchLock(args)}
                isLock={!percentLock} />
            </div>
            <div className={styles.row}>
              <InputField label={t('InterestRate')}
                ariaLabel={t('InterestRate')}
                value={simulation.interestRate}
                onChange={(e) => dispatch(setInterestRate(parseFloat(e.target.value)))} />
            </div>
            <div className={styles.row}>
              <InputField label={t('Term')}
                ariaLabel={t('Term')}
                value={simulation.term}
                onChange={(e) => dispatch(setTerm(parseInt(e.target.value)))} />
            </div>
            <div className={styles.row}>
              <InputField label={t('PaymentAmount')}
                ariaLabel={t('PaymentAmount')}
                value={format(simulation.paymentAmount)}
                onChange={(e) => { return; }} 
                disabled/>
            </div>
          </div>
          <div>
            <MortgageChart />
          </div>
        </div>
        {simulation.cashDownPercentage < 20 ? (<div className={styles.row}>
          <InsuranceSCHL />
        </div>) : undefined}
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('Month')}</th>
                <th>{t('Payment')}</th>
                <th>{t('Interest')}</th>
                <th>{t('Principal')}</th>
                <th>{t('Balance')}</th>
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
