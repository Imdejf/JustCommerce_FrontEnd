import { Story, Meta } from '@storybook/react';

import BasicBox from './BasicBox';

import { IBasicBoxProps } from '../boxTypes';
import { STATUS } from '../boxConstants';

import SpotifyIco from '../../../../assets/icons/spotify.svg';
import PlayIco from '../../../../assets/icons/play.svg';

export default {
  title: 'Boxs/Box',
  component: BasicBox,
  args: {
    icon: SpotifyIco,
    title: 'Test',
    status: STATUS.ACCEPTED,
    type: 'Dystrybucja cyfrowa',
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: {
        type: 'radio',
      },
      options: ['Spotify', 'Play'],
      mapping: {
        Spotify: SpotifyIco,
        Play: PlayIco,
      },
    },
    status: {
      name: 'Status',
      control: {
        type: 'radio',
      },
      options: ['Accepted', 'Rejected'],
      mapping: {
        Accepted: STATUS.ACCEPTED,
        Rejected: STATUS.REJECTED,
      },
    },
  },
} as Meta;

const Template: Story<IBasicBoxProps> = (args) => <BasicBox {...args} />;

export const Basic = Template.bind({});

export const Subtitle = Template.bind({});
Subtitle.args = {
  subTitle: 'Sub Title',
};
