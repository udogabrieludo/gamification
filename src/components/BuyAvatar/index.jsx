import React from 'react'

const BuyAvatar = () => {
    return (
        <div style={{position: 'relative', background: 'blue', width: '100%', textAlign: 'center'}}>
        <div style={{paddingTop: '20px'}} className={styles.title}>Buy Avatars</div>
        <div style={{position: 'absolute', right: '20px', background: 'red', top: '10px'}}>close</div>
        <div style={{padding: '30px', maxHeight: '550px', gap: '30px', boxSizing: 'border-box', width: '100%', background: 'green', display: 'flex'}}>
            <div style={{background: 'white', width: '90%'}} className="avatar-one">
                <h4>icon</h4>
                <h4>name</h4>
                <h4>status</h4>
                <h4>points label</h4>
                <h4>points - 18</h4>
            </div>
            <div style={{background: 'red', width: '90%'}} className="avatar-one">
                <h4>icon</h4>
                <h4>name</h4>
                <h4>status</h4>
                <h4>points label</h4>
                <h4>points - 28</h4>
            </div>
        </div>
            <button>purchase avatar</button>
        </div>
    )
}

export default BuyAvatar
