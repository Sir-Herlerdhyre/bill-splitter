import { useState } from "react";

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
const App = () => {
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Ibrahim",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];
  const [friends, setFriends] = useState(initialFriends);
  const [AddFriend, setAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend() {
    setAddFriend((show) => !show);
  }
  function handleAddNewFriend(newFriend) {
    setFriends((prev) => [...prev, newFriend]);
    setAddFriend(false);
  }
  function handleDelete(id) {
    setFriends((friends) => friends.filter((friend) => friend.id !== id));
  }
  function handleSelection(friend) {
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));
    setAddFriend(false);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <Friendslist
          friends={friends}
          onDelete={handleDelete}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {AddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}
        <Button onClick={handleAddFriend}>
          {AddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
};

const Friendslist = ({ friends, onDelete, onSelection, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          pals={friend}
          key={friend.id}
          onDelete={onDelete}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

const Friends = ({ pals, onDelete, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === pals.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={pals.image} alt={pals.name} />
      <h3>{pals.name}</h3>

      {pals.balance < 0 && (
        <p className="red">
          You owe {pals.name} ${Math.abs(pals.balance)}
        </p>
      )}
      {pals.balance > 0 && (
        <p className="green">
          {pals.name} owes you ${Math.abs(pals.balance)}
        </p>
      )}
      {pals.balance === 0 && <p>You are even with {pals.name} </p>}
      <Button onClick={() => onSelection(pals)}>
        {isSelected ? "Close" : "Select"}
      </Button>
      <Button onClick={() => onDelete(pals.id)}>❌ Remove</Button>
    </li>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯‍♂️Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌸Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>

      <label> 💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label> 👯‍♂️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label> 👯‍♂️{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label> 🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name} </option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

export default App;
