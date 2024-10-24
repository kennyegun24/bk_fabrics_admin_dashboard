"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import useSWR from "swr";
import { useSelector } from "react-redux";

const arr = Array.from({ length: 5 });
const UsersCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const TOKEN = currentUser?.access_token;
  const fetcher = async () => {
    const fetchData = await fetch(
      "https://bk-fabrics-server.vercel.app/api/stats/",
      {
        headers: {
          Token: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await fetchData.json();
    return data;
  };
  const { data, error, isLoading } = useSWR("fetch5users", fetcher, {
    refreshInterval: null,
    errorRetryInterval: 500,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnMount: true,
  });
  const convertDate = (date) => {
    const newDate = new Date(date).toLocaleString();
    return newDate;
  };
  return (
    <div className="sales_lines_chart_card max_height_70vh">
      <h3>Users</h3>
      <hr />
      <section className="users_lists">
        {data?.map((user, _) => (
          <section className="user" key={_}>
            <div className="user_list_name_container">
              <div className="img" />
              <p>
                {user.first_name} {user.last_name} <span>{user.email}</span>
              </p>
            </div>
            <p>{convertDate(user.createdAt)}</p>

            {/* <div className="check_cancel_svgs">
              <div>
                <IoClose color="#F44236" />
              </div>
            </div> */}
          </section>
        ))}
      </section>
    </div>
  );
};

export default UsersCard;
