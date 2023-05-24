import './Landing.scss';
import { useState } from "react"
import InputForm from '../Form/input.jsx';
import ModalOpen from '../components/Modal/modal.jsx';
import TodoResult from '../components/TodoComponents/TodoResult.jsx';
import { faMusic, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from 'recoil';
import { musicState } from '../../../store/store.jsx';
import Digitalclock from '../components/clock/digitalclock.jsx';
import YouTube from 'react-player';
import CurrentLocation from '../components/weather/weatherbox.jsx';

function LandingPage () {

  // 값을 다시 반영하기 위해 조회가 아닌 state 로 변경, 랜딩에서의 똑같은 값. 
  // 이전 const  music = useRecoilValue(musicState); 
  const [music, setMusicList] = useRecoilState(musicState);
  const [selectItem, setItem] = useState(false);
  const [modal, setModal] = useState(false);
 
  const Modal= () =>{
    if(!modal){
      setModal(true);
    }else{
      CloseMadal();
    }
  }

  const CloseMadal = () => {
    setModal(false);
  }

  const toggleMusic = (status) => {
    console.log(status.youtubeLink);
    if(status.youtubeLink === ""){
      alert("음악을 선택해 주세요🎶")
    } else{
      //재생 상태값을 togl 반전 시키기 위해서 recoil 상태변경
      setMusicList({
        ...music, 
        playStatus: !status.playStatus
      })
    }
  };

  return(
    <div className='LandingContainer'>
      <span className='TopText'>&#34;오랫동안 꿈을 그리는 사람은 <br/>마침내 그 꿈을 닮아 간다.&#34; -앙드레 말로</span>
      <Digitalclock/>
      <CurrentLocation />
      <div className='LandingContainer_left'>
        <InputForm setData={setItem}/>
          <TodoResult 
            getItem={selectItem}
          />  
      </div>

      <img src='../../../../imge/LPplayer.png' alt='lp사진' className='lpimg'/>
      <div className='Round-cd'>
        <div className='Inner_box'>
          <FontAwesomeIcon
            icon={ music.playStatus ? faPause : faPlay}
            size="3x"
            color="#D3756B"
            style={{marginLeft:"40px", marginTop:"25px"}}
            onClick={() => toggleMusic(music)}
          />
        </div>
       
        <div className={music.playStatus ? "Round-cd__spin spin" : "NotRound"}>
            <img src={music.thumNailImag} alt='음악사진'/>      
        </div>
        <div style={{display:"none"}}> 
          <YouTube url={music.youtubeLink} 
            loop={true} 
            playing={music.playStatus}
            width="1vm" height="1vm" 
            controls={false}
          />  
        </div>   
      </div>

      <div className='LandingContainer_right'>
        <div className='LandingContainer_ModalBox'onClick={Modal}> 
          <FontAwesomeIcon
            icon={faMusic}
            size="2x"
            color="#FD8A8A"
            style={{marginLeft:"9px", marginTop:"10px"}}
          />
            {modal === true ?<ModalOpen/> : null}
        </div>
      </div>
    </div>
  )
}
export default LandingPage;