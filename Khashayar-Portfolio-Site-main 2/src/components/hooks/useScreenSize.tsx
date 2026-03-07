import useIsPortrait from './useIsPortrait';

// This hook is kept for backward compatibility, but internally uses useIsPortrait
const useScreenSize = () => {
  return useIsPortrait();
};

export default useScreenSize;
