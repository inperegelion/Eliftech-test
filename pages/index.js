import Form from "../components/Form";
import Orders from "../components/Orders";
// import "./styles.scss";

export default () => {
  return (
    <div className="main_page">
      <h1>Serhii's solution of Eliftech test task</h1>
      <p>
        Welcome here, you see the frontend side of my simple web app. Here you
        can find that all requirements for the task are fulfilled. Even more,
        some optional requirements are fulfilled too. According to the task, the
        functionality of the considered app is the following:
      </p>
      <ul>
        <li>
          You able to upload your <code>.csv</code>
        </li>
        <li>
          Validate is uploaded file has <code>.csv</code> extension on the
          frontend side
        </li>
        <li>
          Validate is uploaded <code>.csv</code> have valid columns on the
          backend side
        </li>
        <li>Display orders from Mongo DB with paging</li>
        <li>Ability to sort list of orders by any col</li>
      </ul>
      <Form />
      <Orders />
      <style jsx>{`
        body {
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        h1 {
          text-align: center;
        }
        p {
          text-align: justify;
        }
        .main_page {
          max-width: 600px;
          margin: 0 auto;
          font-family: sans-serif;
        }
      `}</style>
    </div>
  );
};
