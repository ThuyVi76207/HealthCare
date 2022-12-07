import "./ContactContent.scss"
import { MdOutlineEmail } from "react-icons/md"
import { RiMessengerLine, RiInstagramLine } from "react-icons/ri"
import emailjs from "emailjs-com"
import { FormattedMessage } from 'react-intl';
import React, { useRef } from "react";
import MaiLayout from "../../layouts/MaiLayout";

const ContactContent = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_crukp6f', 'template_l84034d', form.current, 'GegWcpmW-kLxG95PL')

        e.target.reset()
    };
    return (
        <MaiLayout >
            <section id="contact" className="bg-contact">
                <div className="bg-contact-body">
                    {/* <div className="contact-title">Contact Information</div> */}
                    <div className="container contact_container">
                        <div className="contact_options">
                            <h2>HEALTH <br />CARE</h2>
                            <div className="">
                                <i className="contact_option">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                </i>
                                <i className="contact_option">
                                    <ion-icon name="logo-twitter"></ion-icon>
                                </i>
                                <i className="contact_option">
                                    <ion-icon name="logo-instagram"></ion-icon>
                                </i>
                            </div>

                        </div>
                        <form ref={form} onSubmit={sendEmail}>
                            <input className="input-info" type="text" name="name" placeholder="Your Full Name" required />
                            <input className="input-info" type="email" name="email" placeholder="Your Email" required />
                            <textarea className="textarea-info" name="message" rows="7" placeholder="Your Message" required></textarea>
                            <button type="submit" className="btn bg-orange-500">Send Message</button>
                        </form>
                    </div>
                </div>

            </section>
        </MaiLayout>


    )
}

export default ContactContent