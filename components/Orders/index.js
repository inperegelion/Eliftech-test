class Orders extends React.Component {
  state = {
    orders: [],
    linesOnPage: 10,
    currentPage: 0,
    totalSize: undefined,
    sortBy: "user_email",
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = () => {
    const ordersQuery = `?from=${
      Number(this.state.currentPage * this.state.linesOnPage) //
    }&to=${
      Number((this.state.currentPage + 1) * this.state.linesOnPage) //
    }&sortBy=${this.state.sortBy}`;

    fetch(`http://localhost:3001/get-orders${ordersQuery}`)
      .then(res => res.json())
      .then(res => {
        this.setState(state => ({
          ...state,
          orders: res.orders,
          totalSize: res.totalSize,
        }));
        console.log("ORDERS RECEIVED: ", res, this.state);
      });
    console.log("FETCH ORDERS BEEN SENT", ordersQuery, this.state);
  };

  changePage = step => {
    const newPage = this.state.currentPage + step;
    if (
      // check if page in borders
      newPage >= 0 &&
      newPage + step <= this.state.totalSize / this.state.linesOnPage + 1
    )
      this.setState(
        prevState => ({ currentPage: newPage }),
        newState => {
          console.log("NOW PAGE SET TO:", this.state.currentPage);
          this.fetchOrders();
        }
      );
  };

  setSorting = colName => {
    this.setState({ sortBy: colName }, newState => {
      this.fetchOrders();
    });
  };

  render() {
    return (
      <div>
        <h3>Orders:</h3>
        <button onClick={this.fetchOrders}>Refresh</button>
        <div>
          <button onClick={() => this.changePage(-1)}>{"<"}</button>
          <span>{this.state.currentPage + 1}</span>
          <button onClick={() => this.changePage(1)}>{">"}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={() => this.setSorting("user_email")}>user_email</th>
              <th onClick={() => this.setSorting("date")}>date</th>
              <th onClick={() => this.setSorting("value")}>value</th>
              <th onClick={() => this.setSorting("currency")}>currency</th>
              <th onClick={() => this.setSorting("status")}>status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((order, key) => (
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
      </div>
    );
  }
}

export default Orders;
