import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 px-4 z-50">
      <p className="text-sm">
        📡 Você está offline. Algumas funcionalidades podem não funcionar corretamente.
      </p>
    </div>
  );
};

export default OfflineBanner;