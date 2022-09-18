import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const Spinner = ({cz = '50px', dz = 'blue', color}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: `${cz}` }} spin />
    return (
        <Spin indicator={antIcon} size="large" style={{color: color ? color : "var(--humber-primary)", paddingRight: '10px'}} />
    )
}

export default Spinner
