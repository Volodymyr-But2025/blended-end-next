'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';

import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const setExchangeInfo = useCurrencyStore((state) => state.setExchangeInfo);
  const setIsloading = useCurrencyStore((state) => state.setisLoading);
  const setIsError = useCurrencyStore((state) => state.setisError);
  const hundleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('currency') as string;

    const [amount, from, , to] = value.split(' ');
    try {
      setIsloading(true);
      setExchangeInfo(null);
      setIsError(null);
      const info = await exchangeCurrency({
        amount: Number(amount),
        from,
        to,
      });
      setExchangeInfo(info);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <form onSubmit={hundleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
