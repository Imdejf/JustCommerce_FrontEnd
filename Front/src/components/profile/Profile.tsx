import { Link } from 'react-router-dom';

import BookmarkButton from '../common/buttons/bookmarkButton/BookmarkButton';
import { Directions } from '../common/buttons/buttonTypes';

const Profile: React.FC = () => {
  return (
    <>
      <div className='hidden md:flex justify-end items-center gap-8 absolute right-4'>
        <h4 className='opacity-50 text-lg mt-4'>Zarządzanie kontem użytkownika</h4>

        <Link to='/profile/changePassword'>
          <BookmarkButton className='px-24 py-12' direction={Directions.Up}>
            Zmień hasło
          </BookmarkButton>
        </Link>
      </div>
    </>
  );
};

export default Profile;
