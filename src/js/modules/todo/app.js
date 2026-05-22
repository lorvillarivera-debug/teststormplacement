import { h, Fragment } from 'preact';
import Header from '../../../templates/components/header';
// import Main from './components/main';
import Title from '../../../templates/components/body';

import { signal } from '@preact/signals';




const things = signal([{ text: 'my thing' }, { text: 'my thign 2 ' }]);

const decider = signal('');

function todo() {
    things.value = [...things.value, {text: decider.value}];
    decider.value = '';
}


var thingsvaluebfr = things.value.map(thing => thing.text);


decider.value = "new thing added pls work";
todo();

const App = () => <Fragment>
    <Header> To do list</Header>

    <Title > append button </Title>
    <button input = "text" > click me  </button>

    <Title > display list  </Title>
    <button onClick={}

    

    

</Fragment>;


export default App;
