import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { useRef, useEffect } from "react";

export default function Paypal() {
    const paypal = useRef();

    // useEffect(() => {
    //     window.paypal.Buttons({
    //         createOrder: (data, actions, err) => {
    //             return actions.order.create({
    //                 intent: "CAPTURE",
    //                 purchase_units: [
    //                     {
    //                         description: "cool looking table",
    //                         amount: {
    //                             currency_code: "USD",
    //                             value: "20"
    //                         }
    //                     }
    //                 ]
    //             })
    //         },
    //         onApprove: async (data, actions) => {
    //             const order = await actions.order.capture();
    //             console.log("Check order: ", order);
    //         },
    //         onError: (err) => {
    //             console.log("Check error: ", err);
    //         },

    //     }).render(paypal.current)
    // }, [])

    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: '20.00',
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        console.log(orderId) // cái ID này là mã giao dịch trên paypal trả về để em lưu sau này check với bên nó thì tới đây em xử lý tạo
                        // đơn trên hệ thống mình kèm với ID này hiểu ý khum dạ em hiểu roogi __ thì em sửa lại component cộn với style lại chỗ payapal là oke nghen. Dạ cảm ơn anh nhiều nha
                        // Your code here after create the order
                        return orderId;
                    });
            }}
        // onApprove={(data, actions) => {
        //     return actions.order.capture().then((details) => {
        //         const name = details.payer.name.given_name;
        //         alert(`Transaction completed by ${name}`);
        //     });
        // }}
        />
    )
}