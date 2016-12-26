import React from "react"
import Linkify from "react-linkify"

// cant use functional class for ref to work
class Message extends React.Component {
	render() {
		const { value, userName, time } = this.props
		const isCommand = userName === "command"

		return (
			<div className="message">
				<div className={isCommand ? "_light message-content" : "message-content"}>
					{isCommand &&
						<span>
							<span className="_strong">Only visible to you</span>
							&nbsp;&nbsp;
							<span className="_veryLight _small">{time}</span>
							<br/>
							{value}
						</span>
					}
					{!isCommand &&
						<span>
							<span className="_strong">{userName}</span>&nbsp;&nbsp;<span className="_veryLight _small">{time}</span><br/>
							<span className="_lighter">
								{value.split("\n").map((line, i) => (
									<span key={i}>
										<Linkify properties={{ target: "_blank" }}>{line}</Linkify><br/>
									</span>
								))}
							</span>
						</span>
					}
				</div>
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
