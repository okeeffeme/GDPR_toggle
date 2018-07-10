import { configure } from '@storybook/react';

const components = require.context("../src/", true, /stories\.jsx$/);

const load = () => {
  components.keys().forEach(components);
};

configure(load, module);
