import React, {useCallback, useEffect, useRef, useState} from 'react';

const MIN_HEIGHT = 60;

export const useAutoScroll = <Element extends HTMLElement>(deps: any[]) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const onScroll = useCallback(
    (event: React.UIEvent<Element, UIEvent>) => {
      const {scrollHeight, scrollTop, clientHeight} = event.currentTarget;

      if (Math.abs(scrollHeight - scrollTop - clientHeight) < MIN_HEIGHT) {
        !autoScroll && setAutoScroll(true);
      } else {
        autoScroll && setAutoScroll(false);
      }
    },
    [autoScroll]
  );

  useEffect(() => {
    if (autoScroll) {
      anchorRef.current?.scrollIntoView({behavior: 'smooth'});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoScroll, ...deps]);

  return {anchorRef, onScroll};
};
