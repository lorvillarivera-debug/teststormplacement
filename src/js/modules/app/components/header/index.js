import { h } from 'preact';
import Account from '../account';

export default ({ username, another, actualnum, displayfactorial, space}) => <header class="myheader">
    <Account>{username}</Account>
    {another}
    {actualnum}
    {space}
    {displayfactorial}

    
    
    
</header>




