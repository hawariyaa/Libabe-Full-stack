import React from 'react'
import Hero from '../components/hero'
import Popular from '../components/Popular'
import Offers from '../components/Offers'
import NewCollections from '../components/NewCollections'
import NewsLetter from '../components/NewLetter'

function Shop() {
  return (
    <div>
        <Hero />
         <Popular />
         <Offers />
         <NewCollections />
         <NewsLetter />
    </div>
  )
}

export default Shop