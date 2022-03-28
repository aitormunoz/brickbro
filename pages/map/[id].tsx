import GoogleMapsMap from '../../components/google-maps/google-maps-map';
import GoogleMapsWrapper from '../../components/google-maps/google-maps-wrapper';
import { GetServerSidePropsContext } from 'next/types';
import style from './[id].module.scss';
import Head from 'next/head';
import Header from '../../components/common/header';
import Link from 'next/link';
import GoogleMapsMarker from '../../components/google-maps/google-maps-marker';
import { InputGeocoder } from '../../components/input-geocoder/input-geocoder';
import useSessionStorage from '../../lib/hooks/useSessionStorage';
import { useEffect, useState } from 'react';
import { Location } from '../../lib/shared/Location';
import { useRouter } from 'next/router';

type Props = {
  paramId: string;
}

export default function Map({paramId}: Props) {
  const router = useRouter();
  const [sessionLocations, setSessionLocations] = useSessionStorage<Location[]>('LOCATIONS_KEY', []);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    const location = sessionLocations.find(({id}) => id === paramId) || null;
    setSelectedLocation(location);
  }, [paramId]);

  function handleNewLocation(location: Location) {
    setSessionLocations([...sessionLocations, location]);
    router.push({
      pathname: '/map/[id]',
      query: {id: location.id},
    });
  }

  const mainMap = selectedLocation ?
    (
      <GoogleMapsWrapper>
        <GoogleMapsMap center={{lat: selectedLocation.lat, lng: selectedLocation.lng}}
                       zoom={15}
                       style={{width: '100%', height: '600px'}}
                       disableDefaultUI={false}>
          <GoogleMapsMarker position={{lat: selectedLocation.lat, lng: selectedLocation.lng}} title="Test"/>
        </GoogleMapsMap>
      </GoogleMapsWrapper>
    ) :
    <strong>Invalid location id</strong>;

  return (
    <>
      <Head>
        <title>Map</title>
        <meta name="description" content="Search your property location"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header/>
      <main className={style.main}>
        <InputGeocoder onSuccess={handleNewLocation}/>
        <br/>
        {mainMap}
        <div className={style.search}>
          <strong>Busquedas</strong>
          {
            sessionLocations.map(
              location =>
                (
                  <Link key={location.id}
                        href={{
                          pathname: '/map/[id]',
                          query: {id: location.id},
                        }}>
                    <p>{location.name}</p>
                  </Link>
                )
            )
          }
        </div>
      </main>

    </>

  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const paramId = context.params?.id as string;
  return {
    props: {
      paramId
    }
  };
}
