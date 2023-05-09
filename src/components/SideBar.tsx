import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
  Image,
} from "@mantine/core";
import {
  IconBellRinging,
  IconCar,
  IconBrandTripadvisor,
  IconSettings,
  IconHotelService,
  IconReceipt2,
  IconIdBadge2,
  IconSwitchHorizontal,
  IconLogout,
  IconHome2,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
// import { MantineLogo } from "@mantine/ds";
import { useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : "#FFFFFF",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : "#F9A507",
      color: theme.colorScheme === "dark" ? "#F9A507" : theme.white,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : "#FFFFFF",
    marginRight: theme.spacing.sm,
    "&:hover": {
      color: "#FFFFFF",
    },
  },

  linkActive: {
    "&, &:hover": {
      // backgroundColor: theme.fn.variant({
      //   variant: "light",
      //   color: "#F9A507",
      // }).background,
      backgroundColor: "#F9A507",
      // color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      //   .color,
      color: "#FFFFFF",
      [`& .${getStylesRef("icon")}`]: {
        // color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        //   .color,
        color: "#FFFFFF",
      },
    },
  },
}));

const data = [
  { link: "/", label: "Accueil", icon: IconHome2 },
  // { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "/trips", label: "Courses", icon: IconBrandTripadvisor },
  { link: "/passengers", label: "Passagers", icon: IconUsers },
  { link: "/drivers", label: "Chauffeurs", icon: IconIdBadge2 },
  { link: "/cars", label: "Voitures", icon: IconCar },
  { link: "/services", label: "Services", icon: IconHotelService },
  { link: "/settings", label: "Paramètres", icon: IconSettings },
  { link: "/users", label: "Utilisateurs", icon: IconUsersGroup },
];

export function NavbarSimple() {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(location.pathname);

  const navigate = useNavigate();

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      to={`${item.link}`}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(`${item.link}`, { replace: false });
      }}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar
      height={"100vh"}
      width={{ sm: 300 }}
      p="md"
      sx={{ background: "#0C3966", position: "fixed", color: "#FFFFFF" }}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Image
            maw={240}
            mx="auto"
            radius="md"
            src="/logo-gari.png"
            alt="Random image"
          />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            localStorage.clear();
            window.location.reload();
          }}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Changer de compte</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            localStorage.clear();
            window.location.reload();
          }}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Déconnexion</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
