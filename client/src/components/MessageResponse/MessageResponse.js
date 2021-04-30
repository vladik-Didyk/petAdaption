import React from 'react'

import C from './MessageResponse.module.css'

const  MessageResponse = props => {



return <div className={C.message}>
{props.serverRes.message}
</div>

}
export default MessageResponse