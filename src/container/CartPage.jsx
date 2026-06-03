import { Link } from "react-router-dom";

function CartPage() {
  return (
    <div>
      <h1>Cart Page</h1>

      <Link to="/">
        <button>Back To Home</button>
      </Link>
    </div>
  );
}

export default CartPage;