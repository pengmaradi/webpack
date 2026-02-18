import { FC } from 'react';

interface UserProps {
  users: {
    id: string;
    firstName: string;
    maidenName: string;
    lastName: string;
    image: string;
  }[];
}

const User: FC<UserProps> = ({ users }) => {
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map(user => (
          <li key={user.id}>
            <h3>{`${user.firstName} ${user.maidenName} ${user.lastName}`}</h3>
            <img 
              src={user.image}
              className="rounded-full w-40 h-40"
              alt={`${user.firstName} ${user.maidenName} ${user.lastName}`} 
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default User;