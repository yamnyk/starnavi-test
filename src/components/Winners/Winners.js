import React, {useEffect, useState} from 'react';

const Winners = ({api}) => {
  const [winners,setWinners] = useState([]);
  
  useEffect(() => {
    const getWinners = async () => {
      const resp = await fetch(`${api}/winners`),
        data = await resp.json();
      
      setWinners(data);
    };
    
    getWinners();
  }, [api]);
  
  return (
    <div>
      {
        winners && winners.map(w => <p>{w.winner}</p>)
      }
    </div>
  );
};

export default Winners;