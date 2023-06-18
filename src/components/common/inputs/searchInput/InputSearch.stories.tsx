import { Story, Meta } from '@storybook/react';

import InputSearch from './InputSearch';
import { IInputProps } from '../inputTypes';

export default {
  title: 'Inputs/InputSearch',
  component: InputSearch,
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
} as Meta;

const Template: Story<IInputProps> = (args) => <InputSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Wyszukaj artystę...',
  onChange(props) {
    console.log(props);
  },
};
