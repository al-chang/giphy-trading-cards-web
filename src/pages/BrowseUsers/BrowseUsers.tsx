import { useCallback, useEffect, useState } from "react";
import { getUsersList } from "../../services/userService";
import { Link, useSearchParams } from "react-router-dom";
import { Role } from "../../types";
import { useUserContext } from "../../hooks/useUser";

import "./index.css";
import useFilter from "../../hooks/useFilter";

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

  const { filterValues, debouncedFilterValues, handleFilterChange } =
    useFilter<{
      email: string;
      page: string;
      username: string;
      role: Role | "";
    }>({
      email: "",
      page: "",
      username: "",
      role: "",
    });

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
      page: parseInt(debouncedFilterValues.page || "1"),
      email: debouncedFilterValues.email,
      username: debouncedFilterValues.username,
      role: debouncedFilterValues.role,
    });
  }, [debouncedFilterValues]);

  return (
    <div>
      <div id="BrowseUsers__filters">
        {user?.role === Role.ADMIN && (
          <div className="BrowseUsers__filter">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => handleFilterChange("email", e.target.value)}
              value={filterValues.email}
            />
          </div>
        )}
        <div className="BrowseUsers__filter">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => handleFilterChange("username", e.target.value)}
            value={filterValues.username}
          />
        </div>
        {user?.role === Role.ADMIN && (
          <div className="BrowseUsers__filter">
            {" "}
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              onChange={(e) => handleFilterChange("role", e.target.value)}
              value={filterValues.role}
            >
              <option value="">All</option>
              {Object.values(Role).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <table id="BrowseUsers__table">
        <tbody>
          <tr id="BrowseUsers__table_head">
            {user?.role === Role.ADMIN && <th>Email</th>}
            <th>Username</th>
            <th className="BrowseUsers__hide_mobile">Coins</th>
            {user?.role === Role.ADMIN && (
              <th className="BrowseUsers__hide_mobile">Role</th>
            )}
            <th>Joined</th>
          </tr>
          {users.map((_user) => (
            <tr key={_user.id}>
              {user?.role === Role.ADMIN && (
                <td className="BrowseUsers__table_element">{_user.email}</td>
              )}
              <td className="BrowseUsers__table_element">
                <Link
                  to={`/profile/${_user.id !== user?.id ? _user.id : ""}`}
                  className="BrowseUsers__profile_link"
                >
                  {_user.username}
                </Link>
              </td>
              <td className="BrowseUsers__table_element BrowseUsers__hide_mobile">
                {_user.coins}
              </td>
              {user?.role === Role.ADMIN && (
                <td className="BrowseUsers__table_element BrowseUsers__hide_mobile">
                  {_user.role}
                </td>
              )}
              <td className="BrowseUsers__table_element">
                {new Date(_user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="BrowseUsers__control">
        {previousPage && (
          <button
            className="App__Button"
            onClick={() => handleFilterChange("page", previousPage.toString())}
          >
            Previous
          </button>
        )}
        {nextPage && (
          <button
            className="App__Button"
            onClick={() => handleFilterChange("page", nextPage.toString())}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BrowseUsers;
