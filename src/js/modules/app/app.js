import { h, Fragment } from 'preact';
import Header from './components/header';
// import Main from './components/main';
import Title from './components/title';

const username = "my_name";
let length = 1;
let space = "     ";
let realength = 0;
for (let i = 1; i < username.length; i++) {
    length = length*i;
    realength = i
}

let my_array = []
let userinput = 10
for (let i = 1; i < userinput; i++) {
    my_array.push([1,0])

}


const board = [
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2]
];

const columns = 3;

const App = () => <Fragment>
    <Header username={username + ""} another="prop" actualnum = {length} space = {space + "\n"} displayfactorial = {realength}>
    
    {/* <Body actualnum = {length} space = {space + "\n"} displayfactorial = {realength}>

</Body> */}

</Header>

<Title className="My_subtitle" mlist = {my_array}>My title, {my_array}</Title>

<Title className="title__heading--lg">large name</Title>

<div class="board" style={`--columns: ${columns}`}> 
    {
        board.map((row, idx) => {
            return row.map((cell, idxInner) => {
                        return <div class="board__cell">{`${idx}, ${idxInner}`}</div>;
                    })
        })
    }
</div>
</Fragment>;



export default App;
