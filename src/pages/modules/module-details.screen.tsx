import { Box, Center, Container, Group, Title, Modal, Text, Image, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, Avatar, Chip, useMantineColorScheme, Anchor, Paper, Badge } from "@mantine/core";
import classes  from "./module-details.screen.module.css";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle, IconPlus, IconShieldCheck, IconApps } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";
// import { attestIntegration, isValidAttestation, createAttestation, loadAttestation, loadAttestationDetails, loadAttestationData, loadAttester, loadPublisher } from "../../logic/attestation";
import { loadPublisher, verificationDetails } from "../../logic/attestation";
import { useHover } from "@mantine/hooks";
import { useAccount } from "wagmi";


import Safe from "../../assets/icons/safe.png";
import ETH from "../../assets/icons/eth.svg";
import X from "../../assets/icons/x.png";
import { RoutePath } from "../../navigation";
import { useNavigate } from "react-router-dom";
import { getProvider } from "../../logic/web3";
import { NetworkUtil } from "../../logic/networks";
import { AddressUtil } from "@/utils/address";
import PublishDetailsSkeleton from "../publish/components/publish-details.skeleton";
import { LoaderModal } from "@/components/modals/loader.component";
import { useEthersSigner } from "@/utils/wagmi";



const ModuleDetailsScreen = () => {
  const { hovered, ref } = useHover();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();

  const { chainId, setChainId } = usePluginStore((state: any) => state);
  const { address, isConnected } = useAccount();


  const [attested, setAttested] = useState(false);
  const [attestModal, setAttestModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const [docLink, setDocLink] = useState('');
  const [rating, setRating] = useState(5);
  const [attestation, setAttestation ]: any = useState();
  const [attestationData, setAttestationData ]: any = useState();

  const sign = useEthersSigner(chainId);
  const [ signer, setSigner ] = useState(sign);

 
  const { pluginDetails } = usePluginStore(
    (state: any) => state
  );



 



  useEffect(() => {

    ;(async () => {
      

      if(!pluginDetails.address) {

        navigate(RoutePath.home)

      }

      try {
        setAttestation(await verificationDetails(address!));
      } catch(e) {
          console.warn(e)
      }

     
      // try {

      //   const provider =  await getProvider()
      //   const chainId =  (await provider.getNetwork()).chainId
      //   setChainId(chainId)
      //   const attestionId = await loadAttestation(pluginDetails.address)
      //   setAttested(await isValidAttestation(attestionId))

      //   const attestation = await loadAttestationDetails(attestionId);
        


      //   setAttestation(attestation);
      //   setAttestationData(await loadAttestationData(attestation.data))
    
      // }
      // catch(e)
      // {
      //   setAttestation({})
      //   console.log(e)
      // }
      
  })()   
  }, [sign, pluginDetails.publisher])



// const handleAddAttestation = async () => {

//   setAttestModal(false);
//   setCreating(true);
//   const attestationId = await createAttestation([docLink, rating]);
//   const attestation = await loadAttestationDetails(attestationId);

//   console.log(attestation)

//   setAttestation(attestation);
//   setAttested(true);
//   setCreating(false);
//   setLoading(true);
//   await attestIntegration(pluginDetails.address, attestationId)
//   setLoading(false);
  
  
// }

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
      style={{fontWeight: 600}}
      >     
      <Image src={ pluginDetails.metadata?.iconUrl ? pluginDetails.metadata?.iconUrl : Safe } w = {65} h={65}  />   
      <Stack>  
      <Anchor c='var(--mantine-color-gray-7)' target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${pluginDetails.address}`}>         
      <Text size="md" style={{fontWeight: 600}}>
      {pluginDetails.metadata?.name}
      </Text>{" "}
      </Anchor>
      <Group>
      <Text size="sm" style={{fontWeight: 600}}>
            ⚙️ Version: {pluginDetails.metadata?.version}
      </Text>
      <Badge variant="light" color="orange" style={{fontWeight: 600 }}>
            ROOT ACCESS
      </Badge>
      </Group>

      </Stack>
      </Group>  
  

        <Button style={{  marginLeft: 'auto' }}
              // loading={registering}
              onClick={() => { window.open(pluginDetails.metadata.appUrl) }}
              leftSection={<IconApps />} 
              variant="light"
              radius="md"
              color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
            >
            OPEN APP
        </Button>

        <Button 
              // loading={registering}
              onClick={() => { window.open(pluginDetails.metadata.appUrl) }}
              leftSection={<IconPlus />} 
              radius="md"
              color='green'
            >
            ENABLE
        </Button>
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
      <Avatar size={60}  src= {loadPublisher(pluginDetails.publisher!)?.logo} alt="attester image" /> 
      <Stack gap='5px'>           
     <Text className={classes.link} size="md" onClick={()=>{ window.open(loadPublisher(address!).link) }}>
     {loadPublisher(pluginDetails.publisher)?.name}
      </Text> 
      <Rating readOnly value={ 5 } count={10}/>
      </Stack>
      </Group>

      <Group >
      <Avatar size={30}  src= {ETH} alt="attester image" /> 
      <Anchor target='_blank' href={`${NetworkUtil.getNetworkById(chainId)?.blockExplorer}/address/${address}`}>           
      <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
          {isConnected ? AddressUtil.shorternAddress(pluginDetails.publisher!) : ''}
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
          { ` ${parseInt(attestation?.score) * 10}/ 100`  }
        </Text>         
        </Group>
        </Group>

        <Group>
        <Image style={{ width: 25 }}  src= {X}  /> 
        <Anchor target='_blank' href={loadPublisher(address!)?.link}>           
        <Text size="md" color='var(--mantine-color-gray-6)' style={{fontWeight: 400}} >
            {`@${loadPublisher(pluginDetails.publisher)?.x}`}
          </Text>
          </Anchor>
          </Group>
        </Group>     
      <Divider />

      <Group style={{ justifyContent: "space-between" }}>
          <Text size="md" style={{fontWeight: 600}}>
            Audit details 
          </Text>{" "}

        </Group> 

      <Paper >
          <Alert ref={ref} icon={<IconAlertCircle size="10rem" />}  title="No audits found." color="red" radius="md">
             This module is not audited yet.
          </Alert> 
      </Paper>


      {/* <Group >  
      <Text size="m" >
      🛡️ Audit Rating 
      </Text>{" "}     
      <Rating readOnly value={ 5 } count={10}/>
      </Group> */}
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


      </Stack>
         

</Container>
</Paper>
);
};

export default ModuleDetailsScreen;
