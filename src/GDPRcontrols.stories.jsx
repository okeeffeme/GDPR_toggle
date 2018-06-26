import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import GDPRcontrols from './GDPRcontrols';

storiesOf('GDPRcontrols', module)
  .add('test', () => (
    <GDPRcontrols />
  ));
