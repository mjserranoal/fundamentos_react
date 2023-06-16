import Button from '../shared/Button';

import { ReactComponent as Icon } from '../../assets/logoN.svg';
import { logout } from '../auth/service';
import classNames from 'classnames';
import ConfirmationButton from '../shared/ConfirmationButton';

import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';
import { authLogout } from '../../store/actions';

const Header = ({ className }) => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authLogout());

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new" className="header-nav-item">
          New Advert
        </NavLink>{' '}
        <NavLink to="/adverts" className="header-nav-item" end>
          See latest adverts
        </NavLink>
        {isLogged ? (
          <ConfirmationButton
            confirmation="Are you sure?"
            onConfirm={handleLogoutClick}
            disabled={!isLogged}
          >
            {' '}
            Logout{' '}
          </ConfirmationButton>
        ) : (
          <Button
            as={Link}
            variant="primary"
            className="header-button"
            to="/login"
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
