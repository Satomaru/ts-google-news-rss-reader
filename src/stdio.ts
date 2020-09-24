export const stdio = {
  listenStdin: (callback: (input: string) => void) => {
    process.stdin.resume();

    process.stdin.on('data', (buffer: Buffer) =>
      callback(buffer.toString().replace(/[\s\0]+$/, '').trim()));
  }
};
