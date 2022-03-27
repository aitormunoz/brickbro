import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Logo from '../components/common/logo';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Search your property location"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Logo width="500" height="300"/>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
