import React, { useEffect, useState } from "react";
import './ChatMessager.scss';
import socketIO, * as io from 'socket.io-client';
import FormChat from "./FormChat";
import ChatBox from "./ChatBox";

let socket = socketIO("ws://localhost:7777", { transports: ["websocket"] });

const ChatMessager = () => {
    const [statusConnect, setStatusConnect] = useState(false);
    // const [valChat, setValChat] = useState([]);
    const [textReceived, setTextReceived] = useState("Chào bạn, bạn cần hỗ trợ gì?");



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

    const [showChat, setShowChat] = useState(false);
    const [showIconChat, setShowIconChat] = useState(false);

    // useEffect(() => {
    //     window.onscroll = function () {
    //         console.info(document.documentElement.scrollTop);
    //         var livechat = document.getElementById("livechat");
    //         if (document.documentElement.scrollTop > 400 || document.body.scrollTop > 400) {
    //             livechat.style.display = "block"
    //         } else {
    //             livechat.style.display = "none"
    //         }

    //     }
    // }, [])
    useEffect(() => {
        // Define the on-scroll callback
        const callbackChat = function () {
            // const secTop = secRef.current.offsetTop;
            if (window.scrollY >= 0) {
                setShowIconChat(true);
            }
            else {
                setShowIconChat(false);
                setShowChat(false);
            }
        };

        // Attach the callback after the component mounts
        window.addEventListener("scroll", callbackChat);

        // Detach the callback before the component unmounts
        return () => window.removeEventListener("scroll", callbackChat);
    }, []);


    return (


        <>
            <div
            // onClick={() => {
            //     socket.emit("joinRoom", { idRoom: 123 })
            // }}

            > {showIconChat ?
                <>
                    <div id="livechat" onClick={() => { setShowChat(!showChat) }} className="ctrlq mes-button">
                        <div class="bubble">1</div>
                        <div class="bubble-msg">Bạn cần hỗ trợ?</div>
                    </div>

                </>


                : null
                }
                <div className="form-chat-container">
                    <div></div>
                    {showChat ? <FormChat dataMessage={textReceived} /> : null}
                </div>






            </div>

        </>

    )
}
export default ChatMessager