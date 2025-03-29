const UserCard = ({ user, onDelete }) => {
    return (
      <div className="border p-4 rounded shadow flex items-center space-x-4">
        <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full" />
        <div>
          <p>{user.first_name} {user.last_name}</p>
          <button onClick={() => onDelete(user.id)} className="text-red-500">Delete</button>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  