import withFormik from 'storybook-formik';
import { Story, Meta } from '@storybook/react';
import { FormikValues } from 'formik';

import Switch from './Switch';

import { IInputProps } from '../inputTypes';

export default {
  title: 'Inputs/Switch',
  component: Switch,
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        Switch: true,
      },
      onSubmit: (v: FormikValues) => console.log('I want to log these... ', v),
    },
  },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'enum' },
  },
} as Meta;

const Template: Story<IInputProps> = (args) => (
  <div className='flex'>
    <Switch {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: 'Switch',
};
