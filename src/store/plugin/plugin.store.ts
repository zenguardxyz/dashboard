import { RoutePath } from "@/navigation";
import { Router } from "react-router-dom";
import create from "zustand";

const usePluginStore = create((set) => ({
  fetching: false,
  accountDetails: {},
  authDetails: {},
  pluginDetails: {},
  chainId: 0,
  confirming: false,
  confirmed: false,
  tab: RoutePath.home,

  setRoleName: (name: string) => {
    set((state: any) => ({
      ...state,
      roleName: name,
    }));
  },

  setChainId: (id: number) => {
    set((state: any) => ({
      ...state,
      chainId: id,
    }));
  },

  setTab: (tab: string) => {
    set((state: any) => ({
      ...state,
      tab: tab,
    }));
  },

  setConfirming: (status: boolean) => {
    set((state: any) => ({
      ...state,
      confirming: status,
    }));
  },

  setConfirmed: (status: boolean) => {
    set((state: any) => ({
      ...state,
      confirmed: status,
    }));
  },


  setFetching: (status: boolean) => {
    set((state: any) => ({
      ...state,
      fetching: status,
    }));
  },

  setPluginDetails: (data: object) =>
    set((state: any) => ({
      pluginDetails: data,
    })),


  setAccountDetails: (data: object) =>
    set((state: any) => ({
      accountDetails: data,
    })),
  setAuthDetails: (data: object) =>
    set((state: any) => ({
      authDetails: data,
    })),


}));
export default usePluginStore;
