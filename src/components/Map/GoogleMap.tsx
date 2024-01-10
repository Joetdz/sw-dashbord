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
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../store/features/trips/slice';

//const center = { lat: -4.317627, lng: 15.321454 }

const Maps = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API}`,
        libraries: ['places'],
        region: 'cd'
    })

    const [map, setMap] = useState<google.maps.Map>()
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState<number>(0.00);
    const [duration, setDuration] = useState('')
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    let originLocation: { lat: string, lng: string }, destinationLocation: { lat: string, lng: string };


    const dispatch = useDispatch<any>();

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

        // Use PlacesService to fetch details of the origin and destination
        const placesService = new google.maps.places.PlacesService(map as google.maps.Map);

        // Fetch details for the origin
        placesService.findPlaceFromQuery(
            {
                query: originRef.current?.value,
                fields: ['geometry'],
            },
            (results: any, status) => {
                if (!results && status !== google.maps.places.PlacesServiceStatus.OK) return

                //const originLocation = results[0] && results[0].geometry.location.toJSON();
                //const originLocation = results;
                //console.log('Origin Location:', originLocation);
                if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
                    originLocation = results[0].geometry.location.toJSON();
                    //console.log('Origin Location:', originLocation);
                } else {
                    console.error('Error fetching origin details:', status);
                }
            }
        );

        // Fetch details for the destination
        placesService.findPlaceFromQuery(
            {
                query: destiantionRef.current.value,
                fields: ['geometry'],
            },
            (results: any, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    destinationLocation = results[0].geometry.location.toJSON();
                    // const destinationLocation = results;
                    //console.log('Destination Location:', destinationLocation);
                } else {
                    console.error('Error fetching destination details:', status);
                }
            }
        );

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
        const numericDistance = parseFloat(results.routes[0].legs[0].distance.text);
        console.log(numericDistance)

        dispatch(setLocation(
            {
                from: {
                    name: results.request.origin.query,
                    latitude: originLocation.lat,
                    longitude: originLocation.lng,
                },
                to: {
                    name: results.request.destination.query,
                    latitude: destinationLocation.lat,
                    longitude: destinationLocation.lng,
                },
                distance: numericDistance
            }
        ))
    }

    function clearRoute() {
        if (!originRef.current || !destiantionRef.current) return
        setDirectionsResponse(null)
        setDistance(0.00)
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
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => {
                        setMap(map)
                    }}
                //onIdle={() => {
                //map && setCenter(map?.getCenter()!.toJSON());
                //map && dispatch(setLocation(map?.getCenter()!.toJSON()))
                // }}

                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
            <Box
                sx={{ borderRadius: '10', background: 'white', zIndex: 1, width: '100%', padding: "20px" }}
            >
                <Flex direction="column" justify='space-between'>
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
                </Stack>
            </Box>
        </Flex>
    )
}

export default Maps