import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';

import { AppLayout } from "./components";
import { Navigation } from './navigation';
import { theme } from './theme';
import { HashRouter } from 'react-router-dom';

import { WagmiConfig, createConfig, useChainId } from "wagmi";
import {  getDefaultConfig } from "connectkit";
import { baseGoerli, sepolia, mainnet, polygon, base, goerli } from "wagmi/chains";
import { useEffect } from 'react';
import usePluginStore from './store/plugin/plugin.store';

const chains = [sepolia, goerli, baseGoerli, mainnet, polygon, base   ];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.VITE_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: "Your App Name",

    // Optional
    chains,
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);




export default function App() {
  

    const { setChainId } = usePluginStore((state: any) => state);
    // To listen to network switch
    const chain = useChainId()
    console.log(chain)


  useEffect(() => {


      setChainId(chain)

  }, [chain])

  return (
    <WagmiConfig config={config}>
    <MantineProvider theme={theme}>
      <HashRouter>
      <AppLayout>
      <Navigation />
      </AppLayout>
      </HashRouter>
    </MantineProvider>
    </WagmiConfig>
  );
}


