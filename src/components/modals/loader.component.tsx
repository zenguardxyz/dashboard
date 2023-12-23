import { Box, Container, Group, Loader, Modal, Text, Image, useMantineTheme, Center, useMantineColorScheme } from "@mantine/core";


export const LoaderModal = (props: any) => {
    const { text, loading } = props;
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
  
  
    return (
    <Modal
    radius='lg'
    centered
    opened={loading}
    onClose={() => !loading}
    overlayProps={{
      // color: dark ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-2)',
      opacity: 0.3,
      blur: 6,
    }}

    withCloseButton={false}
    size={320}
  >
    <Box style={{ padding: "20px" }}>
      <Group justify='center'>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
        <Loader type="dots" size='xl' color='green'/>
          
          <Text mt={"lg"} ta="center"> { text } </Text>
          {/* <Box style={{ paddingTop: "20px" }}><Center><Image src={''} width={50}/></Center> </Box> */}
          
        </Container>
      </Group>
    </Box>
  </Modal>)

}