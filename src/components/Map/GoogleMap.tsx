import React, { useState, useRef } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';
import { Flex, Loader, Box, Stack, TextInput, Button, Group, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../store/features/trips/slice';

const Maps = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API}`,
        libraries: ['places'],
        region: 'cd'
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState<number>(0.00);
    const [duration, setDuration] = useState('');
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    const [originLocation, setOriginLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [destinationLocation, setDestinationLocation] = useState<{ lat: number, lng: number } | null>(null);

    const dispatch = useDispatch<any>();
    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);

    if (!isLoaded) {
        return (
            <Flex align="center" justify="center" sx={{ height: "100%", width: "100%" }}>
                <Loader />
            </Flex>
        );
    }

    async function fetchLocation(query: string): Promise<{ lat: number, lng: number } | null> {
        return new Promise((resolve, reject) => {
            const placesService = new google.maps.places.PlacesService(map as google.maps.Map);
            placesService.findPlaceFromQuery(
                { query, fields: ['geometry'] },
                (results: any, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
                        resolve(results[0].geometry.location.toJSON());
                    } else {
                        console.error('Error fetching details:', status);
                        resolve(null);
                    }
                }
            );
        });
    }

    async function calculateRoute() {
        if (!originRef.current || !destinationRef.current) return;

        const originQuery = originRef.current.value;
        const destinationQuery = destinationRef.current.value;

        const [originLoc, destinationLoc] = await Promise.all([
            fetchLocation(originQuery),
            fetchLocation(destinationQuery)
        ]);

        if (!originLoc || !destinationLoc) return;

        setOriginLocation(originLoc);
        setDestinationLocation(destinationLoc);

        const directionsService = new google.maps.DirectionsService();
        const results: any = await directionsService.route({
            origin: originQuery,
            destination: destinationQuery,
            travelMode: google.maps.TravelMode.DRIVING,
        });

        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);

        const numericDistance = parseFloat(results.routes[0].legs[0].distance.text);

        console.log(originLoc, destinationLoc);

        await dispatch(setLocation({
            from: {
                name: results.request.origin.query,
                latitude: originLoc.lat,
                longitude: originLoc.lng,
            },
            to: {
                name: results.request.destination.query,
                latitude: destinationLoc.lat,
                longitude: destinationLoc.lng,
            },
            distance: numericDistance
        }));
    }

    function clearRoute() {
        if (!originRef.current || !destinationRef.current) return;
        setDirectionsResponse(null);
        setDistance(0.00);
        setDuration('');
        originRef.current.value = '';
        destinationRef.current.value = '';
    }

    return (
        <Flex direction='column' align='center' sx={{ position: 'relative', height: "100%", width: "100%" }}>
            <Box sx={{ position: 'absolute' }} left={0} top={0} h='100%' w='100%'>
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
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
            <Box sx={{ borderRadius: '10', background: 'white', zIndex: 1, width: '100%', padding: "20px" }}>
                <Flex direction="column" justify='space-between'>
                    <Box>
                        <Autocomplete>
                            <TextInput type='text' placeholder='Point de départ' ref={originRef} />
                        </Autocomplete>
                    </Box>
                    <Box>
                        <Autocomplete>
                            <TextInput type='text' placeholder='Destination' ref={destinationRef} />
                        </Autocomplete>
                    </Box>
                    <Button onClick={calculateRoute}>Sélectionner</Button>
                </Flex>
                <Stack spacing={4} mt={4} justify='space-between'>
                    <Text>Distance : {distance} </Text>
                    <Text>Temps estimé : {duration} </Text>
                </Stack>
            </Box>
        </Flex>
    );
}

export default Maps;
