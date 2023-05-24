import { useState, useEffect } from 'react';
import { getTodo, deletTodo, changeTodo} from '../../../../utils/apis/apis.jsx';
import { faXmark, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
import { pink } from '@mui/material/colors';
import './Todo.scss'

function TodoResult(props){

  const [dataList, setDatalist] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  // input 입력 상태 변경
  const [editedTitle, setEditedTitle] = useState();
  const [editingItemId, setEditingItemId] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);


  const handleCheckboxChange = (itemId, title) => {
    let flag = false;
    setCheckedItems((prevItems) => {
      if (prevItems.includes(itemId)) {
        setIsChecked(false)
        return prevItems.filter((id) => id !== itemId);
      } else {
        flag = true;
        setIsChecked(true)
        return [...prevItems, itemId];
      }
    });
      
    dataToSend.title = title;
    dataToSend.done = flag;
    sendDataToServer(itemId, dataToSend)
  };

  const search = () => {
    getTodo()
    .then((response => {
      setDatalist(response)
      const initialCheckedItems = response
      .filter((item) => item.done)
      .map((item) => item.id);
      setCheckedItems(initialCheckedItems);
    }))
  }; 

  const UTCchangeKST = (utcDate) => {
    const date = new Date(utcDate);
    const utc = date.getTime() + (date.getTimezoneOffset()* 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + (KR_TIME_DIFF));
    return kr_curr.toLocaleString();
  }


  useEffect(() => {
    search(props.getItem);
  // eslint-disable-next-line react/prop-types
  }, [props.getItem]);

  const clickDelet = (id) => {
    const resultDelet = confirm("삭제하시겠습니까?😮");
    if ( resultDelet === true ){
      deletTodo(id)
    .then(() => {
      alert("삭제되었습니다.");
      search();  
    });
    } else {
      alert("취소되었습니다.")
    }
  }; 


  const getItemTitleById = (itemId) => {
    const item = dataList.find((item) => item.id === itemId);
    console.log(item)
    return item ? item.title.title || item.title : "";
  };

  const handleEditButtonClick = (itemId) => {
    const result = confirm("수정하시겠습니까?😮");
    if (result === true) {
      setEditingItemId(itemId);
      setEditedTitle(getItemTitleById(itemId));
    } else {
      alert("취소되었습니다.");
    }
  };

  const handleTitleInputChange = (e) => { 
    setEditedTitle(e.target.value);
  };

  const handleTitleInputBlur = (id) => {
    console.log(dataToSend)
    if (!editedTitle || editedTitle.trim() === "") {
      setEditingItemId(null);
    } else {
      sendDataToServer(id, dataToSend)
      .then((response) => {
        alert("수정완료!");
        setEditingItemId(null);
        search(response);  
      })
      .catch((error) => {
        console.error("Failed to send data:", error);
      });
    }
  };

  
  let dataToSend = {
    title: editedTitle,
    done: isChecked,
    order: 0
  };

async function sendDataToServer(id, dataToSend) {
  try {
    const param = await changeTodo(id, dataToSend);
    console.log(param);
  } catch (error) {
    console.log(error);
  }
}

  return(
    <div className='TodoResultContainer'>
      <div className='ListContainer'>
      {dataList.map((item, index) => (
      <div key={index}> 
        <ul className='todoList'>
          <li className='todolist-item'>         
            <div className='todolist-item__content'>
              <FontAwesomeIcon
                type="submit" 
                icon={faClock} 
                color='#EB5353'
                size="2x"
                style={{marginTop:"-2px"}}   
              />

            <div className='hovertext'>
              <span>작성날짜 : {UTCchangeKST(item.createdAt)} <br/>
              수정날짜 : {UTCchangeKST(item.updatedAt)}</span>
            </div>
              
              <Checkbox   
                id={item.id}
                name={item.id}
                value={item.title.title}
                checked={checkedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id, item.title.title || item.title)}
                color="default"
                sx={{
                  color: pink[400], // 원하는 색상으로 변경
                  '&.Mui-checked': {
                    color: pink[500], // 체크된 상태의 색상도 변경
                  },
                  '& .MuiSvgIcon-root': { fontSize: 30 }
                }}
              />
            </div>

            {editingItemId === item.id ?  (
              <>
                <div className='todolist-item__contentText'>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => handleTitleInputChange(e)}
                    autoFocus
                  />
                </div>
                <FontAwesomeIcon
                  onClick={() => handleTitleInputBlur(item.id)}  
                  type="submit" 
                  icon={faCheck} 
                  color='#EB5353'
                  size="2x"
                  style={{
                    marginLeft: "100px", marginTop:"8px"}}
                />
              </>
            ) : (
              <label
                className={
                  checkedItems.includes(item.id)
                    ? "todolist-item__contentText checked"
                    : "todolist-item__contentText"} 
                onClick={() => handleEditButtonClick(item.id)}>
                {item.title.title || item.title}
              </label>
            )}
        
              <div className='Button-box'>
                {editingItemId !== item.id && (
                  <FontAwesomeIcon
                    onClick={() => handleEditButtonClick(item.id)}  
                    type="submit" 
                    icon={faPenToSquare} 
                    color='#FF6464'
                    size="2x"
                    style={{
                      marginLeft: "10px", marginTop:"8px"}}
                  />
                )} 
                <div className='Buttonbox'>
                  <FontAwesomeIcon
                    type="submit" 
                    icon={faXmark} 
                    color='#FF6464'
                    size="2x"
                    onClick={() => clickDelet(item.id) }
                    style={{
                      marginLeft: "20px", marginTop:"8px"}}
                  />
                </div>
              </div>
              <i className='Line'></i>  
          </li>
        </ul>
      </div>
      ))}
      </div>
    </div>
  )
}
export default TodoResult;