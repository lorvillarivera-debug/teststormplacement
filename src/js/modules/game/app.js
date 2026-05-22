import { h, Fragment } from 'preact';
import { signal } from '@preact/signals';
import Header from './components/header';
import Ladder from './components/ladder';
import Snake from './components/snake';
import { initBoard, initialise } from './utils/board';

const SIZE = 19;
const NUM_LADDERS = 5;
const NUM_SNAKES = 5;
const LAST_CELL = SIZE * SIZE - 1;

const laddersInit = initialise(NUM_LADDERS, SIZE, initBoard(SIZE));
const snakesInit = initialise(NUM_SNAKES, SIZE, laddersInit.board, 5);
const board = snakesInit.board;
const ladderOrientations = laddersInit.orientations;
const snakeOrientations = snakesInit.orientations;

const posToCell = (r, c) => r * SIZE + c;

// Ladder bottom (endpos) -> top (startpos)
const ladderMap = {};
laddersInit.endpos.forEach((bottom, i) => {
    const top = laddersInit.startpos[i];
    ladderMap[posToCell(bottom[0], bottom[1])] = posToCell(top[0], top[1]);
});

// Snake head (startpos, the high cell) -> tail (endpos, the low cell)
const snakeMap = {};
snakesInit.startpos.forEach((head, i) => {
    const tail = snakesInit.endpos[i];
    snakeMap[posToCell(head[0], head[1])] = posToCell(tail[0], tail[1]);
});

const playerPositions = [signal(0), signal(0)];
const currentPlayer = signal(0);
const lastRoll = signal(null);
const winner = signal(null);

const rollDie = () => {
    if (winner.value !== null) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    lastRoll.value = roll;

    const pIdx = currentPlayer.value;
    const tentative = playerPositions[pIdx].value + roll;

    let newPos;
    if (tentative > LAST_CELL) {
        // Must roll exact to win; overshooting keeps player in place.
        newPos = playerPositions[pIdx].value;
    } else {
        newPos = tentative;
        if (ladderMap[newPos] !== undefined) newPos = ladderMap[newPos];
        else if (snakeMap[newPos] !== undefined) newPos = snakeMap[newPos];
    }
    playerPositions[pIdx].value = newPos;

    if (newPos === LAST_CELL) {
        winner.value = pIdx;
    } else {
        currentPlayer.value = 1 - pIdx;
    }
};

const App = () => {
    const p0 = playerPositions[0].value;
    const p1 = playerPositions[1].value;
    const cp = currentPlayer.value;
    const w = winner.value;
    const r = lastRoll.value;

    return <Fragment>
        <div class="wrap">
            <Header>
                <h1 class="pagetitle">Lorenzo's Ladders </h1>
            </Header>
            <div class="game">
                <button class="game__roll" onClick={rollDie} disabled={w !== null}>Roll die</button>
                <div class="game__status">
                    {r !== null && <span>Rolled <strong>{r}</strong>.</span>}
                    {w !== null
                        ? <span class="game__winner">Player {w + 1} wins!</span>
                        : <span>Player <strong>{cp + 1}</strong>'s turn.</span>}
                </div>
                <div class="game__players">
                    <span class="game__player"><span class="player player--1" /> Player 1 — cell {p0 + 1}</span>
                    <span class="game__player"><span class="player player--2" /> Player 2 — cell {p1 + 1}</span>
                </div>
            </div>
            <div class="board" style={`--size: ${SIZE}`}>
                <div class="board__grid">
                   {
                        Array.from({ length: SIZE }, (_, displayIdx) => {
                            const idx = SIZE - 1 - displayIdx;
                            return board[idx].map((cell, j) => {
                                        const idxInner = idx % 2 === 0 ? j : SIZE - 1 - j;
                                        const cellNum = posToCell(idx, idxInner);
                                        return <div class="board__cell" title={`row ${idx}, col ${idxInner}`}>
                                            <span class="board__num">{cellNum + 1}</span>
                                            {p0 === cellNum && <span class="player player--1" />}
                                            {p1 === cellNum && <span class="player player--2" />}
                                        </div>;
                                    })
                        })
                    }
                </div>
                <div class="scaleladder">
                {
                    ladderOrientations.map(orientation => <Ladder
                                                        x1={orientation.translate[0]}
                                                        y1={orientation.translate[1]}
                                                        rotate={`${orientation.rotate}rad`}
                                                        scale={`${orientation.length_sf}`}
                                                    />)
                }
                {
                    snakeOrientations.map(orientation => <Snake
                                                        x1={orientation.translate[0]}
                                                        y1={orientation.translate[1]}
                                                        rotate={`${orientation.rotate}rad`}
                                                        scale={`${orientation.length_sf}`}
                                                    />)
                }
                </div>
            </div>
        </div>
    </Fragment>;
}
export default App;
