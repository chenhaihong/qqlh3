import mitt, { Handler } from 'mitt';

const mitt2 = () => {
  const emitter = mitt();
  emitter.once = (type: string, handler: Function) => {
    const wrappedHandler: Handler = (evt: string) => {
      handler(evt)
      emitter.off(type, wrappedHandler)
    }
    emitter.on(type, wrappedHandler)
  }
  return emitter
}

export default mitt2;