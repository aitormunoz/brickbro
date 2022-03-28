import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './google-maps-input.module.scss';

type Props = {
  placeholder?: string;
  onSuccess?: (location: google.maps.GeocoderResponse) => void;
  onError?: (error: string) => void;
  onChange?: (event: string) => void;
  value: string;
}

export default function GoogleMapsInput({placeholder, onSuccess, value, onChange, onError}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder>();

  useEffect(() => {
    if (!geocoder) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [geocoder]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event.target.value);
  }

  function handleSubmit() {
    geocoder?.geocode({address: value})
      .then(value => {
        onSuccess && onSuccess(value);
      })
      .catch(() => {
        onError && onError('Invalid Address');
      });
  }

  return (
    <div className={styles.inputSearchWrapper}>
      <input className={styles.inputSearchInput}
             ref={input}
             placeholder={placeholder}
             value={value}
             onChange={handleChange}
             type="text"/>
      <button onClick={handleSubmit} className={styles.inputSearchSubmit} type="button">Search</button>
    </div>
  );
}
