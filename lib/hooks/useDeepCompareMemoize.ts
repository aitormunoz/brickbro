import { useRef } from 'react';
import { createCustomEqual } from "fast-equals";

/* eslint-disable @typescript-eslint/no-explicit-any */

const isLatLngLiteral = (obj: any): obj is google.maps.LatLngLiteral =>
  obj != null &&
  typeof obj === "object" &&
  Number.isFinite(obj.lat) &&
  Number.isFinite(obj.lng);


const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }
    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

export function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
