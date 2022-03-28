import GoogleMapsWrapper from '../google-maps/google-maps-wrapper';
import GoogleMapsInput from '../google-maps/google-maps-input';
import { useState } from 'react';
import { Location } from '../../lib/shared/Location';

type Props = {
  onSuccess: (location: Location) => void;
}

export function InputGeocoder({ onSuccess }: Props) {
  const [value, setValue] = useState('');

  function onMapsInputChange(value: string) {
    setValue(value);
  }

  function onMapsInputError(error: string) {
    alert(error);
  }

  function onMapsInputSuccess(locations: google.maps.GeocoderResponse) {
    const [_location] = locations.results;
    const location = {
      id: (new Date().getTime()).toString(36),
      name: _location.formatted_address,
      lat: _location.geometry.location.lat(),
      lng: _location.geometry.location.lng()
    }
    onSuccess(location);
  }

  return (
    <GoogleMapsWrapper>
      <GoogleMapsInput placeholder="Address"
                       value={value}
                       onError={onMapsInputError}
                       onSuccess={onMapsInputSuccess}
                       onChange={onMapsInputChange}/>
    </GoogleMapsWrapper>
  );
}
