const actionTypes = [
  'subscribeToTimer',
  'userSendRequested',
  'newUserAdded',
  'subscribeToTimer',
  'userJoined',
  'userLeft',
  'joinRequested',
  'usersRequested',
  'userStartedTyping',
  'userStoppedTyping',
  'messageAdded',
  'userRefreshed',
  'typingStopped',
  'typingStarted',
  'messageSendRequested'
].reduce((accum, msg) => {
  accum[ msg ] = msg
  return accum
}, {})

module.exports = actionTypes;
