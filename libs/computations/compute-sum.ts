export function testComputation() {
  let sum = 0;
  for ( let i = 0; i < 1e9; i += 1 ) {
    sum += 1;
  }
  return sum;
}

process.on('message', ( msg ) => {
  const sum = testComputation();
  process.send(sum);
});
