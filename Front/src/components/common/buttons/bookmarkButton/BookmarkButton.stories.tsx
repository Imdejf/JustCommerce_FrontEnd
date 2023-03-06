import React from 'react';
import { Story, Meta } from '@storybook/react';

import BookmarkButton from './BookmarkButton';

import { Directions, IBookmarkButtonProps } from '../buttonTypes';
import { ButtonVariantArgType } from '../buttonTypes';

export default {
  title: 'Buttons/BookmarkButton',
  component: BookmarkButton,
  argTypes: {
    direction: { control: { type: null } },
    variant: ButtonVariantArgType,
  },
} as Meta;

const Template: Story<IBookmarkButtonProps> = (args) => <BookmarkButton {...args} />;

export const Up = Template.bind({});
Up.args = {
  children: 'BookmarkButton',
  direction: Directions.Up,
};

export const Down = Template.bind({});
Down.args = {
  children: 'BookmarkButton',
  direction: Directions.Down,
};

export const Right = Template.bind({});
Right.args = {
  children: 'BookmarkButton',
  direction: Directions.Right,
};

export const Left = Template.bind({});
Left.args = {
  children: 'BookmarkButton',
  direction: Directions.Left,
};
