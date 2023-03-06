import * as Yup from 'yup';
import withFormik from 'storybook-formik';
import { FormikValues } from 'formik';
import { Story, Meta } from '@storybook/react';

import TextInput from './TextInput';

import { IInputProps } from '../inputTypes';

const valSchema = Yup.object({
  input: Yup.string().min(3).required(),
});

const meta: Meta = {
  title: 'Inputs/TextInput',
  component: TextInput,
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        input: '',
      },
      validationSchema: valSchema,
      onSubmit: (v: FormikValues) => console.log('I want to log these... ', v),
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: { options: ['text', 'number'], defaultValue: 'text' },
  },
};

export default meta;

const Template: Story<IInputProps> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  name: 'input',
};

export const InValid = Template.bind({});
InValid.parameters = {
  formik: {
    initialErrors: { input: 'Some error' },
    initialTouched: { input: true },
  },
};
InValid.args = {
  ...Default.args,
};
