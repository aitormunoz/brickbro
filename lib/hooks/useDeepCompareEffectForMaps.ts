import { EffectCallback, useEffect } from 'react';
import { useDeepCompareMemoize } from './useDeepCompareMemoize';

export function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
