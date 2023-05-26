import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { getAdvert } from './service';
import Photo from '../shared/Photo';
import ConfirmationButton from '../shared/ConfirmationButton';
import { deleteAdvert } from './service';
import Advert from './Advert';

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [advert, setAdvert] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    getAdvert(params.advertId)
      .then(advert => setAdvert(advert))
      .catch(error => {
        if (error.status === 404) {
          return navigate('/404');
        }
        setError(error);
      });
    setIsLoading(false);
  }, [params.advertId, navigate]);

  if (error?.status === 404) {
    return <Navigate to="/404" />;
  }

  const handleDelete = async event => {
    await deleteAdvert(advert.id);
      navigate('/');
  };
  
  return (
    <Layout title="Advert detail">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <article className="advert bordered">
          <div className="left">
            <Photo className="advert-photo" src={advert.photo}/>
          </div>
          <div className="right">
            <Advert {...advert} />
          
            <ConfirmationButton
              confirmation="Are you sure?"
              onConfirm={handleDelete}
              disabled={isLoading}
              className="button-delete"
            >
              Delete
            </ConfirmationButton>
          </div>
        </article>
      )}
    </Layout>
  );
};

export default AdvertPage;
