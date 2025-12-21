import HeroComponent from '../Components/Hero'
import AboutComponent from '../Components/About'
import FooterComponent from '../Components/Footer'
import NavbarComponent from '../Components/Navbar'

const Welcome = () => {
  return (
    <div>
      <NavbarComponent />
     <HeroComponent />
      <AboutComponent />
      <FooterComponent />  
    </div>
  )
}

export default Welcome
