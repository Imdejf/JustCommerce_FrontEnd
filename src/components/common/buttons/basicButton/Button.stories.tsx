import { Story, Meta } from '@storybook/react';

import Button from './Button';
import { ButtonVariantArgType, IButtonProps } from '../buttonTypes';

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    variant: ButtonVariantArgType,
  },
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
};
