module.exports.run = (x, message) => x.content !== message.content?Comp.client.emit('message', message, 1):''