import styles from '../Simulation.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { InputField } from '../../components/InputField';
import {
  setCostOfProperty,
  selectSimulation,
  setCashdown,
  setCashdownPercentage,
  setInterestRate,
  setTerm,
  setActuelMortgageAmount
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
  const [mortageAmountLock, setMortageAmountLock] = useState(lockFromStorage === 'true' || lockFromStorage === null);

  const switchLock = (args: any) => {
    setPercentLock(!percentLock);
    localStorage.setItem('lock', String(!percentLock));
  }

  const switchLockMortage = (args: any) => {
    setMortageAmountLock(!mortageAmountLock);
    localStorage.setItem('lock', String(!mortageAmountLock));
  }

  return (
      <div>
        <div className={styles.row}>
          <div className={styles.box}>
            <div className={styles.row}>
              <InputField label={t('CostOfProperty')}
                type='number'
                ariaLabel={t('CostOfProperty')}
                value={simulation.costOfProperty}
                onChange={(e) => dispatch(setCostOfProperty({ costOfProperty: parseInt(e.target.value), percentLock: percentLock}))}
                lockable={true}
                onLock={(args) => switchLockMortage(args)}
                isLock={mortageAmountLock} />
            </div>
            <div className={styles.row}>
              <InputField label={t('ActualMortageAmount')}
                type='number'
                ariaLabel={t('ActualMortageAmount')}
                value={simulation.actualMortgageAmount}
                onChange={(e) => dispatch(setActuelMortgageAmount({ actualMortgageAmount: parseInt(e.target.value), actualMortageIsLock: mortageAmountLock}))}
                lockable={true}
                onLock={(args) => switchLockMortage(args)}
                isLock={!mortageAmountLock}
              />
            </div>
            <div className={styles.row}>
              <InputField label={t('CashDown')}
                type='number'
                ariaLabel={t('CashDown')}
                value={simulation.cashDown}
                onChange={(e) => dispatch(setCashdown(parseInt(e.target.value)))}
                lockable={true} 
                onLock={(args) => switchLock(args)}
                isLock={percentLock} />
            </div>
            <div className={styles.row}>
              <InputField label={t('CashDownPercentage')}
                type='number'
                ariaLabel={t('CashDownPercentage')}
                value={simulation.cashDownPercentage}
                onChange={(e) => dispatch(setCashdownPercentage(parseInt(e.target.value)))}
                lockable={true}
                onLock={(args) => switchLock(args)}
                isLock={!percentLock} />
            </div>
            <div className={styles.row}>
              <InputField label={t('InterestRate')}
                type="float"
                ariaLabel={t('InterestRate')}
                value={simulation.interestRate}
                onChange={(e) => dispatch(setInterestRate(parseFloat(e.target.value)))} />
            </div>
            <div className={styles.row}>
              <InputField label={t('Term')}
                type='number'
                tooltip={t('TermInformation')}
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
        {simulation.cashDownPercentage < 20 && !mortageAmountLock ? (<div className={styles.row}>
          <InsuranceSCHL />
        </div>) : undefined}
        <div className={styles.row}>
          <div style={{width: "100%"}}>
            <h5>{t('TableauPaiementHypothecaire')}</h5>
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
      </div>
  );
}
