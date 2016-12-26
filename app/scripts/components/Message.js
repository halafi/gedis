import React from "react"

class Message extends React.Component {
	render() {
		const { value, userName, time } = this.props
		const isCommand = userName === "command"

		return (
			<div>
				<small className={isCommand ? "_light" : ""}>
					{isCommand &&
					<span>
						<span className="_strong"> Only visible to you</span>&nbsp;&nbsp;<span className="_veryLight _small">{time}</span><br/>
						{value}
					</span>
					}
					{!isCommand &&
					<span>
						<span className="_strong">{userName}</span>&nbsp;&nbsp;<span className="_veryLight _small">{time}</span><br/>
						<span className="_lighter">{value}</span>
					</span>
					}
				</small>
			</div>
		)
	}
}

Message.propTypes = {
	value: React.PropTypes.string.isRequired,
	userName: React.PropTypes.string.isRequired,
	time: React.PropTypes.string.isRequired,
}

export default Message
