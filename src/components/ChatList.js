const ChatList = () => {
  const chats = ["red", "blue", "yellow"]
  return (
    <div className="dev-list">
          <ul>
            {chats.map(chat => <li>{chat}</li>)}
          </ul>
        </div>
  )
}

export default ChatList
