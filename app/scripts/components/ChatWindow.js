import React from "react"
import ReactDOM from "react-dom"
import { Card, CardBlock } from "reactstrap"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

import Message from "./Message"

class ChatWindow extends React.Component {

	shouldComponentUpdate(nextProps) {
		return nextProps.messages !== this.props.messages
	}

	componentDidUpdate(nextProps) {
		const node = ReactDOM.findDOMNode(this[`_msg${nextProps.messages.size - 1}`])
		if (node) {
			node.scrollIntoView() // Scroll as new elements come along
		}
	}

	render() {
		const { messages } = this.props

		return (
			<Card>
				<CardBlock className="responsiveHeight">
					<ReactCSSTransitionGroup
						transitionName="message"
						transitionEnterTimeout={200}
						transitionLeaveTimeout={100}
					>
						{messages.map((item, i) => (
							<Message
								key={i}
								userName={item.user}
								value={item.text}
								time={item.time}
								ref={(ref) => {
									this[`_msg${i}`] = ref
								}}
							/>
						))}
					</ReactCSSTransitionGroup>
				</CardBlock>
			</Card>
		)
	}
}

ChatWindow.propTypes = {
	messages: React.PropTypes.object.isRequired,
}

export default ChatWindow
