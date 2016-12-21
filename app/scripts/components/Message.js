import React from "react"

const Message = ({ value, userName }) => {
	return (
		<div>
			<small>{userName}: {value}</small>
		</div>
	)
}

Message.propTypes = {
	value: React.PropTypes.string.isRequired,
	userName: React.PropTypes.string.isRequired,
}

export default Message
