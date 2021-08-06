// import React, { Component } from 'react';
// // import { deleteCart } from '../store/cart';

// export default class CartContainer extends Component {
//   render() {
//     const { genies } = this.props
//     return (
//       <div className = "alert">
//         {genies.length === 0 ? " Cart is Empty" : <div> You have {genies.length} products,</div>}
//         {genies.length > 0 &&
//           <div >
//             <ul>
//               {genies.map(genie =>
//                 <li className = "genie" key = {genie.Id || genie.genieId}>
//                   <b>{genie.name}</b>
//                   X{genie.inventory} ={genie.price* genie.inventory}
//                   <button className = "Remove" onClick= {(e)=> handleDelete(e,genie)}>X</button>
//                 </li>)}
//             </ul>
//           </div>
//         }

//       </div>
//     )
//   }
// }
