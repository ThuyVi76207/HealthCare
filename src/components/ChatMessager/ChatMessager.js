import React from "react";
import './ChatMessager.scss';
const ChatMessager = () => {
    return (
        <div class="fb-livechat" id="livechat">
            <div class="ctrlq fb-overlay"></div>
            <div class="fb-widget">
                <div class="ctrlq fb-close"></div>
                <div class="fb-page" data-href="https://www.facebook.com/ThuyVi76207" data-tabs="messages" data-width="360" data-height="400" data-small-header="true" data-hide-cover="true" data-show-facepile="false"> </div>
                <div class="fb-credit">
                    <a href="https://thanhtrungmobile.vn" target="_blank" rel="sponsored">Powered by TT</a>
                </div>
                <div id="fb-root"></div>
            </div>
            <a href="https://m.me/100011498591149" title="Gửi tin nhắn cho chúng tôi qua Facebook" class="ctrlq fb-button">
                <div class="bubble">1</div>
                <div class="bubble-msg">Bạn cần hỗ trợ?</div>
            </a>
        </div>
    )
}
export default ChatMessager