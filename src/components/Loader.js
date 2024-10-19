import React from 'react';

const Loader = () => {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 font-bold bg-primary z-[100]'>
      <div className='relative flex flex-col items-center justify-center'>
        {/* Outer glowing circular loader with gradient */}
        <div className="w-8 h-24 border-8 border-t-8 border-transparent border-t-gradient rounded-full animate-spin mb-4 glow"></div>

        {/* Text Animation: SNG */}
        <div className='flex gap-5 text-4xl'>
          <h1 className='text-secondary s'>S</h1>
          <h1 className='text-white n'>N</h1>
          <h1 className='text-tertiary g'>G</h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
