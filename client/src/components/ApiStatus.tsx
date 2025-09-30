import React, { useEffect, useState } from 'react';
import { checkApiHealth } from '../services/api';

interface ApiStatusProps {
  showDetails?: boolean;
}

const ApiStatus: React.FC<ApiStatusProps> = ({ showDetails = false }) => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = async () => {
    setIsChecking(true);
    try {
      const healthy = await checkApiHealth();
      setIsHealthy(healthy);
      setLastChecked(new Date());
    } catch (error) {
      setIsHealthy(false);
      setLastChecked(new Date());
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkHealthSafe = async () => {
      if (!isMounted) return;
      setIsChecking(true);
      try {
        const healthy = await checkApiHealth();
        if (isMounted) {
          setIsHealthy(healthy);
          setLastChecked(new Date());
        }
      } catch (error) {
        if (isMounted) {
          setIsHealthy(false);
          setLastChecked(new Date());
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkHealthSafe();
    
    // Check health every 30 seconds
    const interval = setInterval(checkHealthSafe, 30000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!showDetails && isHealthy) {
    return null; // Don't show anything if API is healthy and details not requested
  }

  const getStatusColor = () => {
    if (isChecking) return 'text-yellow-600';
    return isHealthy ? 'text-green-600' : 'text-red-600';
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking...';
    return isHealthy ? 'API Connected' : 'API Disconnected';
  };

  const getStatusIcon = () => {
    if (isChecking) return '⏳';
    return isHealthy ? '✅' : '❌';
  };

  return (
    <div className={`flex items-center space-x-2 text-xs sm:text-sm ${getStatusColor()}`}>
      <span className="text-sm sm:text-base">{getStatusIcon()}</span>
      <span className="font-sans font-medium">{getStatusText()}</span>
      {showDetails && lastChecked && (
        <span className="text-gray-500 hidden sm:inline font-sans">
          (Last checked: {lastChecked.toLocaleTimeString()})
        </span>
      )}
      {!isHealthy && (
        <button
          onClick={checkHealth}
          className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 font-sans touch-manipulation"
          disabled={isChecking}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ApiStatus;
