import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(

'pk_test_51MVKIQLxwfj0fFM8rZPWqwz6F3E0dsR4dCCx5Trewdv4TZCYtabUMuXqGDnhJ3jUOuk5rZrMGopZ6ZpV7336gOgJ00xc0jtABv'
);

export default function CheckoutForm() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};
