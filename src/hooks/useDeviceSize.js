import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const getDeviceSize = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    return 'mobile';
  } else if (screenWidth <= 1200) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState(getDeviceSize());

  useEffect(() => {
    const handleResize = throttle(() => {
      setDeviceSize(getDeviceSize());
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { deviceSize };
};

export default useDeviceSize;
