/* global google */
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { useDeepCompareEffectForMaps } from '../../lib/hooks/useDeepCompareEffectForMaps';

interface Props extends google.maps.MapOptions {
  style?: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children: any
}

export default function GoogleMapsMap({
                                        onClick,
                                        onIdle,
                                        style,
                                        children,
                                        ...options
                                      }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const _map = new window.google.maps.Map(ref.current, {});
      setMap(_map);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} style={style}/>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement<any>(child, { map });
        }
      })}
    </>
  );
}
