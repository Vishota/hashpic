"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_sha256_1 = require("js-sha256");
exports.default = getHashpicSvg;
const blankSvg = //`<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
 `<g clip-path="url(#clip0_12_190)">
<rect width="300" height="300" :fill="colors[0]"/>
<path d="M50 100L100 150H0L50 100Z" :fill="colors[4]"/>
<path d="M250 100L300 150H200L250 100Z" :fill="colors[4]"/>
<path d="M150 100L200 150H100L150 100Z" :fill="colors[6]"/>
<path d="M100 150L50 100L150 100L100 150Z" :fill="colors[5]"/>
<path d="M200 150L150 100L250 100L200 150Z" :fill="colors[5]"/>
<path d="M50 200L100 150H0L50 200Z" :fill="colors[7]"/>
<path d="M250 200L300 150H200L250 200Z" :fill="colors[7]"/>
<path d="M150 200L200 150H100L150 200Z" :fill="colors[9]"/>
<path d="M100 150L50 200L150 200L100 150Z" :fill="colors[8]"/>
<path d="M200 150L150 200L250 200L200 150Z" :fill="colors[8]"/>
<path d="M150 1.52588e-05L200 50H100L150 1.52588e-05Z" :fill="colors[1]"/>
<path d="M0 50L-50 -1.11288e-06L50 7.62939e-06L0 50Z" :fill="colors[13]"/>
<path d="M150 100L200 50H100L150 100Z" :fill="colors[3]"/>
<path d="M100 50L50 100L150 100L100 50Z" :fill="colors[2]"/>
<path d="M200 50L150 100L250 100L200 50Z" :fill="colors[2]"/>
<path d="M150 200L200 250H100L150 200Z" :fill="colors[11]"/>
<path d="M100 250L50 200L150 200L100 250Z" :fill="colors[10]"/>
<path d="M200 250L150 200L250 200L200 250Z" :fill="colors[10]"/>
<path d="M150 300L200 250H100L150 300Z" :fill="colors[12]"/>
<path d="M300 50L250 -8.74228e-06L350 0L300 50Z" :fill="colors[13]"/>
<path d="M-3.8147e-06 250L-50 300L50 300L-3.8147e-06 250Z" :fill="colors[13]"/>
<path d="M300 250L250 300L350 300L300 250Z" :fill="colors[13]"/>
</g>`;
// </svg>`
function makeColorsArray(target) {
    const groups = js_sha256_1.sha256.create().update(target).hex().match(/.{1,6}/g);
    const leftBytes = groups === null || groups === void 0 ? void 0 : groups.pop();
    if (!groups || !leftBytes)
        throw 'Cannot get groups from word ' + target;
    const colors = groups.map((c) => '#' + c);
    const shape = leftBytes.split('').map((x) => Number('0x' + x));
    if (colors.length < 14)
        shape.reduce((a, b, i) => {
            const pos = a + b;
            colors.splice(pos % colors.length, 0, colors[0]);
            return pos;
        }, 0);
    return colors;
}
function getHashpicSvg(target) {
    const colors = makeColorsArray(target);
    return blankSvg.replace(/:fill="colors\[(\d+)\]"/g, (match, index) => `fill="${colors[Number(index)]}"`);
}
console.log(getHashpicSvg('vishota'));
