import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { StatelessCreditCardForm, StatefulCreditCardForm } from './CreditCardForm';

storiesOf('StatelessCreditCardForm', module)
  .add('empty', () => (
    <StatelessCreditCardForm
			inputValue={ {} }
   />
  ))
	.add('pre-filled', () => (
    <StatelessCreditCardForm
			inputValue={ {
				cardNumber: '1234 1234 1234 1234',
				cvc: '123',
			} }
   />
  ))
	.add('disabled', () => (
    <StatelessCreditCardForm
			inputValue={ {} }
			disabled={true}
   />
  ));

storiesOf('StatefulCreditCardForm', module)
  .add('empty', () => (
    <StatefulCreditCardForm
			defaultInputValue={ {} }
   />
  ))
	.add('pre-filled', () => (
    <StatefulCreditCardForm
			defaultInputValue={ {
				cardNumber: '1234 1234 1234 1234',
				cvc: '123',
			} }
   />
  ))
	.add('disabled', () => (
    <StatefulCreditCardForm
			defaultInputValue={ {} }
			disabled={true}
   />
  ));
