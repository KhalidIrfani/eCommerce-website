import React from 'react'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/layout/DashboardSideBar'
import DashboardHero from '../../components/Shop/DashboardHero'

const ShopDashboardPage = () => {
    return (
        <>

            <div>
                <DashboardHeader />
                <div className="flex items-start justify-between w-full">
                    <div className="w-[80px] 800px:w-[330px]">
                        <DashboardSideBar active={1} />
                    </div>
                    <DashboardHero />
                </div>
            </div>

        </>
    )
}

export default ShopDashboardPage