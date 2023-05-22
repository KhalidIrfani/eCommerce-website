import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, ProductDetailsPage, CheckoutPage, PaymentPage, OrderSuccessPage, ProfilePage, ShopCreatePage, SellerActivationPage, ShopLoginPage, OrderDetailsPage, TrackOrderPage, UserInbox } from './routes/Routes.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Store from './redux/store';
import { loadSeller, loaduser } from './redux/actions/user';
import ProtectedRoute from './routes/ProtectedRoute';
import { ShopHomePage } from './ShopRoutes.js'
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import { ShopDashboardPage, ShopCreateProduct, ShopAllProducts, ShopCreateEvents, ShopAllEvents, ShopAllCoupens, ShopPreviewPage, ShopAllOrders, ShopOrderDetails, ShopAllRefunds, ShopSettingsPage, ShopWithDrawMoneyPage, ShopInboxPage } from './routes/ShopRoute';
import { getAllProducts } from './redux/actions/product';
import { getAllEvents } from './redux/actions/event';
import axios from 'axios';
import { server } from './server';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';





function App() {
  const [stripeApikey, setStripeApiKey] = useState("")

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`)
    setStripeApiKey(data.stripeApikey)
  }

  useEffect(() => {
    Store.dispatch(loaduser())
    Store.dispatch(loadSeller())
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents())
    getStripeApikey()

  }, [])
  // console.log(stripeApikey);

  return (
    <>
      <BrowserRouter>

        {
          stripeApikey && (
            <Elements stripe={loadStripe(stripeApikey)}>
              <Routes>
                <Route path='/payment' element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </Elements>
          )
        }
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/activation/:activation_token' element={<ActivationPage />} />
          <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:id' element={<ProductDetailsPage />} />
          <Route path='/best-selling' element={<BestSellingPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/checkout' element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />

          <Route path='/order/success' element={<OrderSuccessPage />} />
          <Route path='/Profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          <Route path='/inbox' element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          } />

          <Route path='/user/order/:id' element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          } />

          <Route path='/user/track/order/:id' element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          } />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route path='/shop-create' element={<ShopCreatePage />} />
          <Route path='/shop-login' element={<ShopLoginPage />} />
          <Route path='/shop/:id' element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          } />
          <Route path='/settings' element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard' element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard-create-product' element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-orders' element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-refunds' element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          } />

          <Route path='/order/:id' element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-products' element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          } />

          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupens"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupens />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />

        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>

    </>
  );
}

export default App;    