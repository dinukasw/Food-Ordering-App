import logoImg from '../assets/logo.jpg'
import Button from './UI/button'

const Header = () => {
  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="resturant-img" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly>
                Cart (0)
            </Button>
        </nav>
    </header>
  )
}

export default Header