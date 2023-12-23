import { Box, Center, Container, Group, Title, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, useMantineTheme, Avatar, Chip, useMantineColorScheme, Anchor, Badge } from "@mantine/core";
import { useAccount } from 'wagmi';
import { useModal } from 'connectkit';
import classes  from "./account-screen.module.css";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconPlugConnected,  IconPlug, IconBrandGithub, IconUser, IconNetwork, IconWorldWww, IconShield, IconCheck } from "@tabler/icons";
import { useEffect, useState } from "react";

import ETH from "../../assets/icons/eth.svg";
import X from "../../assets/icons/x.png";
import GitHub from "../../assets/icons/github.svg";

import { RoutePath } from "../../navigation";
import { useNavigate } from "react-router-dom";
import { getProvider } from "../../logic/web3";
import { NetworkUtil } from "../../logic/networks";
import { PROTOCOL_CHAIN_ID } from "../../logic/constants"
import { AddressUtil } from "@/utils/address";



const AccountScreen = () => {
  const [ name, setName ] = useState('');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { setOpen } = useModal()


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
        <Title size="20">Account Details</Title>
      </Group>

      <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Stack style={{marginBottom: '40px'}}>           
        <Text size="md" style={{fontWeight: 600}}>
              Name
        </Text>
        <Text size="sm" >
              A name to identify the publisher
        </Text>
        <TextInput size="md"  value={name} leftSection={<IconUser/>} style={{width:"50%"}} onChange={(event)=> setName(event.currentTarget.value)}/>
        </Stack>

    
    
      <Stack  style={{marginBottom: '40px'}}>           
        <Text size="md" style={{fontWeight: 600}}>
             Website
        </Text>
        <Text size="sm" >
        A name to identify the publisher   
        </Text>
        <TextInput size="md" leftSection={<IconWorldWww/>} style={{width:"50%"}}/>
        </Stack>

            
      <Stack  style={{marginBottom: '30px'}}>           
        <Text size="md" style={{fontWeight: 600}}>
             Logo
        </Text>
        <Text size="sm" >
         Logo to identify the publisher   
        </Text>

        </Stack>

        <Button
                onClick={() => { setPluginDetails({address}); navigate(RoutePath.publishDetails)}}
                leftSection={<IconPlugConnected />} 
                size='md'
                variant="filled"
                color='green'
      
              >
               Save
        </Button>

        </Paper>
        


        <Group mb={30} style={{marginTop: '30px'}}>
          <Title size="20">Account Verification</Title>
        </Group>

        <Paper withBorder radius="md" p="xl" style={{
                      marginTop: 30
                    }}>


         <Group style={{marginBottom: '40px'}} >
        <Avatar size={40}  src= {ETH} alt="attester image" /> 
        <Stack gap='5px' style={{width: '200px'}}>
        <Text size="md" > Your Account</Text>
        <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${address}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
            {isConnected ? AddressUtil.shorternAddress(address!) : ''}
         </Text>
         </Anchor>
         </Stack>

       {isConnected ?  <Badge style={{  marginLeft: '40px' }} leftSection={<IconCheck/>} size="lg" color="green" variant="light">
         VERIFIED</Badge>
            
       :
        <Button style={{  marginLeft: '40px',  width: '140px' }}
              // loading={registering}
              onClick={() => { setOpen(true) }}
              // leftSection={<IconApps />} 
              variant="light"
              radius="md"
              color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
            >
            CONNECT
        </Button> 
        }
         </Group>


         <Group style={{marginBottom: '40px'}} >
        <Image style={{width: 40}}  src= {X} alt="attester image" /> 
        <Stack gap='5px' style={{width: '200px'}} >
        <Text size="md" > Twitter Account</Text>
        <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${address}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
            {isConnected ? '@zenguardxyz' : 'Your Twitter account'}
         </Text>
         </Anchor>
         </Stack>

       {isConnected ?  <Badge style={{  marginLeft: '40px' }} leftSection={<IconCheck/>} size="lg" color="green" variant="light">
         VERIFIED</Badge>
            
       :
        <Button style={{  marginLeft: '40px', width: '140px' }}
              // loading={registering}
              onClick={() => { setOpen(true) }}
              // leftSection={<IconApps />} 
              variant="light"
              radius="md"
              color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
            >
            VERIFY
        </Button> 
        }
         </Group>

         <Group style={{marginBottom: '40px'}} >
        <Avatar size={40}  src= {GitHub} alt="attester image" /> 
        <Stack gap='5px' style={{width: '200px'}} >
        <Text size="md" > GitHub Account</Text>
        <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${address}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
            {isConnected ? '@zenguardxyz' : 'Your GitHub account'}
         </Text>
         </Anchor>
         </Stack>

       {isConnected ?  <Badge style={{  marginLeft: '40px' }} leftSection={<IconCheck/>} size="lg" color="green" variant="light">
         VERIFIED</Badge>
            
       :
        <Button style={{  marginLeft: '40px', width: '140px' }}
              // loading={registering}
              onClick={() => { setOpen(true) }}
              // leftSection={<IconApps />} 
              variant="light"
              radius="md"
              color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
            >
            VERIFY
        </Button> 
        }
         </Group>


        { isConnected && <Group style={{marginBottom: '40px'}} >
        <Stack gap='5px' style={{width: '300px'}} >
        <Text size="xl" > Trust Score</Text>
        <Rating readOnly value={ 4.5 } fractions={2} count={5}/> 
        <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${address}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} onClick={()=> window.open('https://passport.gitcoin.co') } >
             Increase the score by verifying via Gitcoin Passport. learn more..
         </Text>
         </Anchor>
         </Stack>
         </Group>
        }

         




          </Paper>
  

</Container>
  </Paper>
  );
};

export default AccountScreen;