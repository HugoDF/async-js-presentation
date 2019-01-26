const arrow = async () => { return 1 }
const implicitReturnArrow = async () => 1
const anonymous = async function () { return 1 }
async function expression () { return 1 }

console.log(arrow()); // Promise { 1 }
console.log(implicitReturnArrow()); // Promise { 1 }
console.log(anonymous()); // Promise { 1 }
console.log(expression()); // Promise { 1 }

