import { useCallback, useEffect, useState } from 'react';
import { Button, Center, Container, Input, Select, Stack } from "@mantine/core";
import './modules/Module.css';
import { loadPluginDetails, loadPlugins, PluginDetails } from '../logic/plugins';
import { Module } from './modules/Module';
import classes from "./Home.module.css";
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/navigation';
import { useNetwork, useChainId } from 'wagmi';
import usePluginStore from '@/store/plugin/plugin.store';



const mockPlugins = ["1", "2", "3", "4", "5", "6"]

function HomePage() {

  const [showFlagged, setFilterFlagged] = useState<boolean>(false);
  const [details, setDetails] = useState<[]>([])
  const [plugins, setPlugins] = useState<any[]>([]);
  const { chainId, setChainId } = usePluginStore((state: any) => state);

  const navigate = useNavigate();
  // To listen to network switch
  const chain = useChainId()


  const fetchData = useCallback(async () => {
    try {
      setPlugins([])
      const plugins = await loadPlugins(!showFlagged)
      let newDetails: any = []
      setPlugins(plugins)
      for(let i=0; i< plugins.length; i++) 
      {
         newDetails.push({... {module: plugins[i]} , ...await loadPluginDetails(plugins[i])})
         setDetails(newDetails)
      }

      
    } catch (e) {
      console.warn(e)
    }
  }, [])

  
  useEffect(() => {
      fetchData();
      // Setting this globally
      setChainId(chain)

   

  }, [fetchData, chain])

  const handleSearchPlugin = (searchString: string) => {

    setPlugins(details.filter((plugin: any) => plugin.metadata.name.toLowerCase().includes(searchString.toLowerCase())))
  }


  return (
    <Container>
    <Container className={classes.voucherScreenContainer}>
              <Container
          style={{
            padding: 0,
            // marginTop: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
            Explore Modules
          </h2>
        </Container>
        <div
          style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Input
            variant='filled'
            placeholder='Search Modules'
            type='text'
            style={{ width: '100%'}}
            onChange={(event: any)=>{ handleSearchPlugin(event.target.value) }}
            
          />
          <div>
            <Select
              // label='Sort By'
              style={{ width: '100%'}}
              variant='filled'
              placeholder='Pick value'
              data={['Show All', 'Only Enabled']}
              defaultValue='Show All'
              clearable
            />
          </div>
          <Button color='green' variant='filled' style={{ width: '30%'}} onClick={()=> navigate(RoutePath.publish)}>
            Publish Module
          </Button>
        </div>
      <div className={classes.actionsContainer}>
      {plugins.map((plugin) => 
        <Module
        address={plugin}
        pluginDetails={plugin.metadata? {enabled: plugin.enabled, metadata: plugin.metadata}: null}
      />)}
      { !plugins.length && mockPlugins.map((plugin) => 
        <Module
        address={plugin}
      />)}
      </div>

    </Container>
  </Container>
  );
}


export default HomePage;
