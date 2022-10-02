import React from "react";
import './Footer.scss';
import logoWhite from '../../assets/Hcare-white.svg';
const Footer = () => {
    return (
        <div className="bg-footer">
            <div className="footer-up">
                <img src={logoWhite} className='h-[4.8rem] w-[25%]' />
                <div className="footer-conten">
                    <p>We are a team of passionate people whose goal is to improve everyone's life.</p>
                    <div className="footer-share">
                        <h5>Share</h5>
                        <ion-icon name="logo-facebook"></ion-icon>
                        <ion-icon name="logo-twitter"></ion-icon>
                        <ion-icon name="logo-linkedin"></ion-icon>
                        <ion-icon name="logo-whatsapp"></ion-icon>
                        <ion-icon name="logo-pinterest"></ion-icon>
                        <ion-icon name="mail-outline"></ion-icon>
                    </div>
                </div>


            </div>
            <div className="footer-down">
                <div className="footer-policy">
                    <h3 className="text-[20px]">CHÍNH SÁCH VÀ ĐIỀU KHOẢN</h3>
                    <ul>
                        <li><a href="/">Chính sách bảo mật</a></li>
                        <li><a href="/"> Chính sách thanh toán</a></li>
                        <li><a href="/">Điều khoản sử dụng</a></li>
                    </ul>
                    
                    
                    
                </div>
                <div className="footer-suport">
                    <a href="tel:0123456894" className="flex items-center">
                        <i className="mr-2.5">
                            <ion-icon name="call-outline"></ion-icon>
                        </i>
                        
                        <h5>0123456894</h5>
                    </a>
                    <div className="flex items-center">
                        <i className="mr-2.5">
                            <ion-icon name="mail-outline"></ion-icon>
                        </i>
                        
                        <h5>healthcare@gmail.com</h5>
                    </div>
                </div>
                <div className="footer-logo-other"></div>
            </div>
        </div>
    )
}
export default Footer