import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Lottie from 'lottie-react';
import animationData from '../Assets/84125-payment-successfully-in-green-colore.json';

const OrderSuccessPage = () => {
    return (
        <>
            <Header />
            <Success />
            <Footer />
        </>
    );
};

const Success = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className="w-[200px] h-[200px] "><Lottie
                animationData={defaultOptions.animationData}
            /></div>
            <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                Your order is successful 😍
            </h5>
            <br />
            <br />
        </div>
    );
};

export default OrderSuccessPage;
