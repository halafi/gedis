import React from "react"
import Linkify from "react-linkify"
import ReactEmoji from "react-emoji"
import classnames from "classnames"
import moment from "moment"
import _ from "lodash"
import { Tooltip } from "reactstrap"
import firebase from "firebase"

import * as MessageTypes from "../constants/MessageTypes"

class Message extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tooltipOpen: false,
			displayName: "",
			photoURL: "images/default_avatar.png",
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
		if (this.props.uid !== MessageTypes.COMMAND && this.props.uid !== MessageTypes.WELCOME_BOT) {
			firebase.database().ref("users").child(this.props.uid)
				.once("value", (snap) => {
					this.setState({
						displayName: snap.val().displayName,
						photoURL: snap.val().photoURL,
					})
				})
		}
		this.setState({ uniqId: id })
	}

	render() {
		const { value, time, uid } = this.props
		const { tooltipOpen, uniqId, displayName, photoURL } = this.state

		const shortDate = moment(time).format("LT")
		const longDate = moment(time).calendar()

		const isCommand = uid === MessageTypes.COMMAND
		const isWelcomeBot = uid === MessageTypes.WELCOME_BOT

		const messageContentClasses = classnames(
			"message-content", {
				"_light": isCommand,
			},
		)
		return (
			<div className="message">
				<div className="message-avatar">
					{(!isCommand && !isWelcomeBot) &&
						<img className="userAvatar" src={photoURL || "images/default_avatar.png"}/>
					}
					{(!isCommand && isWelcomeBot) &&
						<img className="userAvatar" src={"images/doge_avatar.png"}/>
					}
				</div>
				<div className={messageContentClasses}>
					{isCommand &&
						<span>
							<span className="_strong">Only visible to you</span>
							&nbsp;&nbsp;
							<span id={uniqId} className="_veryLight _small">{shortDate}</span>
							<br/>
							{value}
						</span>
					}
					{(!isCommand && !isWelcomeBot) &&
						<span>
							<span className="_strong">{displayName}</span>
							&nbsp;&nbsp;
							<span id={uniqId} className="_veryLight _small">
								{shortDate}
							</span>
							<br/>
							<span className="_lighter">
								{value.split("\n").map((line, i) => (
									<span key={i}>
										<Linkify properties={{ target: "_blank" }}>{ReactEmoji.emojify(line)}</Linkify><br/>
									</span>
								))}
							</span>
						</span>
					}
					{(!isCommand && isWelcomeBot) &&
						<span>
							<span className="_strong">Doge bot</span>
							&nbsp;&nbsp;
							<span id={uniqId} className="_veryLight _small">
								{shortDate}
							</span>
							<br/>
							<span className="_lighter">
								{value.split("\n").map((line, i) => (
									<span key={i}>
										<Linkify properties={{ target: "_blank" }}>{ReactEmoji.emojify(line)}</Linkify><br/>
									</span>
								))}
							</span>
						</span>
					}
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
				</div>
			</div>
		)
	}
}

Message.propTypes = {
	uid: React.PropTypes.string.isRequired,
	time: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
}

export default Message
