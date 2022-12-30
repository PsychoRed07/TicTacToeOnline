import { io } from "socket.io-client";
import { useRef, useState } from "react";
import "./css/chat.css";


const url = window.location.origin;
let socket = io.connect(url);
var index = 0;

const Chat = () => {

    const [state, setMessageList] = useState([{id: 0, name : 'Player 1', value : 'Hello'}]);

    const msg = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("You clicked submit!");
        const input = msg.current.value;
        console.log(input);
        index = index + 1;

        const newMessage = {id : index, name : 'Player 1', value : input};
        console.log(newMessage);
        setMessageList([...state, newMessage]);

        msg.current.value = "";

    };


    return <div className="chat-popup" id="myForm">

    <h1>Chat</h1>

    <div className="chat-box">

        {state.map((msg, i)=> {
            return (
                <div key={i} className="chat-text">
                    <b>{msg.name} : </b>{msg.value}
                </div>
            )
        })}

        
    </div>

    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="msg"><b>Message</b></label>
      <textarea placeholder="Type message.." ref={msg} name="msg" required></textarea>
  
      <button type="submit" className="btn">Send</button>
    </form>
  </div>

}

export default Chat;