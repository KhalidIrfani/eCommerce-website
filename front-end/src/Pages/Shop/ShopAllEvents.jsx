import React from 'react'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/layout/DashboardSideBar'
import AllEvents from '../../components/Shop/AllEvents'

const ShopAllEvents = () => {
    return (
        <>
            <div>
                <DashboardHeader />
                <div className="flex   justify-between w-full">
                    <div className="w-[330px]">
                        <DashboardSideBar active={5} />
                    </div>
                    <div className="w-full justify-center flex">
                        <AllEvents />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopAllEvents