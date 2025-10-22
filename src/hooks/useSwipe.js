import { useState } from "react";

export default function useSwipe(maxSwipe = -100, triggerSwipe = -50) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    let deltaX = currentX - touchStartX;

    if (deltaX < 0) deltaX = Math.max(deltaX, maxSwipe);
    if (deltaX > 0) deltaX = Math.min(deltaX, 0);

    setSwipeOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (swipeOffset <= triggerSwipe) setSwipeOffset(maxSwipe);
    else setSwipeOffset(0);
  };

  return {
    swipeOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetSwipe: () => setSwipeOffset(0),
  };
}
