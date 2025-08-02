import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/button'
import CartContext from '../store/CartContext'

const Header = () => {
  const cartCtx = useContext(CartContext);

  const totalItems = cartCtx.items.reduce((total, item) => {
      return total + item.quantity;
  }, 0);

  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="resturant-img" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly>
                Cart ({totalItems})
            </Button>
        </nav>
    </header>
  )
}

export default Header