import React from "react";
import eacher from "./each.module.css";
import axios from "axios";
import { useEffect } from 'react'


/// shuff functionality to shuffle the array of letter for colors

// const shuffle = (array) => {
//   let currentIndex = array.length;
// 	let temporaryValue, randomIndex;

// 	// While there remain elements to shuffle...
// 	while (0 !== currentIndex) {
// 		// Pick a remaining element...
// 		randomIndex = Math.floor(Math.random() * currentIndex);
// 		currentIndex -= 1;

// 		// And swap it with the current element.
// 		temporaryValue = array[currentIndex];
// 		array[currentIndex] = array[randomIndex];
// 		array[randomIndex] = temporaryValue;
// 	}

// 	return array;

// }

/// color generator functionality
// const generateRandomColor = () => {
//   var hex = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];
//   var color = "#";
//   for (var i = 0; i < 6; i++) {
//     shuffle(hex);
//     color += hex[0];
//   }
//   return color;
// };



// letter avarta for leader board
const AvartImages = ({ name }) => {
  const userProfilename = name?.split(" ");
  
  const firstLetter = userProfilename[0]?.charAt(0);
 
  return (
    <div className={eacher.avatar_circle}>
      <div className={eacher.initials}>{firstLetter}</div>
    </div>
  );
};



const Each = ({ each, rank, username }) => {
  useEffect(()=>{
    
},[])

  const formatNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatRank = (x) => {
    if(x == 1){
      return  `${x}st`                                                                                          
    }else if(x == 2) {
      return `${x}nd`
    }else if(x == 3){
      return  `${x}rd`
    }
    else {
      return `${x}th`
    }
  }
  




  return (
    <>
      <tr className={username === each?.user?.name ? eacher.mine : null}>
        <td className={`${eacher.rank}`}>{formatRank(rank)}</td>
        <td
          className={eacher.name}
          style={{
            display: "flex",
            alignItems: "center",
            textTransform: "capitalize",
          }}
        >
          <AvartImages name={each?.user?.name} /> &nbsp;&nbsp;&nbsp;&nbsp;
          {each?.user?.name?.split(' ')[0]}
        </td>
        <td className={eacher.points}>{formatNumber(each.points)} pts</td>
      </tr>

    </>
  );
};

export default Each;
