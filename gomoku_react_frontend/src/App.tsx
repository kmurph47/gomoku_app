import './App.css';
import { Header, UserProvider } from './components';
import { Home, LoginPage, MainGame, GameHistory, GameLog, SignUp } from './pages'
import { Routes, Route, Navigate } from 'react-router-dom'


function App() {
  return (
    <>
    <UserProvider>
      <Header/>
      <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="loginpage" element={ <LoginPage /> }/>
        <Route path="signup" element={ <SignUp /> }/>
        <Route path="maingame/:paramID" element={ <MainGame /> }/>
         <Route path="gamehistory/:gameID" element={ <GameHistory /> }/>
         <Route path="gamelog" element={ <GameLog /> }/> 
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </main> 


    </UserProvider>
    </>
  )
}

export default App;
