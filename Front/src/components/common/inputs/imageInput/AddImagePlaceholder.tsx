import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
}

const AddImagePlaceholder = ({ className = '' }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center h-full w-full 
    bg-white bg-opacity-50 pointer-events-none
      ${className}`}
    >
      <span className='material-icons-outlined opacity-60 text-6xl'>upload_file</span>
      <span className='opacity-80 capitalize-first'>{`${t('common.upload')} ${t('common.photo')}`}</span>
    </div>
  );
};

export default AddImagePlaceholder;
