import './input.scss'
import { useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { todoPost } from '../../../utils/apis/apis.jsx';

function InputForm(props) {
  
  const [param, setParam] = useState({
      title : ""
    , order : 0
  })

  const {title} = param;

  const handleChange = (e) => {
    setParam({
      ...param,
      [e.target.name]: e.target.value
    });
  };

  const reset = () => {
    setParam({
      title : ""
    , order : 0
     });
  }
  
  const onClickTodo = (e) => {
    let flag = false;
    props.setData(flag);
    e.preventDefault();
    if(param.title === '' || param.title === " "){
      alert("공백으로 등록할수없습니다." , "warning");
      return false;
    }

    const Todoalert = confirm("등록하시겠습니까?😮");
    if (Todoalert === true) {
      todoPost(param)
      .then(() => {
      alert("등록 완료.😊");
      flag = true;
      props.setData(flag);
      reset();
    })
    } else {
      alert("취소되었습니다")
    }
  };


  return(
    <>
      <form className="InputContainer" onSubmit={onClickTodo} >
        <input className='input_title'
          type='text' 
          name="title" 
          value={title}
          placeholder="할일을 등록해주세요!"
          onChange={handleChange}
        />
        <FontAwesomeIcon
            type="submit" 
            icon={faPlus} 
            color='#FF017B'
            onClick={onClickTodo}
          />
      </form>
    </>
  )
}
export default InputForm;