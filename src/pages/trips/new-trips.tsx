import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Flex, Button, Loader, Select, TextInput, CopyButton, ActionIcon, Tooltip, rem, NativeSelect } from "@mantine/core";
import PageLayoutTemplate from "../../components/PageLayoutTemplate";
import { useForm } from "@mantine/form";
import {
    IconLink,
    IconCheck
} from "@tabler/icons-react";
import { NavbarSimple } from "../../components/SideBar";
import Header from "../../components/Header";
import { getDrivers } from "../../store/features/drivers/thunk";
import Maps from "../../components/Map/GoogleMap";
import { createTrip } from "../../store/features/trips/thunk";
import { getCars } from "../../store/features/cars/thunk";
import { useNavigate } from "react-router-dom";


const NewTrip = () => {
    const PAGE_SIZES = [10, 15, 20];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
    const [searchValue, setSearchValue] = useState('');
    const [searchCarValue, setSearchCarValue] = useState('');
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const form = useForm({
        initialValues: {
            passenger: {
                name: "",
                phone: ""
            },
            locations: {
                from: {
                    name: "",
                    latitude: 0,
                    longitude: 0,
                },
                to: {
                    name: "",
                    latitude: 0,
                    longitude: 0,
                },
                distance: 0
            },
            car: {
                uid: "",
                model: ""
            },
            driver: {
                name: "",
                uid: "",
                phone: ""
            },
            taxType: ""
        },
    });

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    useEffect(() => {
        setPage(1);
        dispatch(getDrivers());
        dispatch(getCars());

        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [dispatch, pageSize]);

    const [page, setPage] = useState(1);

    const drivers = useSelector((state: any) => state.drivers);

    const trips = useSelector((state: any) => state.trips);
    const tripsLocation = useSelector((state: any) => state.trips.locations);
    const cars = useSelector((state: any) => state.cars)

    const items: { label: string, value: string, car: string }[] = drivers.items.map((driver: any) => ({ label: driver.name, value: driver.uid }));
    const carsList: { label: string, value: string }[] = cars.items.map((car: any) => ({ label: car.model, value: car.uid }));

    return (
        <div style={{ display: "flex" }}>
            {windowSize[0] <= 768 ? <Header /> : <NavbarSimple />}
            <PageLayoutTemplate>
                {trips.isSaving ? (
                    <Flex
                        align="center"
                        justify="center"
                        sx={{ height: "100%", width: "100%" }}>
                        <Loader />
                    </Flex>
                ) : (
                    <Container>
                        {showPopup && (
                            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px", backgroundColor: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
                                <td><CopyButton value={`${process.env.REACT_APP_CHRONO_DOMAIN}/trips/${trips.new.id}`} timeout={2000}>
                                    {({ copied, copy }) => (
                                        <Tooltip label={copied ? 'Copié' : 'Copier'} withArrow position="right">
                                            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                                {copied ? (
                                                    <IconCheck style={{ width: rem(16) }} />
                                                ) : (
                                                    <IconLink style={{ width: rem(16) }} />
                                                )}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </CopyButton></td>
                                <Button onClick={() => setShowPopup(false)}>Close</Button>
                            </div>
                        )}
                        <form
                            onSubmit={form.onSubmit(async () => {
                                await dispatch(createTrip(
                                    {
                                        passenger: {
                                            name: form.values.passenger.name,
                                            phone: form.values.passenger.phone
                                        },
                                        locations: tripsLocation,
                                        car: {
                                            uid: form.values.car.uid,
                                            model: form.values.car.model,
                                        },
                                        driver: {
                                            name: form.values.driver.name,
                                            uid: form.values.driver.uid,
                                            phone: form.values.driver.phone
                                        },
                                        taxType: form.values.taxType

                                    }
                                ));

                                setShowPopup(true);
                                navigate("/trips", { replace: true });
                            })}>
                            <TextInput
                                placeholder="Nom du passager"
                                label="Nom du passager"
                                withAsterisk
                                required
                                value={form.values.passenger.name}
                                onChange={(event) =>
                                    form.setFieldValue("passenger.name", event.currentTarget.value)
                                }
                            />
                            <TextInput
                                type="number"
                                placeholder={`+243810000000`}
                                label={`Numéro de téléphone du passager`}
                                rightSectionWidth={92}
                                required
                                onChange={(event) =>
                                    form.setFieldValue("passenger.phone", event.currentTarget.value)
                                }
                            />

                            <Select
                                label="Chauffeur"
                                placeholder="Assigner un chauffeur"
                                data={drivers.items && items}
                                sx={{ color: "black" }}
                                searchable
                                searchValue={searchValue}
                                onSearchChange={setSearchValue}
                                value={form.values.driver.uid}
                                required
                                onChange={(option: string) => {
                                    form.setFieldValue("driver.uid", option);
                                    form.setFieldValue("driver.name", drivers.items.find((item: any) => item.uid === option).name)
                                    form.setFieldValue("driver.phone", drivers.items.find((item: any) => item.uid === option).phone)
                                }}
                            />

                            <Select
                                label="Voiture"
                                placeholder="Selectionner une voiture"
                                data={cars.items && carsList}
                                sx={{ color: "black" }}
                                searchable
                                searchValue={searchCarValue}
                                onSearchChange={setSearchCarValue}
                                value={form.values.car.uid}
                                required
                                onChange={(option: string) => {
                                    form.setFieldValue("car.uid", option)
                                    form.setFieldValue("car.model", cars.items.find((item: any) => item.uid === option).model)
                                }}
                            />
                            <NativeSelect
                                label="Tarification de la course"
                                placeholder="Sélectionner le type"
                                data={[
                                    { value: "--", label: "--" },
                                    { value: "minute", label: "Minute" },
                                    { value: "km", label: "KM" },
                                    { value: "hour", label: "Heure" },
                                ]}
                                required
                                onChange={
                                    (event) => {
                                        form.setFieldValue("taxType", event.currentTarget.value)
                                    }
                                }
                            />
                            <Flex sx={{ height: '100vh', marginTop: "25px" }}>

                                <Maps />
                            </Flex>

                            <Button type="submit">Enregistrer</Button>
                        </form>
                    </Container>
                )
                }
            </PageLayoutTemplate>
        </div>
    )
}

export default NewTrip