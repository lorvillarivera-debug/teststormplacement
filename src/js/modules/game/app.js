import { h, Fragment } from 'preact';
import { signal } from '@preact/signals';
import Header from './components/header';
import Ladder from './components/ladder';
import { initBoard, initialise } from './utils/board';

const SIZE = 19;
const NUM_LADDERS = 5;
const { board, orientations } = initialise(NUM_LADDERS, SIZE, initBoard(SIZE));

console.log(orientations);

const App = () => <Fragment> 
    <div class="wrap">
        <Header>
            <h1 class="pagetitle">Lorenzo's Ladders </h1>
        </Header>
        <div class="board" style={`--size: ${SIZE}`}>
            <div class="board__grid">
               {
                    board.map((row, idx) => {
                        return row.map((cell, idxInner) => {
                                    return <div class="board__cell">{`${idx}, ${idxInner}`}</div>;
                                })
                    })
                }
            </div>
            <div class="scaleladder">
            {
                orientations.map(orientation => <Ladder
                                                    x1={orientation.translate[0]}
                                                    y1={orientation.translate[1]}
                                                    rotate={`${orientation.rotate}rad`}
                                                    scale={`${orientation.length_sf}`}
                                                />)
            }
            </div>
        </div>
    </div>
</Fragment>
export default App;