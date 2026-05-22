import { h } from 'preact';
import DefaultLayout from '@layouts/default';
import Example, { Ghost, Empty, Error } from '@components/example';

export const title = 'Home';

// export const meta = [{
//     name: 'description',
//     content: ''
// }];

const HomePage = () => <DefaultLayout>
    <div id="app" />
</DefaultLayout>;

export default HomePage;