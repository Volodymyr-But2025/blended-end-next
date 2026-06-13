// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
};

type CurrencyState = {
  baseCurrency: string;
  hasHydrated: boolean;
  exchangeInfo: ExchangeInfo | null;
  isLoading: boolean;
  isError: null | string;
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (stateHydrated: boolean) => void;
  setExchangeInfo: (info: null | ExchangeInfo) => void;
  setisLoading: (loading: boolean) => void;
  setisError: (error: null | string) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      hasHydrated: false,

      exchangeInfo: null,
      isLoading: false,
      isError: null,

      setBaseCurrency: (currency) =>
        set({
          baseCurrency: currency,
        }),
      setHasHydrated: (stateHydrated) =>
        set({
          hasHydrated: stateHydrated,
        }),
      setExchangeInfo: (info) =>
        set({
          exchangeInfo: info,
        }),
      setisLoading: (loading) =>
        set({
          isLoading: loading,
        }),
      setisError: (error) =>
        set({
          isError: error,
        }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
