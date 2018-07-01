import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .add('test', () => (
    <Checkbox
   label="Test Title"
   description="Test description goes here"
   onClick={action('checkbox clicked')}
   />
  ));
