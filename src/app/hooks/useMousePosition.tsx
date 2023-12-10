import React from 'react';
const useMousePosition = () => {
  const [clickOn, setClickOn] = React.useState(false);  
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev: { clientX: any; clientY: any }) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };


    
    window.addEventListener('mousemove', updateMousePosition);

    window.addEventListener('mousedown', () => {
      setClickOn(true);
    });

    window.addEventListener('mouseup', () => {
      setClickOn(false);
    });

    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return  { mousePosition, clickOn, setClickOn };
};
export default useMousePosition;
