import { useEffect, useState } from "react";
import { getUsersList } from "../../services/userService";
import { Link, useSearchParams } from "react-router-dom";
import { Role } from "../../types";
import { useUserContext } from "../../hooks/useUser";

import "./index.css";

export type TUser = {
  id: string;
  email?: string;
  username: string;
  coins: number;
  createdAt: string;
  role?: Role;
};

export const BrowseUsers = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { user } = useUserContext();

  useEffect(() => {
    const loadUsers = async (params: Record<string, any>) => {
      const res = await getUsersList(params);
      setUsers(res.data);
      setNextPage(res.next);
      setPreviousPage(res.prev);
    };
    loadUsers({
      limit: 20,
      page: parseInt(searchParams.get("page") || "1"),
    });
  }, [searchParams]);

  return (
    <div>
      <div id="BrowseUsers__container">
        <table id="BrowseUsers__table">
          <tbody>
            <tr>
              {user?.role === Role.ADMIN && <th>Email</th>}
              <th>Username</th>
              <th>Coins</th>
              {user?.role === Role.ADMIN && <th>Role</th>}
              <th>Joined</th>
            </tr>
            {users.map((_user) => (
              <tr key={_user.id}>
                {user?.role === Role.ADMIN && <td>{_user.email}</td>}
                <td>
                  <Link
                    to={`/profile/${_user.id !== user?.id ? _user.id : ""}`}
                    className="BrowseUsers__profile_link"
                  >
                    {_user.username}
                  </Link>
                </td>
                <td>{_user.coins}</td>
                {user?.role === Role.ADMIN && <td>{_user.role}</td>}
                <td>{new Date(_user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="BrowseUsers__control">
        {previousPage && (
          <button
            className="App__Button"
            onClick={() => {
              searchParams.set("page", previousPage.toString());
              setSearchParams(searchParams);
            }}
          >
            Previous
          </button>
        )}
        {nextPage && (
          <button
            className="App__Button"
            onClick={() => {
              searchParams.set("page", nextPage.toString());
              setSearchParams(searchParams);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BrowseUsers;
