import { useEffect, useState } from "react";
import "./css/chat.css";

const Chat = ({socket}) => {

    const [state, setMessageList] = useState([{name : 'Player 1', value : 'Hello'}]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("chat.response", (data) => {
            console.log(data);
            setMessageList([...state, data]);
        });
    }, [socket, state]);
    
    const onChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("You clicked submit!");
        console.log(message); 

        const newMessage = {name : 'Player 1', value : message};
        socket.emit("chat.sent", newMessage);

        setMessage('');

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
      <textarea placeholder="Type message.." name="msg" onChange={onChange} value={message} required></textarea>
  
      <button type="submit" className="btn">Send</button>
    </form>
  </div>

}

export default Chat;