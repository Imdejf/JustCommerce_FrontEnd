import { render } from '@testing-library/react';

import BasicBox from './BasicBox';

import { STATUS } from '../boxConstants';
import { IBasicBoxProps } from '../boxTypes';

import SpotifyIco from '../../../../assets/icons/spotify.svg';

const renderBox = (props?: IBasicBoxProps) => {
  const utils = render(<BasicBox icon={SpotifyIco} type='test' status={STATUS.ACCEPTED} title='Testing' {...props} />);
  const box = utils.container;
  return { box, ...utils };
};

describe('BasicBox component', () => {
  test('should render correctly', () => {
    const { box } = renderBox();
    expect(box).toBeInTheDocument();
  });

  test('should set proper status', () => {
    const { getByTestId } = renderBox();
    const statusLabel = getByTestId('statusLabel');
    expect(statusLabel).toHaveClass(`text-${STATUS.ACCEPTED.color}`);
    expect(statusLabel).toHaveTextContent(STATUS.ACCEPTED.label);
  });
});
