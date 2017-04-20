import React from 'react';

class NameCard extends React.Component {
	constructor(props) {
		super(props);
		this.updateClick = () => {this._updateClick();};
		this.state = {
			present: this.props.present,
		};
	}

	render() {
		const pStylePresent = {
			color: 'green',
		}
		const pStyleAbsent = {
			color: 'red',
		}

		if (this.state.present){
			return <p style={pStylePresent} onClick={this.updateClick}>{this.props.name}</p>;
		} else {
			return <p style={pStyleAbsent} onClick={this.updateClick}>{this.props.name}</p>;
		}
	}

	_updateClick() {
		this.setState({
			present: !this.state.present,
		});
		// not sure why I needed the !this.state.present here?
		this.props.clickedHandler(this.props.name, this.props.id, !this.state.present);
	}
}

export default NameCard;
