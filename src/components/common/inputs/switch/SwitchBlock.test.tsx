import { renderWithFormik } from '../../../../utils/testUtils';
import SwitchBlock, { ISwitchBlockProps } from './SwitchBlock';

const initProps: ISwitchBlockProps = {
  name: 'switchInput',
  label: 'switchLabel',
};

const formikProps = {
  initialValues: {
    [initProps.name]: { checked: false },
  },
};

const renderInput = (props?: Partial<ISwitchBlockProps>) => {
  const utils = renderWithFormik(<SwitchBlock {...initProps} {...props} />, formikProps);
  return { ...utils };
};

describe('Switch component', () => {
  test('should render correctly', () => {
    const { getByText } = renderInput();
    expect(getByText(initProps.label)).toBeInTheDocument();
  });
});
