import { Link } from 'react-router-dom';
import './BottomNavBar.css';
const BottomNavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/frens">Frens</Link>
      <Link to="/earn">Earn</Link>
      <Link to="/Wallet">Wallet</Link>
    </nav>
  );
};

export default BottomNavBar;