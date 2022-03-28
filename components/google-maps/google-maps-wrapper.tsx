import { Status, Wrapper } from '@googlemaps/react-wrapper';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

type Props = {
  children: JSX.Element
}

export default function GoogleMapsWrapper({children}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  if (apiKey === '') {
    console.error('Google API Key is required');
  }

  return (
    <div style={{display: "flex", height: "100%"}}>
      <Wrapper apiKey={apiKey} render={render}>
        {children}
      </Wrapper>
    </div>
  );
}
