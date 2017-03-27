import React, { PropTypes } from 'react';

const QuoteSettingBtn = props => {
		return(
				<li><i className="fa fa-lg fa-pencil" onClick={props.isClicked}></i></li>
		);
	}

QuoteSettingBtn.propTypes = {
	isClicked: React.PropTypes.func
};

export default QuoteSettingBtn;