import React from "react"

import { Input, InputGroup, InputGroupButton, Button } from "reactstrap"

// TODO if class not needed make functional
class InputBar extends React.Component {
	render() {
		return (
			<InputGroup size="md">
				<InputGroupButton>
					<Button disabled>+</Button>
				</InputGroupButton>
				<Input
					placeholder="Message"
					value={this.props.value}
					onChange={this.props.onChange}
					onKeyPress={this.props.onKeyPress}
				/>
				<InputGroupButton>
					<Button onClick={this.props.onSubmit}>Send</Button>
				</InputGroupButton>
			</InputGroup>
		)
	}
}

InputBar.propTypes = {
	value: React.PropTypes.string.isRequired,
	onKeyPress: React.PropTypes.func.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
}

export default InputBar
