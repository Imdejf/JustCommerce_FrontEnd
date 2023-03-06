import ReactInputMask from 'react-input-mask';

import Input from '../Input';

import { IMaskedInputProps } from '../inputTypes';

const MaskedInput: React.FC<IMaskedInputProps> = ({ mask, ...props }) => {
  return <Input {...props} render={(inputProps) => <ReactInputMask {...inputProps} mask={mask} />} />;
};

export default MaskedInput;
