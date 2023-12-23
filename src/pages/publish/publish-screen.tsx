import { Box, Center, Container, Group, Title, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, useMantineTheme, Avatar, Chip, useMantineColorScheme } from "@mantine/core";
import classes  from "./publish-screen.module.css";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle, IconAt, IconCheck, IconCopy, IconPlugConnected, IconCheckbox, IconWallet, IconSettings, IconPlaylistAdd, IconPlus, IconCross, IconPlug, IconSearch, IconBrandGithub } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useHover } from "@mantine/hooks";
import Safe from "../../assets/icons/safe.png";

import { EAS_EXPLORER } from "../../logic/constants";
import { RoutePath } from "../../navigation";
import { useNavigate } from "react-router-dom";
import { getProvider } from "../../logic/web3";
import { NetworkUtil } from "../../logic/networks";
import { PROTOCOL_CHAIN_ID } from "../../logic/constants"



const PublishScreen = () => {
  const [ address, setAddress ] = useState('');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();




  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chainId, setChainId]: any = useState(PROTOCOL_CHAIN_ID);

 
  const { setPluginDetails } = usePluginStore(
    (state: any) => state
  );


  useEffect(() => {

    ;(async () => {
      
 
      try {
        const provider =  await getProvider()
        const chainId =  (await provider.getNetwork()).chainId
        setChainId(chainId)
    
      }
      catch(e)
      {
        console.log(e)
      }
      
  })()   
  }, [])


  return (
    <Paper  className={classes.settingsContainer}>
    <Container className={classes.formContainer}>

      <Group mb={30}>
        <Title size="20">Plugin Details</Title>
      </Group>

      <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Stack>
        <Group
        >     
        <Stack>           
        <Text size="md" style={{fontWeight: 600}}>
              Module Address
        </Text>
        <Text size="sm" >
              Module Address to fetch the details
        </Text>
        </Stack>
        </Group>  
       <Group >

       <TextInput size="md"  value={address} leftSection={<IconPlug/>} style={{width:"50%"}} onChange={(event)=> setAddress(event.currentTarget.value)}/>


        </Group>

        </Stack>
        <Divider
        my="md"
        style={{marginBlock: 50}}
        labelPosition="left"
        label={
        <Text size="md" style={{fontWeight: 500}}>OR</Text> 
        }
      />

        <Stack>
        <Group
        >     
        <Stack>           
        <Text size="md" style={{fontWeight: 600}}>
              Module template repo link
        </Text>
        <Text size="sm" >
          GitHub repo link to fetch module details
        </Text>
        </Stack>
        </Group>  
       <Group >

       <TextInput size="md" leftSection={<IconBrandGithub/>} style={{width:"50%"}}/>

      </Group>

      </Stack>

        <Button
                onClick={() => { setPluginDetails({address}); navigate(RoutePath.publishDetails)}}
                leftSection={<IconPlugConnected />} 
                size='md'
                variant="filled"
                color='green'
                style={{
                  marginTop: '50px '
                }}
              >
               Continue
        </Button>

        </Paper>

  </Container>
  </Paper>
  );
};

export default PublishScreen;