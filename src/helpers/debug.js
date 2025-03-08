export function logCallStackSize() {
  try {
    throw new Error();
  } catch (e) {
    const stackTrace = e.stack || '';
    const stackFrames = stackTrace.split('\n').filter(line => line.trim() !== '' && !line.includes("Error"));
    console.log('Call stack size:', stackFrames.length);
    console.log(e);
    console.trace("Debugger Trace: ");
  }
}