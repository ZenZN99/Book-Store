import { Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import HomePage from './Pages/Home'
import BookDetails from './Pages/BookDetails'
import Profile from './Pages/Profile'
import CartPage from './Pages/Cart'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Support from './Pages/Support'
import BuyingPage from './Pages/Buying'
import Services from './Pages/Services'
import Events from './Pages/Events'
import ReadingMood from './Pages/ReadingMood'
import FollowUs from './Pages/FollowUs'
import ClientReview from './Pages/ClientReview'
import UsersPage from './Pages/Users'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={  <HomePage />}/>
        <Route path='/book/:bookId' element={<BookDetails />}/>
        <Route path='/profile/:id' element={<Profile />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/blog' element={<Blog />}/>
        <Route path='/support' element={<Support />}/>
        <Route path='/buying' element={<BuyingPage />}/>
        <Route path='/services' element={<Services />}/>
        <Route path='/events' element={<Events />}/>
        <Route path='/mod' element={<ReadingMood />}/>
        <Route path='/follow' element={<FollowUs />}/>
        <Route path='/reviews' element={<ClientReview />}/>
        <Route path='/users' element={<UsersPage />}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
