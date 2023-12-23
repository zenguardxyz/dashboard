import { RoutePath } from '@/navigation';
import usePluginStore from '@/store/plugin/plugin.store';
import { Tabs, rem } from '@mantine/core';
import { IconHome, IconUser } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

export function TabsComponent() {
  const iconStyle = { width: rem(25), height: rem(25) };

  const navigate = useNavigate()
  const { tab, setTab } = usePluginStore(
    (state: any) => state
  );

  return (
    <Tabs value={tab}>
      <Tabs.List>
        <Tabs.Tab value={RoutePath.home} leftSection={<IconHome style={iconStyle} />} onClick={ ()=> { setTab(RoutePath.home); navigate(RoutePath.home)} }>
          Home
        </Tabs.Tab>
        <Tabs.Tab value={RoutePath.account} leftSection={<IconUser style={iconStyle} />} onClick={ ()=> { setTab(RoutePath.account); navigate(RoutePath.account) }} >
          Account
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}