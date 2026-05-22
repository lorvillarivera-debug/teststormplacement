import { h } from 'preact';

export default ({ className, subtitle, children }) => {
 const test = "anything"
    return <div class={`title`}>
        <h1 class={`title__heading${className ? ` ${className}` : ''}`}>{children}</h1>
        {subtitle && <p class="title__subtitle">{subtitle}</p>}
    </div>;
};