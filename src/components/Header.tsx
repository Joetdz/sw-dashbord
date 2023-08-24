import React, { useState } from 'react';
import {
	Navbar,
	Center,
	Tooltip,
	UnstyledButton,
	createStyles,
	Stack,
	rem,
	Image,
} from '@mantine/core';
import {
	IconHome2,
	IconSettings,
	IconLogout,
	IconSwitchHorizontal,
	IconBrandTripadvisor,
	IconUsers,
	IconIdBadge2,
	IconCar,
	IconHotelService,
	IconUsersGroup,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
	link: {
		width: rem(50),
		height: rem(50),
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.white,
		opacity: 0.85,

		'&:hover': {
			opacity: 1,
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background!,
				0.1
			),
		},
	},

	active: {
		opacity: 1,
		'&, &:hover': {
			backgroundColor: theme.fn.lighten(
				theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
					.background!,
				0.15
			),
		},
	},
}));

interface NavbarLinkProps {
	icon: React.FC<any>;
	label: string;
	active?: boolean;
	component?: string;
	onClick?: React.FC<any> | any;
	link?: String | any;
}

function NavbarLink({ icon: Icon, label, active, link }: NavbarLinkProps) {
	const { classes, cx } = useStyles();

	const changeRoute = (
		link: String | any,
		event: React.FC<any> | any
	): void => {
		event.preventDefault();
		window.location.assign(link);
	};

	return (
		<Tooltip
			label={label}
			position='right'
			onClick={(event): any => changeRoute(link, event)}
			transitionProps={{ duration: 0 }}>
			<UnstyledButton
				className={cx(classes.link, { [classes.active]: active })}>
				<Icon
					size='1.2rem'
					stroke={1.5}
				/>
			</UnstyledButton>
		</Tooltip>
	);
}

const mockdata = [
	{ link: '/', label: 'Accueil', icon: IconHome2 },
	// { link: "", label: "Notifications", icon: IconBellRinging },
	{ link: '/trips', label: 'Courses', icon: IconBrandTripadvisor, index: 1 },
	{ link: '/passengers', label: 'Passagers', icon: IconUsers, index: 2 },
	{ link: '/drivers', label: 'Chauffeurs', icon: IconIdBadge2, index: 3 },
	{ link: '/cars', label: 'Voitures', icon: IconCar, index: 4 },
	{ link: '/services', label: 'Services', icon: IconHotelService, index: 5 },
	{ link: '/settings', label: 'Paramètres', icon: IconSettings, index: 6 },
	{ link: '/users', label: 'Utilisateurs', icon: IconUsersGroup, index: 7 },
];

export default function Header() {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [active, setActive] = useState(Number);

	const links = mockdata.map(({ link, index, icon, label }) => (
		<NavbarLink
			key={label}
			active={index === active}
			icon={icon}
			label={''}
			link={link}
		/>
	));

	return (
		<Navbar
			height={'100vh'}
			width={{ base: 80 }}
			p='md'
			sx={{ background: 'black', position: 'fixed' }}>
			<Center>
				<Image src='/favicon.jpg' />
			</Center>
			<Navbar.Section
				grow
				mt={50}>
				<Stack
					justify='center'
					spacing={0}>
					{links}
				</Stack>
			</Navbar.Section>
			<Navbar.Section>
				<Stack
					justify='center'
					spacing={0}>
					<a
						style={{ textDecoration: "none", color: "white" }}
						href={window.location.href}
						onClick={() => {
							localStorage.clear();
							window.location.reload();
						}}>
						<IconSwitchHorizontal stroke={1.5} />
					</a>
					<a
						href={window.location.href}
						onClick={(event) => {
							localStorage.clear();
							window.location.reload();
						}}
						style={{ textDecoration: "none", color: "white" }}>
						<IconLogout stroke={1.5} />
					</a>
				</Stack>
			</Navbar.Section>
		</Navbar>
	);
}
