import { lazy } from 'react';

// Lazy loading de componentes pesados
export const LazyProvadorVirtual = lazy(() => 
  import('./ProvadorVirtual').then(module => ({ 
    default: module.ProvadorVirtual 
  }))
);

export const LazyProductCarousel = lazy(() => 
  import('./ProductCarousel')
);

export const LazyEmailTest = lazy(() => 
  import('./EmailTest')
);