import { useCallback, useEffect, useState } from 'react';
import { Button, Image, Container, Input, Select, Stack, Text, Center } from "@mantine/core";
import './modules/Module.css';
import { loadPluginDetails, loadPlugins, PluginDetails } from '../logic/plugins';
import { Module } from './modules/Module';
import classes from "./Home.module.css";
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/navigation';
import { useNetwork, useChainId } from 'wagmi';
import usePluginStore from '@/store/plugin/plugin.store';
import Search from "../assets/icons/search.png";


const mockPlugins = ["1", "2", "3", "4", "5", "6"]

function HomePage() {

  const [showFlagged, setFilterFlagged] = useState<boolean>(false);
  const [details, setDetails] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [plugins, setPlugins] = useState<any[]>([]);
  const { chainId } = usePluginStore((state: any) => state);

  const navigate = useNavigate();


  useEffect(() => {

    ;(async () => {

      try {
        setPlugins([]);
        console.log(chainId)
        const plugins = await loadPlugins(!showFlagged, chainId)

        console.log(plugins)

        console.log(plugins.length)
        let newDetails: any = []
        setPlugins(plugins)
        setLoading(false);
        for(let i=0; i< plugins.length; i++) 
        {
           newDetails.push({... {module: plugins[i]} , ...await loadPluginDetails(plugins[i], chainId)})
           setDetails(newDetails)
        }
        

      } catch (e) {
        console.warn(e)
      }


  })()   
  }, [chainId])

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
            // onChange={(event: any)=>{ handleSearchPlugin(event.target.value) }}
            
          />
          <div>
            <Select
              // label='Sort By'
              style={{ width: '100%'}}
              variant='filled'
              placeholder='Pick value'
              data={['Show All', 'By You']}
              defaultValue='Show All'
              clearable
            />
          </div>
          <Button color='green' variant='filled' style={{ width: '30%'}} onClick={()=> navigate(RoutePath.publish)}>
            Publish Module
          </Button>
        </div>
      <div className={classes.actionsContainer}>
      { plugins.map((plugin) => 
        <Module
        address={plugin.integration}
        publisher={plugin.publisher}
        pluginDetails={plugin.metadata? {enabled: plugin.enabled, metadata: plugin.metadata}: null}
      />)}
      { loading && !plugins.length && mockPlugins.map((plugin) => 
        <Module
        address={plugin}
        publisher={plugin}
      />)}
      </div>
      { !loading && !plugins.length && <Stack align='center'>
      <Image style={{  width: "100px" }}src={Search} alt="Error" /> 
        <Stack  align='center' justify='center' gap='5px' style={{width: '200px'}}>
        <Text size="md" > No Modules Found</Text>          
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400, textAlign: 'center'}} >
            Modules have not been published yet
         </Text>
         </Stack>
         </Stack>
      }

    </Container>
  </Container>
  );
}


export default HomePage;
