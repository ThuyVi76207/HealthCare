import { lib } from "markdown-it/lib/common/utils";
import React, { useEffect } from "react";
import './FormChat.scss';
import socketIO from 'socket.io-client';
import { useState } from "react";
import { isNull } from "lodash";

let socket = socketIO("ws://localhost:7777", { transports: ["websocket"] });

let count = 0;
const FormChat = ({ dataMessage }) => {



    const [val, setVal] = React.useState("");
    // const [valChat, setValChat] = React.useState(dataMessage)



    const handleChat = () => {

        socket.emit('on-chat', { message: val })
        count++;



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

    // console.log("Check valMes", valMes)
    // console.log('Check count', count)
    // if (dataMessage) {
    //     const ChatMessager = (dataMessage) => {
    //         const messages = document.querySelector('#messages');
    //         const chatItem = document.createElement('li');
    //         chatItem.textContent = dataMessage;
    //         messages.appendChild(chatItem);

    //     }
    //     ChatMessager(dataMessage);
    // }


    //  ? ChatMessager(dataMessage) : 'không có tin nhan'valChat.forEach(element => {
    //                 <li>{element}</li>
    //             })

    return (
        <div className="form-chat">
            <div className="text-center py-[5px]">Chat Box</div>
            <div className="form-chat-up">
                <ul id="messages">{
                    valMes && valMes.length > 0 && valMes.map((value, idx) => <li key={idx}>{value}</li>)
                    // dataMessage.map(() => <li>{dataMessage}</li>)
                }</ul>
            </div>

            {/* <div className="form-chat-down">
                <input id="chat-mes" className="input-chat" placeholder="Type something"
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value)
                    }}
                ></input>
                <button onClick={() => { handleChat && handleChat(val); ChatMessager(valChat) }} type="button">Gửi</button>
            </div> */}
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