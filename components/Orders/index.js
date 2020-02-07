import { useRouter } from "next/router";
import React from "react";

class Orders extends React.Component {
  state = { orders: [] };

  componentDidMount() {
    fetch("http://localhost:3001/get-orders")
      .then(res => res.json())
      .then(res => {
        this.setState({ orders: res });
      });
  }

  render() {
    return (
      <div>
        <h3>Orders:</h3>
        <button>Refresh</button>
        <PageSelector totalPages={NaN} />
        <OrdersTable orders={this.state.orders} />
      </div>
    );
  }
}

const PageSelector = props => {
  const currentPage = useRouter().query.page;

  return (
    <div>
      <span>{currentPage}</span>
    </div>
  );
};

const OrdersTable = props => (
  <table>
    <thead>
      <tr>
        <th>user_email</th>
        <th>date</th>
        <th>value</th>
        <th>currency</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {props.orders.map((order, key) => (
        <tr key={key}>
          <td>{order.user_email}</td>
          <td>{order.date}</td>
          <td>{order.value}</td>
          <td>{order.currency}</td>
          <td>{order.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Orders;
