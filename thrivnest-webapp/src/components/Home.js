import React from 'react'
import "../CSS/Home.css"
import { Link } from 'react-router-dom'

function Home({ loggedIn }) {
    const isLogin1 = loggedIn ? '/properties' : '/login'
    const isLogin2 = loggedIn ? '/postproperty' : '/login'
    return (
        <main className='home' id='home'>
            <section className="home-section">
                <h1 className='title'>ThrivNest</h1>
                <h2>Effortless searching, stress-free booking, and comfortable stays. 
                        Find your perfect home rental with ease, and experience the joy of living.</h2>
                <div className='prop-btns'>
                    <Link to={isLogin1}><button className='prop-btn'>Rent Property</button></Link>
                    <Link to={isLogin2}><button className='prop-btn'>Post Property</button></Link>
                </div>
            </section>
            <img src='./image/property.png' alt='Property.png' className='property-img'></img>
        </main>
    )
}

export default Home