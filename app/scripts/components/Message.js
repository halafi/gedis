import React from "react"
import { } from "reactstrap"

const Message = ({ value, userName, time }) => {
	return (
		<div>
			<small>
				{(userName !== "" && time !== "") &&
					<span><strong>{userName}</strong> {time}<br/></span>
				}
				{value}
			</small>
		</div>
	)
}

Message.propTypes = {
	value: React.PropTypes.string.isRequired,
	userName: React.PropTypes.string.isRequired,
	time: React.PropTypes.string.isRequired,
}

export default Message
