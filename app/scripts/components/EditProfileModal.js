import React from "react"
import FileUploader from "react-firebase-file-uploader"
import firebase from "firebase"
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	Alert,
	FormGroup,
	FormText,
	Progress,
} from "reactstrap"
import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback,
} from "availity-reactstrap-validation"

import * as UserActions from "../actions/UserActions"

class EditProfileModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			displayName: this.props.user.displayName,
			email: this.props.user.email,
			password: "",
			error: null,
			avatar: "",
			isUploading: false,
			progress: 0,
			avatarURL: this.props.user.photoURL,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleValidSubmit = this.handleValidSubmit.bind(this)
		this.editUser = this.editUser.bind(this)
		this.handleUploadStart = this.handleUploadStart.bind(this)
		this.handleUploadError = this.handleUploadError.bind(this)
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
		this.handleProgress = this.handleProgress.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.open && !this.props.open) {
			this.setState({
				displayName: this.props.user.displayName,
				email: this.props.user.email,
				password: "",
				error: null,
				avatar: "",
				isUploading: false,
				progress: 0,
				avatarURL: this.props.user.photoURL,
			})
		}
	}

	handleChange(field, value) {
		this.setState({ [field]: value })
	}

	handleValidSubmit() {
		this.editUser()
	}

	handleUploadStart() {
		this.setState({ isUploading: true, progress: 0 })
	}

	handleProgress(progress) {
		this.setState({ progress })
	}

	handleUploadError(error) {
		this.setState({
			isUploading: false,
			error,
		})
	}

	handleUploadSuccess(filename) {
		this.setState({
			avatar: filename,
			progress: 100,
			isUploading: false,
		})
		firebase.storage().ref("images").child(filename).getDownloadURL()
			.then(url => this.setState({ avatarURL: url }))
	}

	editUser() {
		const { avatarURL, password, displayName } = this.state
		const { toggle, onlineUsers, dispatch } = this.props

		let hasErrors = false
		this.setState({ error: null })

		const user = firebase.auth().currentUser
		const credential = firebase.auth.EmailAuthProvider.credential(user.email, password)

		const changesMade = this.props.user.displayName !== displayName || this.props.user.photoURL !== avatarURL

		if (changesMade) {
			user.reauthenticate(credential).then(() => {
				onlineUsers.leave()
				user.updateProfile({
					displayName,
					photoURL: avatarURL,
				}).then(() => {
					// onlineUsers.leave()
					onlineUsers.join(user.uid, user.displayName)
					dispatch(UserActions.loginUser(user))
					if (!hasErrors) {
						firebase.database().ref().child("users").child(user.uid)
							.set({
								displayName: user.displayName,
								email: user.email,
								photoURL: user.photoURL,
							})
						toggle()
					}
				}, (error) => {
					hasErrors = true
					this.setState({ error })
				})
			}, (error) => {
				hasErrors = true
				this.setState({ error })
				// An error happened.
			})
		} else {
			console.log("no changes")
			toggle()
		}
	}

	render() {
		const { toggle, open } = this.props
		const { email, password, displayName, error, avatarURL } = this.state

		const changesMade = this.props.user.displayName !== displayName || this.props.user.photoURL !== avatarURL

		return (
			<Modal size="md" isOpen={open} toggle={toggle}>
				<ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
				<AvForm onValidSubmit={this.handleValidSubmit}>
					<ModalBody>
						{error &&
							<Alert color="danger">
								<strong>Error!</strong> {error.message}
							</Alert>
						}
						<AvGroup>
							<Label for="displayName">Display Name</Label>
							<AvInput
								id="displayName" type="text" name="displayName" placeholder="Name"
								value={displayName}
								onChange={(e) => { this.handleChange("displayName", e) }}
								validate={{ minLength: { value: 4 }, required: true }}
							/>
							<AvFeedback>Display name is too short</AvFeedback>
						</AvGroup>
						<AvGroup>
							<Label for="userEmail">Email</Label>
							<AvInput
								id="userEmail" type="email" name="email" placeholder="Email"
								value={email}
								onChange={(e) => { this.handleChange("email", e) }}
								validate={{ email: true, required: true }}
								disabled
							/>
							<AvFeedback>Invalid email</AvFeedback>
						</AvGroup>
						<FormGroup>
							<Label for="avatar">Profile picture</Label>
							<br/>
							<FileUploader
								accept="image/*"
								name="avatar"
								randomizeFilename
								storageRef={firebase.storage().ref("images")}
								onUploadStart={this.handleUploadStart}
								onUploadError={this.handleUploadError}
								onUploadSuccess={this.handleUploadSuccess}
								onProgress={this.handleProgress}
							/>
							<FormText color="muted">
								Select and upload your picture of choice.
							</FormText>
							{this.state.isUploading &&
								<Progress value={this.state.progress} />
							}
							{this.state.avatarURL &&
								<img className="userAvatar" src={this.state.avatarURL} />
							}
						</FormGroup>
						{changesMade &&
							<AvGroup>
								<Label for="userPassword">Confirm your password</Label>
								<AvInput
									id="userPassword" type="password" name="password" placeholder="Password"
									value={password}
									onChange={(e) => {
										this.handleChange("password", e)
									}}
									validate={{ minLength: { value: 6 }, required: true }}
								/>
								<AvFeedback>Password is too short</AvFeedback>
							</AvGroup>
						}
					</ModalBody>
					<ModalFooter>
						<Button type="submit" color="primary">Save</Button>
						{" "}
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</AvForm>
			</Modal>
		)
	}
}

EditProfileModal.propTypes = {
	user: React.PropTypes.object,
	open: React.PropTypes.bool.isRequired,
	toggle: React.PropTypes.func.isRequired,
	onlineUsers: React.PropTypes.object,
	dispatch: React.PropTypes.func,
}

export default EditProfileModal
