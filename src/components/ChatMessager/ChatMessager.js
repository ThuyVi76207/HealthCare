import React, { useEffect, useState } from "react";
import './ChatMessager.scss';
import socketIO, * as io from 'socket.io-client';
import FormChat from "./FormChat";

let socket = socketIO("ws://localhost:7777", { transports: ["websocket"] });

const ChatMessager = () => {
    const [statusConnect, setStatusConnect] = useState(false);
    // const [valChat, setValChat] = useState([]);
    const [textReceived, setTextReceived] = useState("");



    useEffect(() => {
        socket.on("connection", () => {

        });

        socket.on("connected", (data) => {
            setStatusConnect(data);
        })

        socket.on("user-chat", (data) => {
            setTextReceived(data.message);
        })

        return () => {
            socket.on("disconnect")
        }
    }, [])

    useEffect(() => {
        if (statusConnect) {
            console.log("AVASVASVAS", statusConnect);
            socket.emit("joinRoom", { idRoom: 123 })
        }
    }, [statusConnect])

    // const [valueChat, setValueChat] = useState("");






    return (
        // <div class="fb-livechat" id="livechat">
        //     <div class="ctrlq fb-overlay"></div>
        //     <div class="fb-widget">
        //         <div class="ctrlq fb-close"></div>
        //         <div class="fb-page" data-href="https://www.facebook.com/ThuyVi76207" data-tabs="messages" data-width="360" data-height="400" data-small-header="true" data-hide-cover="true" data-show-facepile="false"> </div>
        //         <div class="fb-credit">
        //             <a href="https://thanhtrungmobile.vn" target="_blank" rel="sponsored">Powered by TT</a>
        //         </div>
        //         <div id="fb-root"></div>
        //     </div>
        //     <a href="https://m.me/100011498591149" title="Gửi tin nhắn cho chúng tôi qua Facebook" class="ctrlq fb-button">
        //         <div class="bubble">1</div>
        //         <div class="bubble-msg">Bạn cần hỗ trợ?</div>
        //     </a>
        // </div>

        <>
            <div
            // onClick={() => {
            //     socket.emit("joinRoom", { idRoom: 123 })
            // }}

            >
                <div className="ctrlq fb-button">
                    <div class="bubble">1</div>
                    <div class="bubble-msg">Bạn cần hỗ trợ?</div>
                </div>
                <div className="form-chat-container">
                    <div></div>
                    <FormChat
                        // onChange={(val) => {
                        //     // console.log("val", val)
                        //     setValueChat(val)
                        // }}
                        // onChange={(e) => setValChat(e.target.value)}
                        dataMessage={textReceived}

                    />
                </div>

            </div>
        </>

    )
}
export default ChatMessager