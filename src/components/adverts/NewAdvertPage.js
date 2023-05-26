import { useState } from 'react';
import Layout from '../layout/Layout';
import Button from '../shared/Button';

import './NewAdvertPage.css';
import { createAdvert } from './service';
import { useNavigate } from 'react-router-dom';


const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sale: '',
    tags: false,
    price: ''
  });

  const handleChange = event => {

    let valor = event.target.value;

    if (event.target.name === 'sale') {
      valor = event.target.checked;
    }

    setFormData({
      ...formData,
      [event.target.name]: valor,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setIsLoading(true);

      var tags = event.target.tags;
      var tagsSelected = [];
      for (var i = 0, l = tags.length; i < l; i++) {
        if (tags[i].selected) {
          tagsSelected.push(tags[i].value);
        }
      }
      
      const formData = new FormData();
      //formData.append('name', event.target.name.value);
      formData.append('name', JSON.stringify(event.target.name.value))
      formData.append('price', event.target.price.value);
      formData.append('sale', event.target.sale.checked);
      formData.append('tags', tagsSelected);
      if (event.target.photo.files[0] !== undefined) {
        formData.append('photo', event.target.photo.files[0])
      }
      setIsLoading(false);
      const advert = await createAdvert(formData);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const buttonDisabled =
    isLoading || !formData.name || !formData.sale || !formData.tags || !formData.price;

  return (
    <Layout title="New Advert">
      <div className="newAdvertPage bordered">
        <div className="right">
          <form className="formField" onSubmit={handleSubmit}>
          <label className="formField-label" htmlFor="name">
            Nombre
          </label>
          <input
              type="text"
              name="name"
              placeholder="name"
              maxLength= "70"
              className='formField-input'
              required
              onChange={handleChange}
            />
          <label  className="formField-label" htmlFor="sale">
          Es Venta?
        </label>
          <input
            type="checkbox"
            name="sale"
            placeholder="Es venta?"
            className='formField-input'
            onChange={handleChange}
          />
          <label  className="formField-label" htmlFor="tags">Tags:</label>
          <select 
            className='formField-input' 
            name="tags" 
            id="tags" 
            multiple 
            required
            onChange={handleChange}
            >
            <option value="lifestyle">lifestyle</option>
            <option value="mobile">mobile</option>
            <option value="motor">motor</option>
            <option value="work">work</option>
          </select>
          <label  className="formField-label" htmlFor="price">
            Precio
          </label>
            <input
              type="number"
              name="price"
              placeholder="price"
              className ='formField-input'
              required
              onChange={handleChange}
            />
            <label  className="formField-label" htmlFor="price">
            Imagen
          </label>
            <input
              type="file"
              name="photo"
              className='formField-input'
            />
            <div className="newAdvertPage-footer">
              <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                disabled={buttonDisabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;
