import React from 'react'
import styles from './style.module.css'

const Button = (props) => {
    const {title, outline, noOutline, icon, dstyles, onClick}  = props
    function onMouseOver(arg) {
        const news = arg ? 'yes': 'no'
    }
    return(
        <button onClick={onClick} style={{...dstyles}} className={ `${styles.button} ${outline ? styles.outline : noOutline ?  styles.noOutline: ''}` }>
            {title}
            {icon && <img onMouseLeave={(outline)=> onMouseOver} className={styles.btnIcon} src={icon} alt={title} />}
        </button>
    )
}

export default Button