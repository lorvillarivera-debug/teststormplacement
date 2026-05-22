import { h } from 'preact';
//import './please.css';

export default ({
    width = 144,
    height = 915,
    angle1 = 0,
    angle2 = 0,
    right = 0,
    up = 0,
    x1 = 0,
    y1 = 0.,
    height_sf = 1,
    sf = 1
}) => <svg class="ladder" width={width} height={height} style={{ 
    transform: `scale(0.3, 1) translate(${x1}px, ${y1}px) scale(${sf}) scale(1, ${height_sf}) rotate(${angle1}rad) `,





}} viewBox="0 0 144 915" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="8.17077e-08" x2="1.99996" y2="915" stroke="black" stroke-width="4"/>
    <line x1="142" y1="8.17077e-08" x2="142" y2="915" stroke="black" stroke-width="4"/>
    <line y1="45.5" x2="140" y2="45.5" stroke="black"/>
    <line y1="145.5" x2="140" y2="145.5" stroke="black"/>
    <line y1="245.5" x2="140" y2="245.5" stroke="black"/>
    <line y1="345.5" x2="140" y2="345.5" stroke="black"/>
    <line y1="445.5" x2="140" y2="445.5" stroke="black"/>
    <line y1="445.5" x2="140" y2="445.5" stroke="black"/>
    <line y1="545.5" x2="140" y2="545.5" stroke="black"/>
    <line y1="645.5" x2="140" y2="645.5" stroke="black"/>
    <line y1="745.5" x2="140" y2="745.5" stroke="black"/>
    <line y1="845.5" x2="140" y2="845.5" stroke="black"/>
</svg>;

//style={`transform: skew(${angle1}deg, ${angle2}deg)`}
// 