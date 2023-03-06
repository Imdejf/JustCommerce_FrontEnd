import withFormik from 'storybook-formik';
import { Story, Meta } from '@storybook/react';
import { FormikValues } from 'formik';

import Select from './Select';

import { ISelectProps } from '../inputTypes';

export default {
  title: 'Inputs/Select',
  component: Select,
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        input: '',
      },
      onSubmit: (v: FormikValues) => console.log('I want to log these... ', v),
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
} as Meta;

const Template: Story<ISelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Status wydania',
  name: 'status',
  placeholder: 'Wybierz',
  items: [
    { label: 'Jeden', value: '1' },
    { label: 'Dwa', value: '2' },
    { label: 'Trzy', value: '3' },
    { label: 'Cztery', value: '4' },
    { label: 'Pięć', value: '5' },
    { label: 'Sześć', value: '6' },
    { label: 'Siedem', value: '7' },
    { label: 'Osiem', value: '8' },
    { label: 'Dziewięć', value: '9' },
    { label: 'Dziesięć', value: '10' },
    { label: 'Jedenaście', value: '11' },
    { label: 'Dwanaście', value: '12' },
  ],
  onChange(props) {
    console.log(props);
  },
};
