import React from "react"
import ReactDOM from "react-dom"
import { CardBlock } from "reactstrap"

import Message from "./Message"

class ChatWindow extends React.Component {

	shouldComponentUpdate(nextProps) {
		if (nextProps.messages.size !== this.props.messages.size) {
			return true
		}
		return nextProps.messages[nextProps.messages.size - 1] !== this.props.messages[this.props.messages.size - 1]
	}

	componentDidUpdate(nextProps) {
		// Scroll as new elements come along
		const node = ReactDOM.findDOMNode(this[`_msg${nextProps.messages.size - 1}`])
		if (node) {
			node.scrollIntoView()
		}
	}

	render() {
		const { messages } = this.props

		return (
			<CardBlock className="chat">
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
			</CardBlock>
		)
	}
}

ChatWindow.propTypes = {
	messages: React.PropTypes.object.isRequired,
}

export default ChatWindow
