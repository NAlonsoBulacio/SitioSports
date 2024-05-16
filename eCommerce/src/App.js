import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CustomMade from "./pages/CustomMade/CustomMade";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTable from "./pages/UserTable/UserTable";
import ProductTable from "./pages/ProductTable/ProductTable";
import OrdersTable from "./pages/OrdersTable/OrdersTable";
import OrderDetailBdd from "./pages/OrderDetailBdd/OrderDetailBdd";
import OrderForm from "./pages/OrderDetailBdd/OrderForm";
import ProductForm from "./pages/ProductForm/ProductForm";
import ProductDetailBdd from "./pages/ProductDetailBdd/ProductDetailBdd";
import WhatsAppButton from "./components/Whatsapp/WhatsappButton";
import ShopByCommissions from "./pages/Shop/ShopByCommissions";
import CommissionsTableBdd from "./pages/CommissionsBdd/CommissionsTableBdd";
import Admin from "./pages/Admin/Admin";
import { useLocation } from "react-router-dom";
import HeaderPayment from "./components/home/Header/HeaderPayment";
import CommissionsDetailBdd from "./pages/CommissionsBdd/CommissionsDetail";
import Help from "./pages/Help/Help";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AfterTransfer from "./pages/AfterOrders/AfterTransfer";
import AfterMp from "./pages/AfterOrders/AfterMp";
const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname !== "/paymentgateway";
  return (
    <div className="overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {showHeader ? (
        <div className="bg-black w-screen h-10 flex justify-center items-center overflow-hidden">
          <p className="text-[13px] text-gray-200">
            🚚 ENVÍO GRATIS A PARTIR DE $99.999
          </p>
        </div>
      ) : (
        ""
      )}
      {showHeader ? <Header /> : <HeaderPayment />}
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/encargo" element={<ShopByCommissions />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/ayuda" element={<Help />}></Route>
        <Route path="/terminos-y-condiciones" element={<TermsAndCondition />}></Route>
        <Route path="/politicas-de-privacidad" element={<PrivacyPolicy />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/encargo" element={<CustomMade />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/orden-transferencia-confirmada" element={<AfterTransfer />}></Route>
        <Route path="/orden-mp-confirmada" element={<AfterMp />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>

      <Route path="/usertable" element={<UserTable />}></Route>
      <Route path="/orderstable" element={<OrdersTable />}></Route>
      <Route exact path="/orderdetailbdd/:id" element={<OrderDetailBdd />}></Route>
      <Route path="/uploadorder" element={<OrderForm />}></Route>
      <Route exact path="/producttable" element={<ProductTable />}></Route>
      <Route exact path="/commissionstable" element={<CommissionsTableBdd />}></Route>
      <Route exact path="/commissionsdetail/:id" element={<CommissionsDetailBdd />}></Route>
      <Route
        exact
        path="/productdetailbdd/:id"
        element={<ProductDetailBdd />}
      ></Route>
      <Route path="/uploadproduct" element={<ProductForm />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
