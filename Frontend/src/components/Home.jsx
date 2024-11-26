import React from 'react'
import Products from './Products'

const Home = () => {
  return (
    <div>
      home
      <header>
            <div className='navabr-container'>
                <div className='brand'>
                    E-commerce Site
                </div>
                <div className='navbar-links'>
                    <ul>
                        <li><a href='/products'>Home</a></li>
                        <li><a href='/cart'>CART</a></li>
                        <li><a href='/logout'>LOGOUT</a></li>
                    </ul>
                </div>
            </div>
        </header>
        <body>
          <main>
            <section>
              <Products/>
            </section>
          </main>
        </body>
    </div>
  )
}

export default Home
