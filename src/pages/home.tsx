import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarSimple } from '../components/SideBar';
import { Text, Stack, Flex, Loader } from '@mantine/core';
import PageLayoutTemplate from '../components/PageLayoutTemplate';
import StatusCard from '../components/StatusCard';
import { PassengersTable } from '../components/Tables/PassengersTable';
import { TripsTable } from '../components/Tables/TripsTable';
import { DriverTable } from '../components/Tables/DriverTable';
import { getTrips } from '../store/features/trips/thunk';
import { getDrivers } from '../store/features/drivers/thunk';
import { getPassengers } from '../store/features/passengers/thunk';
import Header from '../components/Header';

const dateConverter = (time: any) => {
	return new Date(time * 1000).toDateString();
};

const HomePage = () => {
	const loggedUser: any = localStorage.getItem('loggedUser');
	const user = JSON.parse(loggedUser);
	const [windowSize, setWindowSize] = useState([
		window.innerWidth,
		window.innerHeight,
	]);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	const status = [
		{
			text: 'Revenus Courses',
			result: `${12} FC`,
			background: '#f91942',
			//   icon: <BsCurrencyDollar />,
		},
		{
			text: 'Courses terminées',
			result: 12,

			// finishedTrips.length,
			background: '#01101e',
			//   icon: <IoCheckmarkDoneOutline />,
		},
		{
			text: 'Courses en cours',
			result: 40,
			// tripsInProgres.length,
			background: '#0c3966',
			//   icon: <AiOutlineLoading3Quarters />,
		},
	];

	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(getTrips());
		dispatch(getPassengers());
		dispatch(getDrivers());
	}, [dispatch]);

	const miliseconds = 1604395966369;
	const date = new Date().toDateString();

	const currentDate = new Date();
	const timestamp = currentDate.getTime();

	const trips = useSelector((state: any) => state.trips);

	const dayTrips = trips.items.filter(
		(trips: any) => dateConverter(trips.timeStamps.command._seconds) === date
	);

	// console.log(
	//   trips.items.map((trips: any) =>
	//     dateConverter(trips.timeStamps.command._seconds) === date,
	//   ),
	// );

	// console.log({ dayTrips, date });

	// console.log(
	//   new Date(trips.items.timeStamps.command._seconds * 1000).toLocaleString(),
	// );
	console.log(dayTrips);

	const passengers = useSelector((state: any) => state.passengers);
	const drivers = useSelector((state: any) => state.drivers);
	return (
		<div style={{ display: 'flex' }}>
			{windowSize[0] <= 768 ? <Header /> : <NavbarSimple />}
			<PageLayoutTemplate>
				<Text
					fw={700}
					size='xl'>
					Bienvenue {user?.firstName}
				</Text>
				<Text
					fw={500}
					size='md'>
					Voici ce qui se passe sur vos applications
				</Text>

				{drivers.isLoading || passengers.isLoading || trips.isLoading ? (
					<Flex
						align='center'
						justify='center'
						sx={{ height: '100%', width: '100%' }}>
						<Loader />
					</Flex>
				) : (
					<Flex
						direction='column'
						sx={{ width: '100%', margin: '1em auto', height: '100%' }}>
						{dayTrips.length <= 0 ? (
							<Text
								fw={700}
								size='xl'>
								Aucune course aujourd'hui
							</Text>
						) : (
							<>
								<Text
									fw={700}
									size='xl'>
									Les courses du jour
								</Text>
								<TripsTable data={dayTrips} />

								{/* <DriverTable data={drivers.items} />
                <PassengersTable data={passengers.items} /> */}
							</>
						)}
					</Flex>
				)}
				{/* <Flex
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
        </Flex> */}
			</PageLayoutTemplate>
		</div>
	);
};

export default HomePage;
