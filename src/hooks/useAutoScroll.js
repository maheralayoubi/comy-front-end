import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependency) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      lastMessageRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    };
    
    scrollToBottom()
  }, [dependency]);

  return lastMessageRef;
};