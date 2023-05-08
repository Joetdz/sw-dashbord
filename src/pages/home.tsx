import React from "react";
import { NavbarSimple } from "../components/SideBar";
import { Text, Stack, Flex } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";
import StatusCard from "../components/StatusCard";

const HomePage = () => {
  const loggedUser: any = localStorage.getItem("loggedUser");
  const user = JSON.parse(loggedUser);

  const status = [
    {
      text: "Revenus Courses",
      result: `${12} FC`,
      background: "#f91942",
      //   icon: <BsCurrencyDollar />,
    },
    {
      text: "Courses terminées",
      result: 12,

      // finishedTrips.length,
      background: "#01101e",
      //   icon: <IoCheckmarkDoneOutline />,
    },
    {
      text: "Courses en cours",
      result: 40,
      // tripsInProgres.length,
      background: "#0c3966",
      //   icon: <AiOutlineLoading3Quarters />,
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <NavbarSimple />

      <PageLayoutTemplate>
        <Text fw={700} size="xl">
          Bienvenue {user?.firstName}
        </Text>
        <Text fw={500} size="md">
          Voici ce qui se passe sur vos applications
        </Text>
        <Flex
          mih={100}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="nowrap"
          sx={{ width: "100%", marginTop: "1em" }}>
          {status.map((stat: any) => (
            <StatusCard text={stat.text} count={stat.result} />
          ))}
        </Flex>
      </PageLayoutTemplate>
    </div>
  );
};

export default HomePage;
