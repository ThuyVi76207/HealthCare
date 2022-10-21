import { lib } from "markdown-it/lib/common/utils";
import React, { useEffect } from "react";
import './FormChat.scss';
import socketIO from 'socket.io-client';
import { useState } from "react";
import { isNull } from "lodash";

let socket = socketIO("ws://localhost:7777", { transports: ["websocket"] });

const FormChat = ({ dataMessage }) => {



    const [val, setVal] = React.useState("");
    // const [valChat, setValChat] = React.useState(dataMessage)



    const handleChat = () => {

        socket.emit('on-chat', { message: val })
        // socket.on('user-chat', (message) => {

        //     setValChat(message.message)

        // })


        // console.log("Check message: ", valChat);

    }
    const [valMes, setValMes] = useState([]);

    useEffect(() => {
        if (dataMessage) {
            setValMes([...valMes, dataMessage])
            setVal('')
        }
    }, [dataMessage])





    return (
        <div className="form-chat" id="mesageChat">
            <div className="text-center py-[5px] title-chat">Chat Box</div>
            <div className="form-chat-up">
                <ul className="messages">{
                    valMes && valMes.length > 0 && valMes.map((value, idx) => <li className="item-chat" key={idx}>{value}</li>)
                }</ul>
            </div>
            <div className="form-chat-down">
                <input id="chat-mes" className="input-chat" placeholder="Type something"
                    value={val}
                    onChange={(e) => { setVal(e.target.value) }}
                ></input>
                <button onClick={() => { handleChat && handleChat(val) }} type="button">Gửi</button>
            </div>


        </div>
    )
}
export default React.memo(FormChat)