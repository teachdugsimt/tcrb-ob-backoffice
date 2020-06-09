import React from 'react'
import { CounterStore, ThemeStore, AuthenStore, VersatileStore, BusinessParametersSetupStore } from '../stores/'

export const storesContext = React.createContext({
  counterStore: new CounterStore(),
  themeStore: new ThemeStore(),
  authenStore: new AuthenStore(),
  versatileStore: new VersatileStore(),
  businessParametersSetupStore: new BusinessParametersSetupStore()
})
