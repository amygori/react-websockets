import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import useWebSocket from 'react-use-websocket'
import './Chat.css'

const Chat = ({ username, token }) => {
  const { roomName } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  let protocol =
    window.location.protocol && window.location.protocol === 'https:'
      ? 'wss://'
      : 'ws://'

  const websocket_URL =
    protocol + process.env.REACT_APP_API_BASE_URL + '/ws/chat/' + roomName + '/'

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(websocket_URL, {
    onOpen: () => {
      console.log('WS OPEN')
    },
    onClose: (e) => console.log('Close Event: ', e),
    onMessage: (e) => {
      console.log('onMessage event: ', e)
    },
    shouldReconnect: (closeEvent) => true,
    queryParams: { token: token },
  })

  useEffect(() => {
    if (lastJsonMessage) {
      setMessages((currentMessages) => [...currentMessages, lastJsonMessage])
    }
  }, [lastJsonMessage])

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault()
      sendJsonMessage({
        type: 'contentchange',
        message: message,
        msgFrom: username,
      })
      console.log('message sent ✈️')
      setMessage('')
    },
    [message, username, sendJsonMessage]
  )

  return (
    <section>
      <div className="msg-container">
        <ul>
          {messages &&
            messages.map((msgObj, idx) => (
              <li
                className={
                  msgObj.msgFrom === username ? 'msg--own' : 'msg--other'
                }
                key={idx}
              >
                {msgObj.message}
              </li>
            ))}
        </ul>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          id="chat-message-input"
          type="text"
          size="100"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input id="chat-message-submit" type="submit" value="Send" />
      </form>
    </section>
  )
}

export default Chat
