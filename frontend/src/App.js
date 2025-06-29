// import logo from './logo.svg';
// import './App.css';
import {useSelector} from 'react-redux'
import {Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice'
import {Logout} from './features/auth/components/Logout'
import {Protected} from './features/auth/components/Protected'
import {useFetchLoggedInUserDetails} from './hooks/useAuth/useFetchLoggedInUserDetails'
import { AddProductPage, 
        AdminOrdersPage,
        AdminStatisticsPage,
        CartPage, 
        CheckoutPage, 
        ForgotPasswordPage, 
        HomePage, 
        LoginPage, 
        OrderSuccessPage, 
        OtpVerificationPage,
        ProductDetailsPage, 
        ProductUpdatePage, 
        ResetPasswordPage, 
        SignupPage, 
        UserOrdersPage,
        UserProfilePage, 
        WishlistPage} from './pages'
import {AdminDashboardPage} from './pages/AdminDashboardPage'
import {NotFoundPage} from './pages/NotFoundPage'
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck"
import { CardPaymentPage } from './pages/CardPaymentPage';



function App() {

  const isAuthChecked = useSelector(selectIsAuthChecked)
  const loggedInUser = useSelector(selectLoggedInUser)

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
        <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>
        <Route exact path='/product-details/:id' element={<Protected><ProductDetailsPage/></Protected>}/>

        {
          loggedInUser?.isAdmin?(
            
            <>
            <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage/></Protected>}/>
            <Route path='/admin/statistics' element={<Protected><AdminStatisticsPage /></Protected>}/>
            <Route path='/admin/product-update/:id' element={<Protected><ProductUpdatePage/></Protected>}/>
            <Route path='/admin/add-product' element={<Protected><AddProductPage/></Protected>}/>
            <Route path='/admin/orders'  element={<Protected><AdminOrdersPage/></Protected>}/>
            <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
            </>
          ):(
            
            <>
            <Route path='/' element={<Protected><HomePage/></Protected>}/>
            <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
            <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
            <Route path='/checkout' element={<Protected><CheckoutPage/></Protected>}/>
            <Route path='/card-payment' element={<Protected><CardPaymentPage/></Protected>}/>
            <Route path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/>
            <Route path='/orders' element={<Protected><UserOrdersPage/></Protected>}/>
            <Route path='/wishlist' element={<Protected><WishlistPage/></Protected>}/>
            </>
          )
        }

        <Route path='*' element={<NotFoundPage/>} />

      
      </>
    )
  )

  
  return isAuthChecked ? <RouterProvider router = {routes}/> : "";
}

export default App;
