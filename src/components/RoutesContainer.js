import React from 'react';

const RoutesContainer = ({children}) => {
  return (
    <div className='album py-2 bg-light'>
      <div className='container'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RoutesContainer;
