import { loadAttester } from "@/logic/attestation";
import { AddressUtil } from "@/utils/address";
import { Box, Container, Group, Loader, Modal, Text, Image, useMantineTheme, Center, useMantineColorScheme, Paper, Rating, Stack, Anchor, Alert, Avatar, rgba } from "@mantine/core";
import { IconShieldCheck } from "@tabler/icons";
import classes  from "./modal.module.css";

export const AuditDetailsModal = (props: any) => {
    const { text, open, close, auditAttestation } = props;
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
    <Modal
    radius='lg'
    size="auto" 
    centered
    opened={open}
    onClose={close}
    overlayProps={{
      // color: dark ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-2)',
      opacity: 0.3,
      blur: 6,
    }}

    withCloseButton={false}
  >
    <Box style={{ padding: "20px" }} >

    <Text size="lg" style={{fontWeight: 600, width: 200}}>
              Audit Details 
        </Text>
     
    <Paper withBorder radius="md" p="xl" style={{
                  marginTop: 30
                }} >
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
     
        <Rating style={{ marginLeft:100  }} value={ Number(auditAttestation?.auditScore) } readOnly count={10}/>

        </Group>

        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              Issued On: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
        The data and time of audit issuance
        </Text>
        </Stack>
     
        <Text size="md" style={{fontWeight: 600, width: 200, marginLeft:100 }}>
         { new Date(Number(auditAttestation?.issuedAt)).toDateString() }
        </Text>

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
     
         <Box>
        <Anchor href={auditAttestation?.auditUri} target='_blank' size="md" style={{fontWeight: 600, width: 200, marginLeft:100 }}>
         { auditAttestation?.auditUri ? AddressUtil.shorternURI(auditAttestation?.auditUri) : '-' }
        </Anchor>
        </Box>
        </Group>


        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
              ERCs: 
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
        List of ERCs applicable for the module
        </Text>
        </Stack>
     
        <Text size="md" style={{fontWeight: 600, width: 200, marginLeft:100 }}>
         {  auditAttestation?.ercs?.length ? auditAttestation.ercs.join(', '):'Not Applicable' }
        </Text>

        </Group>

        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
          Audit Hash:
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
        A hash value represeting the audit docs/ meta data that can be verified
        </Text>
        </Stack>
     
        <Text size="md" style={{fontWeight: 600, width: 200, marginLeft:100 }}>
         {  Number(auditAttestation?.auditHash) ? AddressUtil.shorternAddress(auditAttestation?.auditHash) :'-' }
        </Text>

        </Group>

        <Group align='top' style={{marginBlock: 20}}>
        <Stack gap="5px">
        <Text size="md" style={{fontWeight: 600, width: 200}}>
          Audited By:
        </Text>
        <Text size="sm" style={{fontWeight: 400, width: 200}}>
        A hash value represeting the audit docs/ meta data that can be verified
        </Text>
        </Stack>
     
        {/* <Text size="md" style={{fontWeight: 600, width: 200, marginLeft:100 }}>
         {  Number(auditAttestation?.auditHash) ? AddressUtil.shorternAddress(auditAttestation?.auditHash) :'-' }
        </Text> */}

        <Box  style={{ fontWeight: 600, marginLeft:100, padding: '20px', background: rgba("#40c057", 0.1), borderRadius: '10px'}}>
      <Group> 
    <Avatar size={60} src= {loadAttester(auditAttestation?.auditor)?.logo} alt="attester image" /> 
      <Stack gap='5px'>           
     <Text className={classes.link} size="md" onClick={()=>{ window.open(loadAttester(auditAttestation?.auditor).link) }}>
     {loadAttester(auditAttestation?.auditor as any)?.name}
      </Text> 
      <Rating readOnly value={loadAttester(auditAttestation?.auditor)?.trust} count={10}/>
      </Stack>
      </Group>
      </Box> 

        </Group>

   

        </Container>
        </Group>

        
        </Paper>
    </Box>
  </Modal>)

}
