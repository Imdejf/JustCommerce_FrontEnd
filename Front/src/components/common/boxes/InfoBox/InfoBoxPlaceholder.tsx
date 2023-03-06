import InfoBox from './InfoBox';

interface IInfoBoxPlaceholderProps {
  itemsCount?: number;
}

const InfoBoxPlaceholder: React.FC<IInfoBoxPlaceholderProps> = ({ itemsCount = 6 }) => {
  return (
    <InfoBox>
      <div className='h-52 w-52 flex-shrink-0 flex-grow rounded overflow-hidden order-1 sm:mr-0 md:flex-grow-0'>
        <div className='w-full h-full bg-gray-light bg-opacity-10 animate-pulse'></div>
      </div>
      <InfoBox.Items>
        {[...Array(itemsCount)].map((_, idx) => (
          <InfoBox.InfoItem key={idx} className='bg-gray-light bg-opacity-10 animate-pulse' />
        ))}
      </InfoBox.Items>
    </InfoBox>
  );
};

export default InfoBoxPlaceholder;
