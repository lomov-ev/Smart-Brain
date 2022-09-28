import React from "react";
import "./Register.css";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerEmail: "",
			registerPassword: "",
			registerName: ""
		};
	}
	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}
	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
	}
	onSubmitRegistration = () => {
		fetch("https://smart-brain-boh.herokuapp.com/register", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				name: this.state.registerName
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				}
			});
	}
	handleKeyPress = (event) => {
	  if(event.key === "Enter"){
	    this.onSubmitRegistration();
	  }
	}
	render() {
		return(
			<article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onKeyPress={this.handleKeyPress} onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onSubmitRegistration}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      	type="submit"
				      	value="Register"
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <a onClick={() => this.onRouteChange("signin")} 
				         href="#0" className="f6 link dim black db">Sign in</a>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;