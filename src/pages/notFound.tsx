import React from "react";
import { Flex } from "@mantine/core";
import { NavbarSimple } from "../components/SideBar";
import PageLayoutTemplate from "../components/PageLayoutTemplate";

import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  rem,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
// import { Illustration } from "./Illustration";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  inner: {
    position: "relative",
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    paddingTop: rem(220),
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const NotFoundPage = () => {
  const { classes } = useStyles();
  return (
    // <div>
    //   <NavbarSimple />
    //   <PageLayoutTemplate>
    //     <Flex
    //       align="center"
    //       justify="center"
    //       sx={{ height: "100%", width: "100%" }}>Not Found</Flex>
    //   </PageLayoutTemplate>
    // </div>
    <Container className={classes.root}>
      <div className={classes.inner}>
        {/* <Illustration className={classes.image} /> */}
        <Image
          maw={240}
          mx="auto"
          radius="md"
          src="/logo-gari.png"
          alt="Random image"
          className={classes.image}
          sx={{ margin: "1em 0" }}
        />

        <div className={classes.content}>
          <Title className={classes.title}>Il n'y a rien ici</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}>
            La page que vous essayez d'ouvrir n'existe pas. Il se peut que vous
            ayez mal saisi l'adresse ou que la page ait été déplacée vers un
            autre URL. l'adresse, ou la page a été déplacée vers une autre URL.
            Si vous pensez qu'il s'agit d'une qu'il s'agit d'une erreur,
            contactez l'assistance.
          </Text>
          <Group position="center">
            <Button size="md">
              <Link to="/" style={{ color: "#FFFFFF !important" }}>
                Retourner à la page d'accueil
              </Link>
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
