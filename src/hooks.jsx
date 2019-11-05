import React from 'react'
import { useHistory, useLocation } from 'react-router';

export const useNavigate = () => {
  const history = useHistory();
  const currentLocation = useLocation();

  return (getPathname) => {
    const pathname = getPathname(currentLocation);

    history.push(pathname);
  };
};

export function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = React.useRef();
  
    // Store current value in ref
    React.useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
  
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }