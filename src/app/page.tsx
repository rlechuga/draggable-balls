'use client';

import Ball from './components/Ball';
import useBalls from './hooks/useBalls';

export default function Home() {
  const { balls } = useBalls();

  return (
    <div className='flex-1 h-screen relative bg-slate-600'>
      {balls.map((ball) => (
        <Ball key={ball.id} {...ball} />
      ))}
    </div>
  );
}
