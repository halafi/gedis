import React from "react"
import { List } from "immutable"

import { Input, InputGroup, InputGroupButton, Button } from "reactstrap"

// TODO if class not needed make functional
class InputBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: new List([""]),
			index: 0,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleArrowUp = this.handleArrowUp.bind(this)
		this.handleArrowDown = this.handleArrowDown.bind(this)
	}

	handleSubmit(e) {
		if (e) e.preventDefault()
		this.setState({
			messages: this.state.messages.push(this.props.value),
		})
		this.props.onSubmit()
	}

	handleKeyPress(e) {
		switch (e.key) {
		case "Enter":
			this.handleSubmit()
			break
		case "ArrowUp":
			e.preventDefault()
			this.handleArrowUp()
			break
		case "ArrowDown":
			e.preventDefault()
			this.handleArrowDown()
			break
		default:
			break
		}
	}

	handleArrowDown() {
		if (this.state.messages.size > 0) {
			this.setState({
				index: this.state.index + 1 < this.state.messages.size
					? this.state.index + 1
					: 0,
			}, () => this.props.onChange(this.state.messages.get(this.state.index)))
		}
	}

	handleArrowUp() {
		if (this.state.messages.size > 0) {
			this.setState({
				index: this.state.index > 0 ? this.state.index - 1 : this.state.messages.size - 1,
			}, () => this.props.onChange(this.state.messages.get(this.state.index)))
		}
	}

	handleChange(e) {
		this.props.onChange(e.target.value)
	}

	render() {
		return (
			<InputGroup size="md">
				{/*<InputGroupButton>*/}
					{/*<Button disabled>+</Button>*/}
				{/*</InputGroupButton>*/}
				<Input
					placeholder="Message"
					value={this.props.value}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyPress}
				/>
				<InputGroupButton>
					<Button onClick={this.handleSubmit}>Send</Button>
				</InputGroupButton>
			</InputGroup>
		)
	}
}

InputBar.propTypes = {
	value: React.PropTypes.string.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
}

export default InputBar
