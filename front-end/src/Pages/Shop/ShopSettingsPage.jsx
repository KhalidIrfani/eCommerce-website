import React from 'react'
import DashboardHeader from '../../components/Shop/layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/layout/DashboardSideBar'
import ShopSettings from '../../components/Shop/ShopSettings'

const ShopSettingsPage = () => {
    return (
        <>
            <div>
                <DashboardHeader />
                <div className="flex items-start justify-between w-full">
                    <div className="w-[80px] 800px:w-[330px]">
                        <DashboardSideBar active={11} />
                    </div>
                    <ShopSettings />
                </div>
            </div>
        </>
    )
}

export default ShopSettingsPage