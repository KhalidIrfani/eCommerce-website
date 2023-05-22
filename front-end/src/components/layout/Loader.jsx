import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../../Assets/24151-ecommerce-animation.json'

const Loader = () => {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <>
            <div className="w-[200px] h-[200px] "><Lottie
                animationData={defaultOptions.animationData}
            /></div>
        </>
    )
}

export default Loader