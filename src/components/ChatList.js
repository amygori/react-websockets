import { Link } from "react-router-dom"
const ChatList = () => {
  const chatRooms = ["red", "blue", "yellow"]
  return (
    <div className="dev-list">
          <ul>
            {chatRooms.map(chatRoom => <li><Link to={`/chat/${chatRoom}`}>{chatRoom}</Link></li>)}
          </ul>
        </div>
  )
}

export default ChatList
