import { useState } from "react"
import './digitalclock.scss'
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Digitalclock() {
  const [timer, setTimer] = useState("00:00:00");

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    setTimer(`${hours}:${minutes}:${seconds}`)
  }

  const startTimer = () => {
    setInterval(currentTimer, 1000)
  }
  startTimer()

    return (
      <div className='TimeNow'>
        <FontAwesomeIcon
            icon={faFaceSmileWink}
            size="4x"
            color="#FF7D7D"
            style={{marginLeft:"-60px", marginTop:"15px"}}
          />
          <span>
            {timer}  
          </span>
      </div>
    );
}

export default Digitalclock;