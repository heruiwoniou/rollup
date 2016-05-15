import util from './util';

export default function() {
    var a = util.extend({
        a: 1,
        b: 2,
        d: []
    }, { c: 3 });
    var b = util.extend({ a: 1, b: 2, d: [{ name: '2haha' }] }, { c: 3, d: [{ name: 'haha3333' }] });
    var c = util.extend(true, { a: 1, b: 2, d: {a:1} }, { c: 3, d: {b:2} });
    console.log(a, b, c);
}
