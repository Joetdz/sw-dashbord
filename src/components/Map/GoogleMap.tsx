import React, { useState, useRef } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
import { Flex, Loader, Box, Stack, TextInput, Button, Group, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

//const center = { lat: -4.317627, lng: 15.321454 }

const Maps = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API}`,
        libraries: ['places'],
        region: 'cd'
    })

    const [map, setMap] = useState<google.maps.Map>()
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    const originRef = useRef<HTMLInputElement>(null);

    const destiantionRef = useRef<HTMLInputElement>(null);

    if (!isLoaded) {
        return <Flex
            align="center"
            justify="center"
            sx={{ height: "100%", width: "100%" }}>
            <Loader />
        </Flex>
    }

    async function calculateRoute() {
        if (!originRef.current || !destiantionRef.current) return
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results: any = await directionsService.route({
            origin: originRef.current?.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        if (!originRef.current || !destiantionRef.current) return
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }
    return (
        <Flex
            direction='column'
            align='center'
            sx={{ position: 'relative', height: "100%", width: "100%" }}
        >
            <Box sx={{ position: 'absolute' }} left={0} top={0} h='100%' w='100%'>
                {/* Google Map Box */}
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                    onIdle={() => {
                        map && setCenter(map?.getCenter()!.toJSON())
                    }
                    }
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
            <Box
                sx={{ borderRadius: '10', background: 'white', zIndex: 1 }}
            >
                <Flex justify='space-between'>
                    <Box>
                        <Autocomplete>
                            <TextInput type='text' placeholder='Point de départ' ref={originRef} />
                        </Autocomplete>
                    </Box>
                    <Box >
                        <Autocomplete>
                            <TextInput
                                type='text'
                                placeholder='Destination'
                                ref={destiantionRef}
                            />
                        </Autocomplete>
                    </Box>


                    <Button onClick={calculateRoute}
                    >
                        Sélectionner
                    </Button>
                </Flex>
                <Stack spacing={4} mt={4} justify='space-between'>
                    <Text>Distance : {distance} </Text>
                    <Text>Temps estimé : {duration} </Text>
                    {/*<IconButton
                        aria-label='center back'
                        icon={<FaLocationArrow />}
                        isRound
                        onClick={() => {
                            map.panTo(center)
                            map.setZoom(15)
                        }}
                    />*/}
                </Stack>
            </Box>
        </Flex>
    )
}

export default Maps