
import CatchFire from './CatchFire';

const Games = () => {
  
  const EarnPage=
    
    
      <div className="games">
        <div className='game1'>
          <h1>Catch fire</h1>
          <p>Simmple game</p>
          <button on onClick={startGame}>Play</button>
        </div>
        <CatchFire/>
      </div>
    ;
  
  return EarnPage;
};
export default Games;