import type { NextPage } from 'next';
import Head from 'next/head';
import Logo from '../components/common/logo';
import { InputGeocoder } from '../components/input-geocoder/input-geocoder';
import style from './index.module.scss';
import useSessionStorage from '../lib/hooks/useSessionStorage';
import { Location } from '../lib/shared/Location';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const [sessionLocations, setSessionLocations] = useSessionStorage<Location[]>('LOCATIONS_KEY', []);

  function handleNewLocation(location: Location) {
    setSessionLocations([...sessionLocations, location]);
    router.push({
      pathname: '/map/[id]',
      query: { id: location.id },
    });
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Search your property location"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={style.main}>
        <div className={style.logoWrapper}>
          <Logo width="350px" height="100%"/>
        </div>
        <div className={style.inputWrapper}>
          <InputGeocoder onSuccess={handleNewLocation}/>
        </div>
      </main>

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </>
  );


};

export default Home;
