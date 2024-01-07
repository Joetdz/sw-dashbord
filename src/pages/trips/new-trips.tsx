import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Flex, Group, Button, Loader, Select, Text, TextInput, NativeSelect, rem } from "@mantine/core";
import PageLayoutTemplate from "../../components/PageLayoutTemplate";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { NavbarSimple } from "../../components/SideBar";
import Header from "../../components/Header";
import { DataTable } from "mantine-datatable";
import { useNavigate } from 'react-router-dom';
import { getDrivers } from "../../store/features/drivers/thunk";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from "../../components/Map/GoogleMap";



const NewTrip = () => {
    const PAGE_SIZES = [10, 15, 20];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
    const [searchValue, setSearchValue] = useState('');
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
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
                model: "",
                uid: ""
            },
            driver: {
                name: "",
                uid: "",
                phone: ""
            }
        },
    });

    const dispatch = useDispatch<any>();

    useEffect(() => {
        setPage(1);
        dispatch(getDrivers());

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

    const tripsLocation = useSelector((state: any) => state.trips.center);

    //console.log({ tripsLocation })

    const items: { label: string, value: string, car: string }[] = drivers.items.map((driver: any) => ({ label: driver.name, value: driver.uid }));

    // const labelsAndValues: { label: string, value: string }[] = drivers.map(driver => ({ label: driver.label, value: driver.value }));

    console.log(
        items)

    return (
        <div style={{ display: "flex" }}>
            {windowSize[0] <= 700 ? <Header /> : <NavbarSimple />}
            <PageLayoutTemplate>
                <Container>
                    <form
                        onSubmit={form.onSubmit(async () => {
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
                            placeholder={`Numéro de téléphone du passager`}
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
                            onChange={(option: string) => form.setFieldValue("driver.uid", option)}
                        />
                        <Flex sx={{ height: '100vh', marginTop: "25px" }}>

                            <Maps />
                        </Flex>
                        <Flex>

                        </Flex>
                        <Flex>

                        </Flex>

                        <Button type="submit">Enregistrer</Button>
                    </form>
                </Container>
            </PageLayoutTemplate>
        </div>
    )
}

export default NewTrip