import React from 'react'
import playout from './playout.module.css'

const index = ({children, title, description}) => {
    return (
        <div className={playout.container}>
            <div style={{textAlign: 'center', color: 'var(--humber-primary)', fontSize: '1.4rem', fontWeight: 'bold', margin: '10px 0 35px 0'}}>{title}</div>
            <p className="my-4" style={{fontSize: '16px',  textAlign: 'center', lineHeight: '2em', color: 'var(--humber-black)'}}>
                {description}
           
            </p>
            <div className={playout.prwrapper}>
              {children}
            </div>
          </div>
    )
}

export default index
