import React, { useContext } from "react";
import { useState } from "react";
import GithubContext from "../../context/GithubContext";
function UserSearch() {
  const [text, setText] = useState("");
  const { users, clearUsers, searchUsers } = useContext(GithubContext);
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alert("please enter username!");
    } else {
      searchUsers(text);
    }
  };
  const handleClear = () => {
    clearUsers();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 mb-12 md:mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleChange}
                className="w-2/3 md:w-full pr-5 rounded-r-none !outline-none bg-gray-200 input input-lg text-black"
              ></input>
              <button
                type="submit"
                className="absolute top-0 righ-0 rounded-l-none w-36 btn btn-lg"
              >
                GO!
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div className="text-center ml-10">
          <button onClick={handleClear} className="btn btn-ghost btn-lg">
            CLEAR
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
