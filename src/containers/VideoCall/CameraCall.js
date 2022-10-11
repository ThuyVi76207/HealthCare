import Button from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core";
import { Assignment } from "@material-ui/icons";
import { Phone } from "@material-ui/icons";
import React, {useEffect, useRef, useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import SimplePeer from "simple-peer";
import { io } from "socket.io-client";

import './CameraCall.scss';

const CameraCall = () => {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")

    const myVideo = useRef()

    return (
        <div>Camera</div>
    )
}

export default CameraCall