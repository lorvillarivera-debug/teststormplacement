import { h, Fragment } from 'preact';
import Ladder from './components/ladder';
import Header from '../../../templates/components/header';
// import Main from './components/main';
import Title from '../../../templates/components/body';

import { signal } from '@preact/signals';


const boardup = signal(true);
const boardecider = signal('');

function changeboardstate() {
    boardup.value = boardecider.value;
    boardecider.value = '';
}

const canboardchange = () => {
    boardecider.value = false
    changeboardstate()
}

var board = null;
console.log(board)

function increase_snakes() {
    numsnakes += 1;
}
function decrease_snakes() {
    numsnakes -= 1;
}

function initialiseboard(size) {
    var line = [];
    board = [];
    for (let i = 0; i < size; i++) {
        line.push({text : ""});
    }

    for (let i = 0; i < size; i++) {
        board.push(line);
    }
    return board
}

// function initialisesnakes(numsnakes) {
//     var snakestartpos = []
//     for (i = 0; i <numsnakes; i++) {
//         snakex = Math.round(columns * Math.random())
//         snakey = Math.round(columns * Math.random())
//         if ((snakex == 0 && snakey == 0) || (snakex == columns && snakey == columns) || (board[snakex][snakey].value == -1)) {
//             numsnakes = numsnakes + 1
//         } 
//      }
//         else {
//             snakestartpos.push([snakex, snakey])
//             board[snakex][snakey].value == -1
//         }

//     for (i = 0; i <numsnakes; i++) {
//         snakey = Math.round()
//     }
// }

const things = signal(board);
const decider = signal('');

function todo() {
    things.value = decider.value;
    decider.value = '';
}

var columns = 0
const getboardl = () => {
    let value = document.getElementById("input")?.value;
    if (!value || value < 2 || value > 19) return;
    board = initialiseboard(value)
    decider.value = board
    //console.log(decider.value)
    todo()
    console.log(board)
    columns = value
}

const App = () => 

<Fragment> 
<div class = "wrap">
<Header>
    <h1 class="pagetitle">Lorenzo's Ladders </h1>
    <div class="pagesetting">
    <label class="label"for = "boardinitialise"> size of board? don't exceed 20 </label>
    <input class="textbox" type="number" id="input" placeholder="e.g.5" />
    {(boardup.value && <button class="button" onclick = {getboardl}>generate board</button>)}
    </div>
</Header>

 <div class="board" style={`--columns: ${columns}`}> 
    {
        things.value ? things.value.map((row, idx) => {
                return row.map((cell, idxInner) => {
                            return <div class="board__cell">{`${idx}, ${idxInner}`}</div>;
                        })
            })
            : null
    }
    {/* <Ladder className="ladder1" height={915} width={144} angle1={0} angle2={0} x1 = {0} y1 = {0} height_sf = {2} sf = {0.5}/>
    <Ladder height={915} width={144} angle1={0} angle2={0}/>
    <Ladder height={915} width={144} angle1={0} angle2={0}/> */}

    {
        things.value ? 
    }

    <button onclick = {canboardchange}>click to lock settings in</button>
    
</div>


start (1,1)
end (8,9)





{/* { <div>
    <h1> `${things.value.map(board => board.text )}` </h1>
</div> } */}


</div>
</Fragment>

export default App; 



// var board = null;
// var columns = null;
// // function initialiseboard(size) {
// //     var line = [];
// //     board = [];
// //     for (let i = 0; i < size; i++) {
// //         line.push({number : 0});
// //     }

// //     for (let i = 0; i < size; i++) {
// //         board.push(line);
// //     }
// //     columns = size
// //     return board
// // }

// function initialiseboard(size) {
//   board = Array.from({ length: size }, () => Array(size).fill({number : 0}));
//   columns = size
// }

// function initialisesnakes(numsnakes) {
//     var snakestartpos = []
//     var snakeendpos = []
//     for (i = 0; i <numsnakes; i++) {
//         snakex = Math.round((columns-1) * Math.random()) 
//         snakey = Math.round((columns-1) * Math.random()) 
//         // console.log(snakex)
//         // console.log(snakey)
//         console.log(board[snakex][snakey].number)
//         if ((snakex == 0 && snakey == 0) || (snakex == columns-1 && snakey == columns-1) || (board[snakex][snakey].number == -1)) {
//             numsnakes = numsnakes + 1;
//         } 
//         else {
//         snakestartpos.push([snakex, snakey]);
//         board[snakex][snakey] = {number : -1} 
//         }
//     }
    
//     for (i=0; i<numsnakes;i++) {
//       var snakey = Math.round(snakestartpos[i][1]*Math.random())
//       var snakex = 0
//       if (snakestartpos[i][1] == snakey) {
//         snakex = Math.round(snakestartpos[i][0] * Math.random())
//       }
//       else {
//         snakex = Math.round((columns-1) * Math.random()) 
//       }
//       if ((board[snakex][snakey].number == 1) || (board[snakex][snakey].number == -1)) {
//         numsnakes = numsnakes + 1 
//       }
//       else {
//         board[snakex][snakey] = {number : 1}
//       }
//     }
    

//     // for (i = 0; i <numsnakes; i++) {
//     //     snakey = Math.round();
//     // }
// }

// initialiseboard(12);
// board[1][2] = {numner: 100}
// initialisesnakes(141)
// console.log(board);

// //error - cannot set properties of an undefined 
// //error - when snakex or snakey equals 0 , will get -1, screws up logic 
