import React from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/Route/Hero/Hero.jsx'
import Categories from '../components/Route/Categories/Categories.jsx'
import BestDeals from '../components/Route/BestDeals/BestDeals.jsx'
import Events from '../components/Events/Events'
import FeaturedProducts from '../components/Route/FeatureProdcts/FeaturedProducts'
import Sponsored from '../components/Route/Sponsored'
import Footer from '../components/layout/Footer'

const HomePage = () => {
    return (
        <>
            <div>
                <Header activeHeading={1} />
                <Hero />
                <Categories />
                <BestDeals />
                <Events />
                <FeaturedProducts />
                <Sponsored />
                <Footer/>
            </div>

        </>
    )
}

export default HomePage