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

    fetch(`http://localhost:3030/get-orders${ordersQuery}`)
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
          this.fetchOrders();
        }
      );
  };

  changeOrdersOnPage = step => {
    const newNum = this.state.linesOnPage + step;
    if (this.state.linesOnPage + step >= 0)
      this.setState(
        prevState => ({ linesOnPage: newNum, currentPage: 0 }),
        newState => {
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
        <h3 style={{ textAlign: "center" }}>Orders:</h3>
        <div className="tools">
          <button onClick={this.fetchOrders} className="tool">
            Refresh
          </button>
          <div className="tool">
            <button onClick={() => this.changePage(-1)}>{"<"}</button>
            <span>{this.state.currentPage + 1}</span>
            <button onClick={() => this.changePage(1)}>{">"}</button>
          </div>
          <div className="tool">
            <button onClick={() => this.changeOrdersOnPage(-1)}>{"-"}</button>
            <span>{this.state.linesOnPage}</span>
            <button onClick={() => this.changeOrdersOnPage(1)}>{"+"}</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="user_email" onClick={() => this.setSorting("user_email")}>
                user_email
              </th>
              <th className="date" onClick={() => this.setSorting("date")}>
                date
              </th>
              <th className="value" onClick={() => this.setSorting("value")}>
                value
              </th>
              <th className="currency" onClick={() => this.setSorting("currency")}>
                currency
              </th>
              <th className="status" onClick={() => this.setSorting("status")}>
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((order, key) => (
              <tr key={key}>
                <td className="user_email">{order.user_email}</td>
                <td className="date">{order.date}</td>
                <td className="value">{order.value}</td>
                <td className="currency">{order.currency}</td>
                <td className="status">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <style jsx>{`
          h1 {
            text-align: center;
          }
          .tools {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 1em 0;
          }
          .tool {
            height: 66px;
            width: 66px;
            border-radius: 50%;
            border: 1px solid #888888;
            background: #cccccc;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          table {
            width: 100%;
            border-bottom: 1px solid #888888;
          }
          td,
          th {
            padding: 0.3em;
            text-align: left;
            font-family: monospace;
            border-left: 1px solid #888888;
          }
          tr {
            border: 1px solid red;
          }
          td {
            margin: 0.3em;
            font-size: 14px;
          }
          th {
            text-transform: uppercase;
            font-size: 16px;
            border-bottom: 2px solid #888888;
            width: auto;
          }
          .value,
          .date {
            text-align: right;
          }
          .user_email {
            border-left: none;
          }
        `}</style>
      </div>
    );
  }
}

export default Orders;
