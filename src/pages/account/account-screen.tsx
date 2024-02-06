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
import { useEthersSigner } from "@/utils/wagmi";
import { attestPublisher, listAttestation, loadPublisher, verificationDetails } from "../../logic/attestation";



const AccountScreen = () => {
  const [ name, setName ] = useState('');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { address, isConnected } = useAccount();
  const { setOpen } = useModal()
  const { chainId } = usePluginStore(
    (state: any) => state
  );


  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  const sign = useEthersSigner(chainId);
  const [attestation, setAttestation]: any = useState();
  const [signer, setSigner] = useState(sign);

 


  useEffect(() => {

    ;(async () => {
      
 
      try {

        setSigner(sign);
        setLoading(true);
        setAttestation(await verificationDetails(address!, chainId));
        setLoading(false);
    
      }
      catch(e)
      {
        console.log(e)
      }
      
  })()   
  }, [sign, address])


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
        <TextInput size="md"  value={loadPublisher(address!)?.name} leftSection={<IconUser/>} style={{width:"50%"}} onChange={(event)=> setName(event.currentTarget.value)}/>
        </Stack>

    
    
      <Stack  style={{marginBottom: '40px'}}>           
        <Text size="md" style={{fontWeight: 600}}>
             Website
        </Text>
        <Text size="sm" >
        A name to identify the publisher   
        </Text>
        <TextInput value={loadPublisher(address!)?.link} size="md" leftSection={<IconWorldWww/>} style={{width:"50%"}}/>
        </Stack>


      <Group>        
      <Stack  style={{marginBottom: '30px'}}>
              
        <Text size="md" style={{fontWeight: 600}}>
             Logo
        </Text>
        <Text size="sm" >
         Logo to identify the publisher   
        </Text>
        </Stack>
        <Image style={{ width: 60}}  src= {loadPublisher(address!)?.logo} alt="attester image" /> 
      
        </Group>
     

        <Button
                onClick={() => { }}
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

         { loading && <>
         <Group >
            <Group>
            <Skeleton height={70} mt={6} radius="lg"  width="80px" />
              <Stack>
            <Skeleton height={15} mt={6} radius="lg"  width="100px" />
             <Skeleton height={15} mt={6} radius="lg"  width="100px" />
              </Stack>
            </Group>
            <Skeleton style={{marginLeft: '100px'}} height={35} mt={6} radius="sm"  width="15%" />

          </Group> 
          <Group >
            <Group>
            <Skeleton height={70} mt={6} radius="lg"  width="80px" />
              <Stack>
            <Skeleton height={15} mt={6} radius="lg"  width="100px" />
             <Skeleton height={15} mt={6} radius="lg"  width="100px" />
              </Stack>
            </Group>
            <Skeleton style={{marginLeft: '100px'}} height={35} mt={6} radius="sm"  width="15%" />

          </Group> 
          </>
         }

     
       { !loading && <> <Group style={{marginBottom: '40px'}} >
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
         CONNECTED</Badge>
            
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
        <Anchor target='_blank' href={`https://x.com/${loadPublisher(address!).x}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
            { attestation?.profiles?.includes(1n) && loadPublisher(address!)?.x ? `@${loadPublisher(address!).x}` : 'Your Twitter account'}
         </Text>
         </Anchor>
         </Stack>

       { attestation?.profiles?.includes(1n)  ?  <Badge style={{  marginLeft: '40px' }} leftSection={<IconCheck/>} size="lg" color="green" variant="light">
         VERIFIED</Badge>
            
       :
        <Button style={{  marginLeft: '40px', width: '140px' }}
              loading={verifying}
              loaderProps={{type: 'dots', size: 'md'}}
              onClick={async () => { setVerifying(true); await attestPublisher(signer!); setAttestation(await verificationDetails(address!, chainId)); setVerifying(false); }}
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
        <Anchor target='_blank' href={`https://github.com/${loadPublisher(address!).github}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
          { attestation?.profiles?.includes(2n) && loadPublisher(address!)?.github ? `@${loadPublisher(address!).github}`  : 'Your GitHub account'}
         </Text>
         </Anchor>
         </Stack>

       { attestation?.profiles?.includes(2n)  ?  <Badge style={{  marginLeft: '40px' }} leftSection={<IconCheck/>} size="lg" color="green" variant="light">
         VERIFIED</Badge>
            
       :
        <Button style={{  marginLeft: '40px', width: '140px' }}
              loading={verifying}
              loaderProps={{type: 'dots', size: 'md'}}
              onClick={async () => { setVerifying(true); await attestPublisher(signer!);  setAttestation(await verificationDetails(address!, chainId)); setVerifying(false); }}
              variant="light"
              radius="md"
              color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
            >
            VERIFY
        </Button> 
        }
         </Group>


        {attestation?.verified  && <Group style={{marginBottom: '40px'}} >
        <Stack gap='5px' style={{width: '300px'}} >
        <Text size="xl" > Trust Score</Text>
        <Rating readOnly value={ Number(attestation?.score) } fractions={2} count={10}/> 
        <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${address}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} onClick={()=> window.open('https://passport.gitcoin.co') } >
             Increase the score by verifying via Gitcoin Passport. learn more..
         </Text>
         </Anchor>
         </Stack>
         </Group>
        }
        </> 
        }

      </Paper>
  

</Container>
  </Paper>
  );
};

export default AccountScreen;