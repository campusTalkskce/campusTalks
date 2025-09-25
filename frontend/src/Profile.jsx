import React from 'react'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div>
            <Navigation />
        </div>
        <div>
            <Link to='/home'>
             <button>Add post</button>
            </Link>
           
        </div>
      
    </div>
  )
}
