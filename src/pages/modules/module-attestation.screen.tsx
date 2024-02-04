import { Box, Center, Container, Group, Title, Modal, Text, Image, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, Avatar, Chip, useMantineColorScheme, Anchor, Paper, Badge, Accordion, Collapse } from "@mantine/core";
import { DateTimePicker, DateValue } from '@mantine/dates';
import classes  from "./module-details.screen.module.css";
import usePluginStore from "../../store/plugin/plugin.store";
import { IconAlertCircle, IconPlus, IconShieldCheck, IconApps, IconRubberStamp, IconUser, IconSettings } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";
import { attestIntegration, isValidAttestation, createAttestation, loadAttestation, loadAttestationDetails, loadAttestationData, loadAttester, ZERO_BYTES32 } from "../../logic/attestation";
import { loadPublisher, verificationDetails } from "../../logic/attestation";
import { useDisclosure, useHover } from "@mantine/hooks";
import { useAccount, useChainId } from "wagmi";


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



const ModuleAttestationScreen = () => {
  const { hovered, ref } = useHover();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();

  const { chainId } = usePluginStore((state: any) => state);
  const { address, isConnected } = useAccount();


  const [advance, { toggle }] = useDisclosure(false);
  const [attested, setAttested] = useState(false);
  const [attestModal, setAttestModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enabling, setEnabling] = useState(false);

  const [issuedAt, setIssuedAt] = useState<DateValue>(new Date());
  const [auditUri, setAuditUri] = useState('');
  const [auditHash, setAuditHash] = useState(ZERO_BYTES32);
  const [auditorSignature, setAuditorSignature] = useState('0x');
  const [auditScore, setAuditScore] = useState(0);

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
        setAttestation(await verificationDetails(address!, chainId));
      } catch(e) {
          console.warn(e)
      }

      setSigner(sign);

  })()   
  }, [sign, pluginDetails.publisher])


const handleAddAttestation = async () => {

  try {

  setCreating(true);
  const attestationId = await createAttestation([address, issuedAt?.valueOf(), [], pluginDetails.address, auditHash, auditUri, auditScore, auditorSignature], sign!);
  const attestation = await loadAttestationDetails(attestationId, chainId);

  console.log(attestation)

  setAttestation(attestation);
  setAttested(true);
  setCreating(false);
  setLoading(true);
  await attestIntegration(pluginDetails.address, attestationId, sign!)
  setLoading(false);
  }
  catch(e) {

    setCreating(false);
    setLoading(false);

  }
  
  
}

return (
  ! pluginDetails.metadata ? <PublishDetailsSkeleton /> : 
  <Paper  className={classes.settingsContainer}>
    <LoaderModal loading={loading || creating} text={ creating ? "Attesting your module. Hang tight ⏲️" : "Attesting your module. almost there ⏲️"} />
  <Container className={classes.formContainer}>
      
    <Title size="20">Add Audit Details</Title>

    <Paper withBorder radius="md" p="xl" style={{
                  marginTop: 30
                }}>
        <Group>
          
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              
              // alignItems: "center",
              marginLeft: "5px",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
         


        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              Audit Score: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              Consolidated score for the audit
        </Text>
        </Stack>
     
        <Rating style={{ marginLeft:100  }} onChange={setAuditScore} defaultValue={auditScore} count={10}/>

        </Group>

        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              Issuance Date/Time: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              The data and time of audit issuance
        </Text>
        </Stack>
        <DateTimePicker style={{marginLeft: 100}}  onChange={(date) => setIssuedAt(date)} defaultValue={new Date()} placeholder="Pick date and time" />

        </Group>
        

        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              Audit Document Link: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              Finalized document link for the audit
        </Text>
        </Stack>
     
        <TextInput
              style={{ marginLeft:100  }}
              onChange={(event) => setAuditUri(event.currentTarget.value)}
              placeholder="Audit proof doc link"
              // label="Document link"
              size="md"
            />
            

        </Group>

        <Group  mb={5}>
        <Button leftSection={<IconSettings/>} onClick={toggle}
        variant="light"
        radius="md"
        color={dark ? 'var(--mantine-color-white-7)' : 'var(--mantine-color-gray-7)'}
        
        >Advance Details</Button>
      </Group>      
        
      <Collapse in={advance}>
      <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              Audit Hash: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              A hash value represeting the audit docs/ meta data that can be verified
        </Text>
        </Stack>
     
        <TextInput
              style={{ marginLeft:100  }}
              onChange={(event) => setAuditHash(event.currentTarget.value)}
              placeholder="Audit Hash"
              // label="Document link"
              size="md"
            />
            

        </Group>
        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              Auditor Signature: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              Signature to verify the audit details
        </Text>
        </Stack>
     
        <TextInput
              style={{ marginLeft:100  }}
              onChange={(event) => setAuditorSignature(event.currentTarget.value)}
              placeholder="Auditor Signature"
              // label="Document link"
              size="md"
            />
        </Group>
        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              ERCs: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
              List of ERCs separated by comma
        </Text>
        </Stack>
     
        <TextInput
              style={{ marginLeft:100  }}
              // onChange={(event) => setDocLink(event.currentTarget.value)}
              placeholder="ERCs"
              // label="Document link"
              size="md"
            />
        </Group>
      </Collapse>
  
          </Container>
        </Group>


        </Paper>
        <Stack>



    <Alert  icon={<IconShieldCheck size="10rem" />} title='Audited By'  color="green" radius="md" style={{width: '50%',  marginTop: '30px'}}>
      <Group> 
    <Avatar size={60} src= {loadAttester(address!)?.logo} alt="attester image" /> 
      <Stack gap='5px'>           
     <Text className={classes.link} size="md" onClick={()=>{ window.open(loadAttester(address!).link) }}>
     {loadAttester(address as any)?.name}
      </Text> 
      <Rating readOnly value={loadAttester(address!)?.trust} count={10}/>
      </Stack>
      </Group>
      </Alert>       



        </Stack>

        <Button
                onClick={() => { handleAddAttestation()}}
                leftSection={<IconRubberStamp />} 
                size='md'
                variant="filled"
                color='green'
                style={{
                  marginTop: '30px '
                }}
              >
               Add Attestation
        </Button>
         

</Container>
</Paper>
);
};

export default ModuleAttestationScreen;


