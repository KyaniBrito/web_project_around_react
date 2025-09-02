import logo from "../../images/Vector.svg";
import "../../blocks/header.css";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logotipo" />
      <hr className="header__line" />
    </header>
  );
}

export default Header;
