import React from 'react'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/layout/DashboardSideBar'
import AllCoupens from '../../components/Shop/AllCoupens'

const ShopAllCoupens = () => {
    return (
        <>
            <div>
                <DashboardHeader />
                <div className="flex items-start justify-between w-full">
                    <div className="w-[80px] 800px:w-[330px]">
                        <DashboardSideBar active={9} />
                    </div>
                    <AllCoupens />
                </div>
            </div>
        </>
    )
}

export default ShopAllCoupens