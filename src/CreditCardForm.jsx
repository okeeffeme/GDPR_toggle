
import React from 'react';

import PropTypes from 'prop-types';

import './CreditCardForm.css';

const isValidCardNumber = (number) => /^\d{4}\s*\d{4}\s*\d{4}\s*\d{4}$/.test(number);

const isValidExpMonth = (number) => /^\d{1,2}$/.test(number);

const isValidExpYear = (number) => /^\d{4}$/.test(number);

const isValidCVC = (number) => /^\d{3}$/.test(number);

const isValidCardHolderName = (number) => /^\w+\s+\w+$/.test(number);

const isValidCard = (card) =>
	isValidCardNumber(card.cardNumber) &&
	isValidExpMonth(card.expMonth) &&
	isValidExpYear(card.expYear) &&
	isValidCVC(card.cvc) &&
	isValidCardHolderName(card.cardHolderName);

class StatelessTextInput extends React.Component {
	render() {
		const props = this.props;

		const {
			label,
			inputValue,
			disabled,
			valid,
			onChange,
		} = props;

		const changeWrapper = (event) => onChange(event.target.value);

		const inputClasses = valid ?
			'credit-card-form__input credit-card-form__input--valid' :
			'credit-card-form__input';

		const labelClasses = valid ?
			'credit-card-form__input-label credit-card-form__input-label--valid' :
			'credit-card-form__input-label';


		return (
			<div className="credit-card-form__input-container">
				<input
					className={inputClasses}
					type="text"
					value={inputValue}
					disabled={disabled}
					onChange={changeWrapper}
					/>
				<label className={labelClasses}>{label}</label>
			</div>
		);
	}
}

StatelessTextInput.propTypes = {
	label: PropTypes.string,
	inputValue: PropTypes.string,
	disabled: PropTypes.bool,
	valid: PropTypes.bool,
	onChange: PropTypes.func,
};

StatelessTextInput.defaultProps = {
	label: '',
	inputValue: '',
	onChange: (...args) => {
		console.log('StatelessTextInput.defaultProps.onChange ', args);
	},
};


class StatelessCreditCardForm extends React.Component {
	constructor(props) {
		super(props);

		this.onCardNumberChange = this.onCardNumberChange.bind(this);
		this.onExpMonthChange = this.onExpMonthChange.bind(this);
		this.onExpYearChange = this.onExpYearChange.bind(this);
		this.onCVCChange = this.onCVCChange.bind(this);
		this.onCardHolderNameChange = this.onCardHolderNameChange.bind(this);
	}

	onCardNumberChange(newCardNumber) {
		const { inputValue, onChange } = this.props;

		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;

		const newInputValue = {
			cardNumber: newCardNumber,
			expMonth,
			expYear,
			cvc,
			cardHolderName,
		};

		onChange(newInputValue);
	}

	onExpMonthChange(newExpMonth) {
		const { inputValue, onChange } = this.props;

		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;

		const newInputValue = {
			cardNumber,
			expMonth: newExpMonth,
			expYear,
			cvc,
			cardHolderName,
		};

		onChange(newInputValue);
	}

	onExpYearChange(newExpYear) {
		const { inputValue, onChange } = this.props;

		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;

		const newInputValue = {
			cardNumber,
			expMonth,
			expYear: newExpYear,
			cvc,
			cardHolderName,
		};

		onChange(newInputValue);
	}

	onCVCChange(newCVC) {
		const { inputValue, onChange } = this.props;

		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;

		const newInputValue = {
			cardNumber,
			expMonth,
			expYear,
			cvc: newCVC,
			cardHolderName,
		};

		onChange(newInputValue);
	}

	onCardHolderNameChange(newCardHolderName) {
		const { inputValue, onChange } = this.props;

		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;

		const newInputValue = {
			cardNumber,
			expMonth,
			expYear,
			cvc,
			cardHolderName: newCardHolderName,
		};

		onChange(newInputValue);
	}

	render() {
		const { inputValue, disabled } = this.props;

		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;

		const { onCardNumberChange, onExpMonthChange, onExpYearChange, onCVCChange, onCardHolderNameChange } = this;

		const classNames = isValidCard(inputValue) ?
			'credit-card-form credit-card-form--valid' :
			'credit-card-form';

		return (
			<div className={classNames}>
				<StatelessTextInput
					label="Card Number"
					disabled={disabled}
					inputValue={cardNumber}
					valid={isValidCardNumber(cardNumber)}
					onChange={onCardNumberChange}
					/>
				<StatelessTextInput
					label="Exp. Month"
					disabled={disabled}
					inputValue={expMonth}
					valid={isValidExpMonth(expMonth)}
					onChange={onExpMonthChange}
					/>
				<StatelessTextInput
					label="Exp. Year"
					disabled={disabled}
					inputValue={expYear}
					valid={isValidExpYear(expYear)}
					onChange={onExpYearChange}
					/>
				<StatelessTextInput
					label="CVC"
					disabled={disabled}
					inputValue={cvc}
					valid={isValidCVC(cvc)}
					onChange={onCVCChange}
					/>
				<StatelessTextInput
					label="Cardholder"
					disabled={disabled}
					inputValue={cardHolderName}
					valid={isValidCardHolderName(cardHolderName)}
					onChange={onCardHolderNameChange}
					/>
			</div>
		);
	}
}

StatelessCreditCardForm.propTypes = {
	inputValue: PropTypes.shape({
		cardNumber: PropTypes.string,
		expMonth: PropTypes.string,
		expYear: PropTypes.string,
		cvc: PropTypes.string,
		cardHolderName: PropTypes.string,
	}),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

StatelessCreditCardForm.defaultProps = {
	inputValue: {},
	disabled: false,
	onChange: (...args) => {
		console.log('StatelessCreditCardForm.defaultProps.onChange ', args);
	},
};

class StatefulCreditCardForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: props.defaultInputValue,
		};

		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(newInputValue) {
		this.setState({ inputValue: newInputValue });
	}

	render() {
		const { inputValue } = this.state;
		const { disabled } = this.props;
		const { onInputChange } = this;


		return (
			<StatelessCreditCardForm
				inputValue={inputValue}
				disabled={disabled}
				onChange={onInputChange}
				/>
		);
	}

}

StatefulCreditCardForm.propTypes = {
	defaultInputValue: PropTypes.shape({
		cardNumber: PropTypes.string,
		expMonth: PropTypes.string,
		expYear: PropTypes.string,
		cvc: PropTypes.string,
		cardHolderName: PropTypes.string,
	}),
	disabled: PropTypes.bool,
};


export { StatelessCreditCardForm, StatefulCreditCardForm } ;
