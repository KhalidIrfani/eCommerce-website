import React from 'react'
import Payment from '../components/Payment/Payment.jsx'
import CheckoutSteps from '../components/Checkout/CheckoutSteps.jsx'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'


const PaymentPage = () => {
    return (
        <>
            <div className='w-full min-h-screen bg-[#f6f9fc]'>
                <Header />
                <br />
                <br />
                <CheckoutSteps active={2} />
                <Payment />
                <br />
                <br />
                <Footer />
            </div>
        </>
    )
}

export default PaymentPage
