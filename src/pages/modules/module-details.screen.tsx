import { Box, Center, Container, Group, Title, Modal, Text, Image, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, Avatar, Chip, useMantineColorScheme, Anchor, Paper, Badge, GroupProps } from "@mantine/core";
import classes  from "./module-details.screen.module.css";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle, IconPlus, IconShieldCheck, IconApps } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";
// import { attestIntegration, isValidAttestation, createAttestation, loadAttestation, loadAttestationDetails, loadAttestationData, loadAttester, loadPublisher } from "../../logic/attestation";
import { attestIntegration, auditDetails, createAttestation, loadAttestationDetails, loadAttester, loadPublisher, verificationDetails } from "../../logic/attestation";
import { useDisclosure, useHover } from "@mantine/hooks";
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

import { AuditDetailsModal } from "@/components/modals/audit-details.component";



const ModuleDetailsScreen = () => {
  const { hovered, ref } = useHover();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [details,  { open, close }] = useDisclosure(false);
  const dark = colorScheme === "dark";
  const navigate = useNavigate();

  const { chainId } = usePluginStore((state: any) => state);
  const { address, isConnected } = useAccount();


  const [publisherAttestation, setPublisherAttestation ]: any = useState();
  const [auditAttestation, setAuditAttestation ]: any = useState();

  const { pluginDetails } = usePluginStore(
    (state: any) => state
  );



 



  useEffect(() => {

    ;(async () => {
      

      if(!pluginDetails.address) {

        navigate(RoutePath.home)

      }

      try {
        setPublisherAttestation(await verificationDetails(address!, chainId));
        setAuditAttestation(await auditDetails(pluginDetails.address!, chainId));
        
      } catch(e) {
          console.warn(e)
      }

     
      
  })()   
  }, [pluginDetails.publisher])




return (
  ! pluginDetails.metadata ? <PublishDetailsSkeleton /> : 
  <Paper  className={classes.settingsContainer}>
    <AuditDetailsModal open={details}  close={close} auditAttestation={auditAttestation}/>
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
      {pluginDetails.requiresRootAccess && <Badge variant="light" color="orange" style={{fontWeight: 600 }}>
              ROOT ACCESS
      </Badge>
      }
       {!pluginDetails.requiresRootAccess && <Badge variant="light" color="green" style={{fontWeight: 600 }}>
              NO ROOT ACCESS
      </Badge>
      }
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


    { !auditAttestation && 
   
        <Stack> 
            <Group
            style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
        <Skeleton height={80} mt={6} radius="lg"  width="100%" />
        </Group>
        <Group
            style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <Skeleton height={20} mt={6}  radius="xl"  width="100%" />
        </Group>  

        </Stack>  
   }    

     { auditAttestation && <> 
      <Group align='flex-start'>   

      <Group style={{ width: '50%'}}> 
      <Avatar size={60}  src= {loadPublisher(pluginDetails.publisher!)?.logo} alt="attester image" /> 
      <Stack gap='5px'>           
     <Text className={classes.link} size="md" onClick={()=>{ window.open(loadPublisher(address!).link) }}>
     {loadPublisher(pluginDetails.publisher)?.name}
      </Text> 
      <Rating readOnly value={ parseInt(publisherAttestation?.score) } count={10}/>
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
          { ` ${parseInt(publisherAttestation?.score) * 10}/ 100`  }
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
         {  !Object.keys(auditAttestation).length ? 
           <Stack>
           <Alert ref={ref} icon={<IconAlertCircle size="10rem" />}  title="No audits found." color="red" radius="md">
             This module is not audited yet.
          </Alert> 
          <Group>
          <Button 
              // loading={registering}
              onClick={async () => { navigate(RoutePath.moduleAttestation) }}
              leftSection={<IconApps />} 
              variant="light"
              radius="md"
              color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
            >
            ADD AUDIT DETAILS
        </Button>
         </Group>
          </Stack>
         
          :
          <Alert  className={classes.alert} onClick={ open }ref={ref} icon={<IconShieldCheck size="10rem" />}  title="Audited By." color="green" radius="md">

      <Group >  
      <Group> 
    <Avatar size={60} src= {loadAttester(auditAttestation.auditor)?.logo} alt="attester image" /> 
      <Stack gap='5px'>           
     <Text className={classes.link} size="md" onClick={()=>{ window.open(loadAttester(auditAttestation.auditor!).link) }}>
     {loadAttester(auditAttestation.auditor as any)?.name}
      </Text> 
      <Group gap='5px'>           
     <Text fw={700} size="md" onClick={()=>{ window.open(loadAttester(auditAttestation.auditor!).link) }}>
     Issued on
      </Text> 
      <Text className={classes.link} size="sm" >
      { new Date(Number(auditAttestation.issuedAt)).toDateString() }
      </Text> 
      
      </Group>
      </Stack>
      </Group>


      <Stack style={{marginLeft: 'auto', paddingRight: '60px'}}>
      <Text size="sm">
      🛡️ Audit Score 
      </Text>{" "}     
      <Rating size="sm" readOnly value={ Number(auditAttestation.auditScore) } count={10}/>
      </Stack>
      </Group>
            
          </Alert> 
         }
      </Paper>
      </> 
     }
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
