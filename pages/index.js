import React from "react";
import Form from "../components/Form";
import Orders from "../components/Orders";

export default () => {
  return (
    <div>
      <h1>Welcome to Eliftech test task</h1>
      <p>
        According to the task, the functionality of begotten app is the
        following:
      </p>
      <ul>
        <li>
          You able to upload your <code>.csv</code>
        </li>
        <li>Watch the list of already uploaded orders</li>
      </ul>
      <Form />
      <Orders />
    </div>
  );
};
