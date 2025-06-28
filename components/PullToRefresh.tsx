import { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  const threshold = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || containerRef.current.scrollTop > 0) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0) {
      e.preventDefault();
      const distance = Math.min(diff * 0.5, threshold * 1.5);
      setPullDistance(distance);
      setIsPulling(distance > threshold);
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
    setIsPulling(false);
  };

  useEffect(() => {
    if (isRefreshing) {
      const timer = setTimeout(() => {
        setPullDistance(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${isRefreshing ? 60 : pullDistance}px)`,
        transition: isRefreshing || pullDistance === 0 ? 'transform 0.3s ease' : 'none'
      }}
    >
      {/* Pull indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div className="flex items-center justify-center py-4">
          <div className={`flex items-center gap-2 transition-opacity ${
            isPulling || isRefreshing ? 'opacity-100' : 'opacity-50'
          }`}>
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${
              isRefreshing ? 'animate-spin' : ''
            }`} />
            <span className="text-sm text-muted-foreground">
              {isRefreshing ? 'Refreshing...' : isPulling ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
}