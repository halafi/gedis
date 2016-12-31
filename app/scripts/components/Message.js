import React from "react"
import Linkify from "react-linkify"
import classnames from "classnames"
import moment from "moment"
import _ from "lodash"

import { Tooltip } from "reactstrap"

// cant use functional class for ref to work
class Message extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tooltipOpen: false,
		}
		this.toggleTooltip = this.toggleTooltip.bind(this)
	}

	toggleTooltip() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen,
		})
	}

	componentWillMount() {
		const id = _.uniqueId("messageTime_")
		this.setState({ uniqId: id })
	}

	render() {
		const { value, userName, time, photoURL } = this.props
		console.log(photoURL)
		const { tooltipOpen, uniqId } = this.state

		const shortDate = moment(time).format("LT")
		const longDate = moment(time).calendar()

		const isCommand = userName === "command"

		const messageContentClasses = classnames(
			"message-content", {
				"_light": isCommand,
			},
		)
		return (
			<div className="message">
				<div className="message-avatar">
					{!isCommand &&
						<img className="userAvatar" src={photoURL || "images/default_avatar.png"}/>
					}
					{isCommand &&
						<img className="userAvatar" src="images/default_blank.png" srcSet="images/default_blank@2x.png 2x"/>
					}
				</div>
				<div className={messageContentClasses}>
					{isCommand &&
						<span>
							<span className="_strong">Only visible to you</span>
							&nbsp;&nbsp;
							<span className="_veryLight _small">{shortDate}</span>
							<br/>
							{value}
						</span>
					}
					{!isCommand &&
						<span>
							<span className="_strong">{userName}</span>
							&nbsp;&nbsp;
							<span id={uniqId} className="_veryLight _small">
								{shortDate}
							</span>
							<br/>
							<span className="_lighter">
								{value.split("\n").map((line, i) => (
									<span key={i}>
										<Linkify properties={{ target: "_blank" }}>{line}</Linkify><br/>
									</span>
								))}
							</span>
							<Tooltip
								className="tooltip-light"
								placement="top"
								isOpen={tooltipOpen}
								target={uniqId}
								toggle={this.toggleTooltip}
								delay={{
									show: 300,
									hide: 0,
								}}
							>
								{longDate}
							</Tooltip>
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
	photoURL: React.PropTypes.string,
}

export default Message
