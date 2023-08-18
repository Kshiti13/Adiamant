import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Switch, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignInScreen from "./components/SignInScreen";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm";
import PayPalPayment from "./components/PayPalPayment";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RefundPolicy from "./components/RefundPolicy";
import FlashcardGenerator from "./components/FlashCardsGenerator";



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,

  },
  {
    path: "/auth",
    element: <SignInScreen />,

  },
  {
    path: "/stripePayment",
    element: <PaymentForm />,

  },
  {
    path: "/paypalPayment",
    element: <PayPalPayment />,

  },
  {
    path: "/contactUs",
    element: <Contact />,

  },
  {
    path: "/faq",
    element: <FAQ />,

  },
  {
    path: "/tos",
    element: <TermsAndConditions />,

  },
  {
    path: "/privacyPolicy",
    element: <PrivacyPolicy />,

  },
  {
    path: "/refundPolicy",
    element: <RefundPolicy />,

  },
  {
    path: "/flashCards",
    element: <FlashcardGenerator />,

  },
]);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  )
}