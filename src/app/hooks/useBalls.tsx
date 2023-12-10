import React, { useEffect, useState } from 'react';

import { BallType } from '../types';
import useMousePosition from './useMousePosition';

const useBalls = () => {
  const [selectedBall, setSelectedBall] = useState<BallType | null>(null);
  const [isBallSelected, setIsBallSelected] = useState<boolean>(false);
  const [balls, setBalls] = useState<BallType[]>([
    { id: 1, x: 100, y: 100, color: 'red' },
    { id: 2, x: 300, y: 200, color: 'blue' },
  ]);

  const { mousePosition, clickOn } = useMousePosition();

  useEffect(() => {
    const offset = 65;

    if (!clickOn) {
      setSelectedBall(null);
      setIsBallSelected(false);
    }

    // detect if two balls collide
    // if collide, move them away from each other
    if (
      balls[0].x - balls[1].x < offset &&
      balls[0].x - balls[1].x > -offset &&
      balls[0].y - balls[1].y < offset &&
      balls[0].y - balls[1].y > -offset
    ) {
      setBalls((prevBalls) => {
        return prevBalls.map((prevBall) => {
          if (prevBall.id !== selectedBall?.id) {
            return {
              ...prevBall,
              x: prevBall.x + 150 * Math.random(),
              y: prevBall.y + 150 * Math.random(),
            };
          }
          return prevBall;
        });
      });
    } else {
      // loop through balls and check if clickOn is true
      // if true, move ball to mousePosition
      if (clickOn) {
        balls.forEach((ball) => {
          if (mousePosition.x === null || mousePosition.y === null) return;
          if (
            ball.x - mousePosition.x < 80 &&
            ball.x - mousePosition.x > -80 &&
            ball.y - mousePosition.y < 80 &&
            ball.y - mousePosition.y > -80
          ) {
            if (!isBallSelected) {
              setIsBallSelected(true);
              setSelectedBall(ball);
            }

            setBalls((prevBalls) => {
              return prevBalls.map((prevBall) => {
                if (prevBall.id === ball.id) {
                  return {
                    ...prevBall,
                    x: mousePosition.x ?? prevBall.x,
                    y: mousePosition.y ?? prevBall.y,
                  };
                }
                return prevBall;
              });
            });
          }
        });
      }
    }
  }, [balls, clickOn, isBallSelected, mousePosition, selectedBall?.id]);
  return { balls };
};

export default useBalls;
