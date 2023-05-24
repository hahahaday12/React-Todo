import './App.scss'
import {
  RecoilRoot,
} from 'recoil'; 
import LandingPage from './components/views/LandingPage/LandingPage'

function App() {

  return (
    <>
    <RecoilRoot> 
      <LandingPage/>
    </RecoilRoot>  
    </>
  )
}

export default App
