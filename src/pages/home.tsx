import React from "react";
import { NavbarSimple } from "../components/SideBar";
import { Text } from "@mantine/core";
import PageLayoutTemplate from "../components/PageLayoutTemplate";

const HomePage = () => {
  const loggedUser: any = localStorage.getItem("loggedUser");
  const user = JSON.parse(loggedUser);

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
      </PageLayoutTemplate>
    </div>
  );
};

export default HomePage;
