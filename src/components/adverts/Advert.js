import React from 'react';

import './Advert.css';

const Advert  = ({ name, price, sale, tags }) => {
const separatorTags = [];
if (tags) {
  tags.forEach(tag => {
    separatorTags.push(<p>{tag}</p>)
  });
}

  return (
    <article className="advert bordered">
      <div className="right">
        <div className="advert-header">
          <h2 className="advert-name">{name}</h2>
          <p className="advert-username"><span className='advert-span'>Price: </span>{price} €</p>
          <p className="advert-separator"><span className='advert-span'>Compra/Venta: </span>{sale ? "Venta" : "Compra"}</p>
          <p className="advert-separator"><span className='advert-span'>Tags: </span>{separatorTags}</p>
        </div>
      </div>
    </article>
  );
};

export default Advert;
