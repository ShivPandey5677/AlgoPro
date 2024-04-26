import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  


  return (
    <div className="relative bg-black opacity-90">
      <img src="assets/po.jpg" alt="Background" className="object-cover w-full h-full " />

      <div className='absolute inset-0 flex justify-center items-center'>
        <div className='max-w-5xl text-center font-serif'>
          <h1 className='mt-12 text-5xl font-bold mb-4 text-white bg-gradient-to-r from-orange-900  to-teal-800'>
            <TypeAnimation
              sequence={[
                'hello',
                1000,
                'Bonjour',
                2000,
                ' S̄wạs̄dī ',
                2000,
                'Ciao',
                1000,
                ' Nǐ hǎo',
                1000
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '1em', display: 'inline-block', paddingLeft: '5px' }}
              repeat={Infinity}
            />
          </h1>
          <h2 className='mt-10 text-3xl mb-4 text-white text-gradient-to-r from-green-900 to-blue-700'>We have multiple options for you here like : 
            <TypeAnimation
              sequence={[
                'ENCRYPT FILE',
                1000,
                'DECRYPT FILE',
                2000,
                'COMPRESS FILE',
                2000,
                'DOWNLOAD FILE',
                1000
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '1em', display: 'inline-block', paddingLeft: '5px' }}
              repeat={Infinity}
            />
          </h2>
          <div className="flex justify-center">
          <label htmlFor="file-upload" className="border border-red-500 text-white py-2 px-4 mr-4 cursor-pointer">FILE UPLOAD</label>
            <input id="file-upload" type="file" className="hidden" />    
                    <button className="border border-red-500 text-white py-2 px-4 mr-4">ENCRYPT FILE</button>
            <button className="border border-red-500 text-white py-2 px-4 mr-4">DECRYPT FILE</button>
            <button className="border border-red-500 text-white py-2 px-4">COMPRESS FILE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;