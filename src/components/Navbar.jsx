import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';
import { useEffect, useRef, useState } from 'react';
import { IoHome, IoLogOut, IoPerson, IoPricetag } from 'react-icons/io5';

const Navbar = () => {
  const burgerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [clik, setClik] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    burgerRef.current.classList.toggle('is-active');
    document.getElementById('navbarBasicExample').classList.toggle('is-active');
  }, [clik]);

  return (
    <nav className='navbar is-fixed-top has-shadow' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <NavLink className='navbar-item' to='/dashboard'>
          <img src={logo} width='112' height='28' alt='logo' />
        </NavLink>

        <a
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
          ref={burgerRef}
          onClick={() => setClik(!clik)}>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='is-hidden-tablet'>
          <p className='mr-3 has-text-centered mb-2'>
            Hello, <strong>{user && user.name}</strong>
          </p>
          <aside className='menu pl-2 has-shadow'>
            <p className='menu-label'>General</p>
            <ul className='menu-list'>
              <li>
                <NavLink to={'/dashboard'}>
                  <IoHome /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to={'/products'}>
                  <IoPricetag /> Products
                </NavLink>
              </li>
            </ul>
            {user && user.role === 'admin' && (
              <>
                <p className='menu-label'>Admin</p>
                <ul className='menu-list'>
                  <li>
                    <NavLink to={'/users'}>
                      <IoPerson />
                      Users
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
            <p className='menu-label'>Settings</p>
            <ul className='menu-list'>
              <li>
                <button onClick={logout} className='button is-white'>
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </aside>
        </div>
        <div className='navbar-end'>
          <div className='is-hidden-mobile'>
            <div className='navbar-item'>
              <p className='mr-3'>
                Hello, <strong>{user && user.name}</strong>
              </p>
              <div className='buttons'>
                <button onClick={logout} className='button is-light ml-auto'>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
