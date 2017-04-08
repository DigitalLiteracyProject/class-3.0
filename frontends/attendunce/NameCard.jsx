import React from 'react';

class NameCard extends React.Component {
	constructor(props) {
		super(props);
		this.updateClick = () => {this._updateClick();};
		this.state = {
			clicked: 0,
		};
	}

	render() {
		const pStylePresent = {
			color: 'green',
		}
		const pStyleAbsent = {
			color: 'red',
		}
		const pStyleLate = {
			color: 'olive',
		}
		const status = this.state.clicked

		if (status == 0){
			return <p style={pStylePresent} onClick={this.updateClick}>{this.props.name}</p>;
		} else if (status == 1) {
			return <p style={pStyleAbsent} onClick={this.updateClick}>{this.props.name}</p>;
		} else {
			return <p style={pStyleLate} onClick={this.updateClick}>{this.props.name}</p>;
		}
	}

	_updateClick() {
		this.setState({
			clicked: (this.state.clicked + 1) % 3,
		});
		this.props.clickedHandler(this.props.name);
	}
}

export default NameCard;
