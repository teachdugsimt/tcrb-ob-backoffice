import { useStaticRendering } from 'mobx-react';

// import PostStore from './PostStore';
// import UIStore from './UIStore';
import ThemeStore from './theme-store'
import CounterStore from './counter-store'
import AuthenStore from './authen-store'
import VersatileStore from './versatile-store'
import CustomerServicesMenuStore from './customer-services-menu-store'
import BusinessParameterSetup from './business-parameters-setup-store'
import CustomerServiceEnquiry from './customer-service-enquiry-store'
import PendingApproval from './pending-approve-store'
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

export default function initializeStore(initialData = {}) {
  if (isServer) {
    return {
      // uiStore: new UIStore(),
      themeStore: new ThemeStore(),
      counterStore: new CounterStore(),
      authenStore: new AuthenStore(),
      versatileStore: new VersatileStore(),
      customerServicesMenuStore: new CustomerServicesMenuStore(),
      businessParametersSetupStore: new BusinessParameterSetup(),
      customerServiceEnquiry: new CustomerServiceEnquiry(),
      pendingApprovalStore: new PendingApproval()
    };
  }
  if (store === null) {
    store = {
      // uiStore: new UIStore(),
      themeStore: new ThemeStore(),
      counterStore: new CounterStore(),
      authenStore: new AuthenStore(),
      versatileStore: new VersatileStore(),
      customerServicesMenuStore: new CustomerServicesMenuStore(),
      businessParametersSetupStore: new BusinessParameterSetup(),
      customerServiceEnquiry: new CustomerServiceEnquiry(),
      pendingApprovalStore: new PendingApproval()
    };
  }

  return store;
}
