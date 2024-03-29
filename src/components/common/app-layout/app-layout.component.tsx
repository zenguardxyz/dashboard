import React, { useState } from "react";
import { Container } from "../container/container.component";
import { Head } from "../header/header.component";
import { AppShell, useMantineColorScheme } from '@mantine/core';
import { ConnectKitProvider, getDefaultConfig} from "connectkit";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children } = props;
  const [ opened, setOpened ] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  const dark = colorScheme == "dark";
  return (
    <ConnectKitProvider mode={dark ? "dark" : "light"}>
    <AppShell
    header={{ height: 116 }}
    padding="md"
    styles={{
      // main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      main: { backgroundColor: dark ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-0)' },
      header: { backgroundColor: dark ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-white)' },
    }}
  >

      {/* <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <MantineLogo size={30} />
      </Group> */}
      <Head setOpened={setOpened} opened={opened}/>
      <AppShell.Main> <Container>{children}</Container></AppShell.Main>
  </AppShell>
  </ConnectKitProvider>
  );
};
