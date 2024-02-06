import { Box, Center, Container, Group, Title, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, useMantineTheme, Avatar, Chip, useMantineColorScheme, Badge, Select, Anchor } from "@mantine/core";
import PublishDetailsSkeleton  from './components/publish-details.skeleton';

import classes  from "./publish-details.screen.module.css";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle,  IconApps, IconConfetti, IconShield, IconShieldCheck, IconShieldLock } from "@tabler/icons";
import {  useEffect, useState } from "react";
import {  loadPluginDetails  } from "../../logic/plugins";
import {  addIntegration, loadPublisher, verificationDetails } from "../../logic/attestation";
import { useHover } from "@mantine/hooks";
import { useAccount } from "wagmi";
import Safe from "../../assets/icons/safe.png";
import ETH from "../../assets/icons/eth.svg";
import X from "../../assets/icons/x.png";

import { RoutePath } from "../../navigation";
import { useNavigate } from "react-router-dom";
import { NetworkUtil } from "../../logic/networks";
import { AddressUtil } from "@/utils/address";
import { useEthersSigner } from "@/utils/wagmi";
import { LoaderModal } from "@/components/modals/loader.component";



const PublishDetailsScreen= () => {
  const { hovered, ref } = useHover();
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();


  const { address, isConnected } = useAccount();
  const [ loading, setLoading ] = useState(false);
  
  
  const [attestation, setAttestation]: any = useState();
 
  const { pluginDetails, setPluginDetails, chainId } = usePluginStore(
    (state: any) => state
  );
  const sign = useEthersSigner(chainId);
  const [ signer, setSigner ] = useState(sign);

  useEffect(() => {
    const fetchData = async() => {
        try {
          setPluginDetails({...pluginDetails, ...(await loadPluginDetails(pluginDetails.address, chainId))});
          setAttestation(await verificationDetails(address!, chainId));
        } catch(e) {
            console.warn(e)
        }

    }
    fetchData();
    setSigner(sign);
}, [sign, address])


  async function publishModule() {

    try {
    setLoading(true);
    await addIntegration(pluginDetails.address, signer!); 
    setLoading(false);
    navigate(RoutePath.home);
    }
    catch {
      setLoading(false);
    }

  }
  


  return (
    ! pluginDetails.metadata ? <PublishDetailsSkeleton /> : 
    <Paper  className={classes.settingsContainer}>
      <LoaderModal loading={loading} text={"Publishing your module. Hang tight ⏲️"} />
    <Container className={classes.formContainer}>
        
      <Title size="20">Plugin Details</Title>

      <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>
        <Group align='flex-start'>         
        <Group
        style={{fontWeight: 600, width: 200}}
        >     
        <Image src={ pluginDetails.metadata?.iconUrl ? pluginDetails.metadata?.iconUrl : Safe } w = {65} h={65}  />   
        <Stack>           
        <Text size="md" style={{fontWeight: 600}}>
        {pluginDetails.metadata?.name}
        </Text>{" "}

        <Text size="sm" style={{fontWeight: 600}}>
              ⚙️ Version: {pluginDetails.metadata?.version}
        </Text>

        </Stack>
        </Group>  
    

          <Button style={{  marginLeft:100 }}
                // loading={registering}
                onClick={() => { window.open(pluginDetails.metadata.appUrl) }}
                leftSection={<IconApps />} 
                variant="light"
                radius="md"
                color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
              >
              APP LINK
          </Button>
          </Group>
        <Group align='center' style={{marginBlock: 20}}>
        <Text size="lg" style={{fontWeight: 600, width: 200}}>
              Module Address: 
        </Text>
        <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${pluginDetails.address}`}>
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 600, marginLeft:100 }}>
               {pluginDetails.address}
        </Text>
        </Anchor>
        </Group>

        <Group align='center'  style={{marginBlock: 25}}>
        <Stack gap="5px">
        <Text size="lg" style={{fontWeight: 600, width: 200}}>
              Module Permissions:
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              Module Permissions (Root, Admin etc.)
        </Text>
        </Stack>
        {pluginDetails.requiresRootAccess && <Badge variant="light" color="orange" style={{fontWeight: 600,  marginLeft:100 }}>
              ROOT ACCESS
        </Badge>
        }
        {!pluginDetails.requiresRootAccess && <Badge variant="light" color="green" style={{fontWeight: 600,  marginLeft:100  }}>
              NO ROOT ACCESS
        </Badge>
        }
        </Group>

        <Group align='center' style={{marginBlock: 0}}>
        <Stack gap="5px">
        <Text size="lg" style={{fontWeight: 600, width: 200}}>
              Module Type
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              Module type (Plugin, Hook etc.)
        </Text>
        </Stack>
        <Select
              style={{fontWeight: 600, marginLeft:100 }}
              size="md"
              placeholder="Plugin"
              data={['Plugin', 'Hook', 'Function Handlers', 'Verifiers']}
        />
        </Group>


          </Paper>

          <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }} >

          <Stack>
          <Group style={{ justifyContent: "space-between" }}>
            <Text size="md" style={{fontWeight: 600}}>
              Publisher details 
            </Text>{" "}

          </Group> 

        <> 


        <Group align='flex-start'>   

        <Group style={{ width: '50%'}}> 
        <Avatar size={60}  src= {loadPublisher(address!)?.logo} alt="attester image" /> 
        <Stack gap='5px'>           
       <Text className={classes.link} size="md" onClick={()=>{ window.open(loadPublisher(address!).link) }}>
         { loadPublisher(address!)?.name }
        </Text> 
        <Rating readOnly value={ parseInt(attestation?.score) } count={10}/>
        </Stack>
        </Group>

        <Group >
        <Avatar size={30}  src= {ETH} alt="attester image" /> 
        <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${address}`}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
            {isConnected ? AddressUtil.shorternAddress(address!) : ''}
         </Text>
         </Anchor>
         </Group>
        </Group> 


        <Group align='flex-start'>   
        
        <Group style={{ width: '50%'}}> 
          <IconShieldCheck size='30px' color='green' /> 
          <Group gap='5px'>           
          <Text className={classes.link} size="md" >
            Trust Score:
          </Text> 
          <Text size="md" style={{fontWeight: 800}}>
            { `${attestation?.score ?  parseInt(attestation?.score) * 10 : 0} / 100` }
          </Text>         
          </Group>
          </Group>

          <Group>
          <Image style={{ width: 25 }}  src= {X}  /> 
          <Anchor target='_blank' href={loadPublisher(address!)?.link}>           
          <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
           { loadPublisher(address!)?.x }
            </Text>
            </Anchor>
            </Group>
          </Group>     

       
        </> 


          <Group >  


        </Group >

           </Stack>
          </Paper> 
          <Stack gap='20px'
                          style={{
                            marginTop: '20px ',
                            // marginLeft: '40px ',
                            alignSelf: 'start'
                          }}>




        { attestation?.verified && <Alert ref={ref} icon={<IconConfetti size="10rem" />}  title="Eligible to publish" color="green" radius="md" style={{width: '50%'}}>
               Your account has required creds to publish the module 🎊
         </Alert> }

        { ! attestation?.verified && <Alert ref={ref} icon={<IconAlertCircle size="10rem" />}  title="Not eligible to publish" color="red" radius="md" style={{width: '50%'}}>
               Your account doesn't have the required creds to publish the module 
         </Alert> 
        }
                      <Button
                // loading={registering}
                // onClick={() => { setPluginDetails({address}); navigate(RoutePath.publishDetails)}}
                onClick={async ()=>  { await publishModule();}}
                leftSection={<IconApps />}
                size='md'
                variant="filled"
                color='green'
                style={{
                  alignSelf: 'start'
                }}
              >
               Publish Now
        </Button>
        </Stack>
           

  </Container>
  </Paper>
);
};

export default PublishDetailsScreen;