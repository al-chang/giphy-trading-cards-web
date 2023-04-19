import { useEffect, useState } from "react";
import { getUsersList } from "../../services/userService";
import { Link, useSearchParams } from "react-router-dom";
import { Role } from "../../types";
import { useUserContext } from "../../hooks/useUser";

import "./index.css";
import { debounce } from "../../utils";

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
  const [filterValues, setFilterValues] = useState<{
    email: string;
    username: string;
    role: Role | "";
  }>({
    email: searchParams.get("email") || "",
    username: searchParams.get("username") || "",
    role: (searchParams.get("role") as Role) || "",
  });

  const debounceSetSearchParams = debounce(
    () => setSearchParams(searchParams),
    500
  );

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
      email: searchParams.get("email"),
      username: searchParams.get("username"),
      role: searchParams.get("role"),
    });
  }, [searchParams]);

  useEffect(() => {
    !!filterValues.email
      ? searchParams.set("email", filterValues.email)
      : searchParams.delete("email");
    !!filterValues.username
      ? searchParams.set("username", filterValues.username)
      : searchParams.delete("username");
    !!filterValues.role
      ? searchParams.set("role", filterValues.role)
      : searchParams.delete("role");
    debounceSetSearchParams(searchParams);
  }, [filterValues]);

  return (
    <div>
      <div id="BrowseUsers__filters">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) =>
            setFilterValues({
              ...filterValues,
              email: e.target.value,
            })
          }
          value={filterValues.email}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) =>
            setFilterValues({
              ...filterValues,
              username: e.target.value,
            })
          }
          value={filterValues.username}
        />
        {user?.role === Role.ADMIN && (
          <>
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              onChange={(e) =>
                setFilterValues({
                  ...filterValues,
                  role: e.target.value as Role,
                })
              }
              value={filterValues.role}
            >
              <option value="">All</option>
              {Object.values(Role).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </>
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
