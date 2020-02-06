import { useRouter } from "next/router";

export default () => {
  const currentPage = useRouter().query.page;

  return (
    <div>
      <h3>Orders:</h3>
      <PageSelector current={currentPage} atAll={NaN} />
    </div>
  );
};

const PageSelector = props => {
  return (
    <div>
      <span>{props.current}</span>
    </div>
  );
};
