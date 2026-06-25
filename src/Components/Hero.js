import React from 'react'

function Hero() {
  return (
    <section className="hero">

      <div className="hero-badge">
        ✨ Free & No Signup Required
      </div>

      <h1 className="hero-title">
        Split <span className="highlight">Anything</span> Fairly
      </h1>

      <p className="hero-subtitle">
        Trips, rent, groceries, subscriptions, movies, shopping —
        split every expense the smart way with zero arguments
      </p>

      <div className="hero-tags">
        <span className="tag">🏕️ Trips</span>
        <span className="tag">🛒 Shopping</span>
        <span className="tag">🏠 Rent</span>
        <span className="tag">🎬 Movies</span>
        <span className="tag">📱 Subscriptions</span>
        <span className="tag">🍕 Food</span>
      </div>

    </section>
  )
}

export default Hero