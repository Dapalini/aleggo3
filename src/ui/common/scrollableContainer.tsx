import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';

interface ScrollableContainerProps {
  children: React.ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: DragEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const { clientHeight, scrollHeight, scrollTop } = container;
      const scrollThreshold = 100; // pixels from the edge

      if (e.clientY < scrollThreshold) {
        // Scroll up
        container.scrollTop = scrollTop - 15;
      } else if (e.clientY > clientHeight - scrollThreshold) {
        // Scroll down
        container.scrollTop = scrollTop + 15;
      }
    };

    document.addEventListener('dragover', handleScroll);
    return () => document.removeEventListener('dragover', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: 'auto',
        height: '100vh',
        position: 'relative' // Ensure it's positioned relative to other elements
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
