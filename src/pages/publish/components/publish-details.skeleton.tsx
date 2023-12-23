import { Box, Center, Container, Group, Title, Modal, Text, Image, Paper, Stack, Button, TextInput, Divider, Alert, Skeleton, Rating, useMantineTheme, Avatar, Chip, useMantineColorScheme, Badge, Select, Anchor } from "@mantine/core";
import classes  from "./publish-details.skeleton.module.css";
import { IconAlertCircle,  IconApps } from "@tabler/icons";
import {  useEffect, useState } from "react";
import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";




const PublishDetailsSkeleton= () => {
  const { hovered, ref } = useHover();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const navigate = useNavigate();




  return (
    <Paper  className={classes.settingsContainer}>
    <Container className={classes.formContainer}>
        
      <Title size="20">Plugin Details</Title>

      <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>

          <Stack>
          <Group style={{ justifyContent: "space-between" }}>
            <Group>
            <Skeleton height={70} mt={6} radius="lg"  width="80px" />
              <Stack>
            <Skeleton height={15} mt={6} radius="lg"  width="100px" />
             <Skeleton height={15} mt={6} radius="lg"  width="100px" />
              </Stack>
            </Group>
            <Skeleton height={35} mt={6} radius="sm"  width="15%" />

          </Group> 

     
        <>
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
        </>

        </Stack>
      </Paper>

      <Paper withBorder radius="md" p="xl" style={{
                    marginTop: 30
                  }}>

          <Stack>
          <Group style={{ justifyContent: "space-between" }}>
            <Skeleton height={20} mt={6} radius="lg"  width="20%" />

          </Group> 

     
        <>
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
        </>

        </Stack>
      </Paper>

  </Container>
  </Paper>
  );
};

export default PublishDetailsSkeleton;