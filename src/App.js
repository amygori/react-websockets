import { DateGreeting } from './components/DateGreeting'
import Login from './components/Login'
import useLocalStorageState from 'use-local-storage-state'
import { Route, Routes, Link, useLocation, Navigate } from 'react-router-dom'
import ChatList from './components/ChatList'
import Chat from './components/Chat'
import './App.css'

function App(props) {
  const [token, setToken] = useLocalStorageState('wsToken', '')
  const [loggedInUser, setLoggedInUser] = useLocalStorageState(
    'wsLoggedInUser',
    ''
  )
  const location = useLocation()

  const handleLogOut = () => {
    setToken('')
    setLoggedInUser('')
  }

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Chat</h1>
        {token && (
          <nav className="nav">
            {
              loggedInUser ?
              (<button onClick={() => handleLogOut()}>log out</button>)
              :
              (<Link to="/login" className="btn">
              Login
            </Link>)
            }

          </nav>
        )}
      </header>
      <main>
        {location.pathname !== '/' && <Link to="/">Back to List</Link>}
        {token ? (
          <>
            <DateGreeting loggedInUser={loggedInUser} />
            <Routes>
              <Route path="/" element={<ChatList />} />
              <Route path="/chat/:roomName" element={loggedInUser ? <Chat username={loggedInUser} token={token} /> : <Navigate to="/login"/>} />
              <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} setToken={setToken} />} />
            </Routes>
          </>
        ) : (
          <Login setLoggedInUser={setLoggedInUser} setToken={setToken} />
        )}
      </main>
    </>
  )
}

export default App
