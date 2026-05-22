import { h, Fragment } from 'preact';
import Header from '../../../templates/components/header';
// import Main from './components/main';
import Title from '../../../templates/components/body';

import { signal } from '@preact/signals';


var board = []

function increase_snakes() {
    numsnakes += 1;
}

function decrease_snakes() {
    numsnakes -= 1;
}

function initialiseboard(size) {
    var line = [];
    var board = [];
    for (let i = 0; i < size; i++) {
        line.push();
    }

    for (let i = 0; i < size; i++) {
        board.push(line);
    }
}



// function getboardl() {
//     let boardl = document.getElementById("boardinitialise");
//     board = initialiseboard(boardl.value);
// }

const getboardl = () => {
    let boardl = document.getElementById("boardinitialise");
    board = initialiseboard()
}

const App = () => <Fragment> 
<Header>
    boardgame
</Header>

<input type="text" id="boardinitialise" placeholder="a square of what length do you wish"> </input>
<button onclick = {getboardl}>enter length</button>

{/* <div class="board" style={`--columns: ${columns}`}> 
    {
        board.map((row, idx) => {
            return row.map((cell, idxInner) => {
                        return <div class="board__cell">{`${idx}, ${idxInner}`}</div>;
                    })
        })
    } */}
{/* </div> */}

<h1> {board} please display </h1>
</Fragment>

    



export default App; 
