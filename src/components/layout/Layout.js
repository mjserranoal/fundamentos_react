import Header from './Header';

import './Layout.css';

const Layout = ({ title, children, ...rest }) => {
  return (
    <div className="layout">
      <Header className="layout-header bordered" {...rest} />
      <main className="layout-main bordered">
        <h2 className="layout-title bordered">{title}</h2>
        {children}
      </main>
      <footer className="layout-footer bordered">@2023 Keepcoding</footer>
    </div>
  );
};

export default Layout;
