import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import Layout from '../layout/Layout';
import Advert from './Advert';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { getAdverts, getUi } from '../../store/selectors';
import { advertsLoaded } from '../../store/actions';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Be the first one!</p>
    <Button as={Link} variant="primary" to="/adverts/new">
      Create advert
    </Button>
  </div>
);

const AdvertsPage = ({ adverts, onAdvertsLoaded, isLoading }) => {
  const isMounted = useRef(false);

  const [nombre, setNombre] = useState('');
  const [venta, setVenta] = useState('');

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    onAdvertsLoaded();
  }, [onAdvertsLoaded]);

  const filteredAdverts = adverts.filter(
    advert =>
      (advert.name ?? '').toUpperCase().startsWith(nombre.toUpperCase()) &&
      (venta !== '' ? advert.sale === (venta === 'true') : true),
  );

  return (
    <Layout title="Últimos anuncios">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {!!adverts.length ? (
            <>
              <div className="filters">
                <label>
                  Nombre:{' '}
                  <input
                    type="text"
                    style={{ borderWidth: 1 }}
                    value={nombre}
                    onChange={event => setNombre(event.target.value)}
                  />
                </label>
                <label>
                  Compra/venta:{' '}
                  <select
                    className="filter-select"
                    name="venta"
                    id="venta"
                    style={{ borderWidth: 1 }}
                    value={venta}
                    onChange={event => setVenta(event.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value={true}>Venta</option>
                    <option value={false}>Compra</option>
                  </select>
                </label>
              </div>
              <ul>
                {filteredAdverts.map(advert => (
                  <li key={advert.id}>
                    <Link to={`/adverts/${advert.id}`}>
                      <Advert {...advert} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <EmptyList />
          )}
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = state => ({
  adverts: getAdverts(state),
  ...getUi(state),
});

const mapDispatchToProps = {
  onAdvertsLoaded: advertsLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsPage);
