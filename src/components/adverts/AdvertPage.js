import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect } from 'react';
import Photo from '../shared/Photo';
import ConfirmationButton from '../shared/ConfirmationButton';
import Advert from './Advert';
import { useDispatch, useSelector } from 'react-redux';
import { advertDelete, advertLoad, uiResetError } from '../../store/actions';
import { getAdvert, getUi } from '../../store/selectors';

const AdvertPage = () => {
  const dispatch = useDispatch();
  const { advertId } = useParams();
  const advert = useSelector(getAdvert(advertId));
  const { isLoading, error } = useSelector(getUi);

  useEffect(() => {
    dispatch(advertLoad(advertId));
  }, [dispatch, advertId]);

  const resetError = () => {
    dispatch(uiResetError());
  };

  const handleDelete = async event => {
    dispatch(advertDelete(advertId));
  };

  return (
    <Layout title="Advert detail">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <article className="advert bordered">
          <div className="left">
            <Photo {...advert} />
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
          {error && (
            <div onClick={resetError} className="advertPage-error">
              {error.message}
            </div>
          )}
        </article>
      )}
    </Layout>
  );
};

export default AdvertPage;
