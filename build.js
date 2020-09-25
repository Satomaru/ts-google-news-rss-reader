
const rimraf = require('rimraf');
const tsconfig = require('./tsconfig.json');
const outDir = tsconfig.compilerOptions.outDir;

console.log(`${outDir} removing...`);

rimraf(outDir, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log(`${outDir} removed`);
    console.log(`source transpiling...`);
    require('./node_modules/typescript/lib/tsc');
  }
});
