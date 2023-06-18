import { RefObject, SyntheticEvent, useCallback, useEffect } from 'react';

const useDetectOutsideClick = (
  ref: RefObject<HTMLElement>,
  handler: (e: SyntheticEvent) => void,
  onlyParentCanClose = false
): void => {
  const detectExit = useCallback(
    (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e);
    },
    [handler, ref]
  );

  useEffect(() => {
    if (ref.current) {
      const node = onlyParentCanClose && ref.current.parentNode ? ref.current.parentNode : document;

      node.addEventListener('mousedown', detectExit);
      node.addEventListener('touchstart', detectExit);
      return () => {
        node.removeEventListener('mousedown', detectExit);
        node.removeEventListener('touchstart', detectExit);
      };
    }
  }, [detectExit, onlyParentCanClose, ref]);
};

export default useDetectOutsideClick;
