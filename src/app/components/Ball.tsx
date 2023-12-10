import { BallType } from '../types';
import React from 'react';

const Ball = (ball: BallType) => {
  const { x, y, color } = ball;
  return (
    <div className={`absolute`} style={{ top: y, left: x }}>
      <div
        className={'h-10 w-10 p-10 rounded-full'}
        style={{ background: color }}
      ></div>
    </div>
  );
};

export default Ball;
