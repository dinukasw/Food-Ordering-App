import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalItems = cartCtx.items.reduce((total, item) => {
      return total + item.quantity;
  }, 0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  };

  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="resturant-img" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>
                Cart ({totalItems})
            </Button>
        </nav>
    </header>
  )
}

export default Header