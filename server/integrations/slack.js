const sendSlackMessage = (slackObject, error) => {
  const hasValidProperties = slackObject.hasOwnProperty('url') &&
  slackObject.hasOwnProperty('username') &&
  slackObject.hasOwnProperty('channel')

  if (slackObject === null || !hasValidProperties)  {
    return
  }

  const {
    url,
    username,
    channel
  } = slackObject

  const {
    source,
    lineno,
    colno,
    message
  } = body

  const text = `${source} 의 *${lineno}* 번 행 / *${colno}* 번 열에 에러가 있습니다.\n발생시각 : *${Date.now()}\n*메시지 : *${message}*`

  return axios({
    method: 'POST',
    url,
    data: {
      username,
      channel,
      text
    }
  })
}

module.exports = {
  sendSlackMessage
}
