
const textbuffer = Buffer.from("node")
console.log(textbuffer);

console.log(textbuffer.toString("utf-8"))

const bufferLength = Buffer.from("Hello Node")
console.log(bufferLength.length);

const fixedBuffer = Buffer.alloc(5)
console.log(fixedBuffer);
fixedBuffer.write("API");
console.log(fixedBuffer.toString("utf-8"));

const chunks = [Buffer.from ("Hello "), Buffer.from("Node "), Buffer.from("Js.")]
const combined = Buffer.concat(chunks);

console.log( combined, combined.toString('utf-8'));
