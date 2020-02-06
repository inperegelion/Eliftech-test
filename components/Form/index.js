export default () => {
  return (
    <div>
      <h3>The FORM:</h3>
      <form>
        <input id="choose" type="file" required />
        <label htmlFor="choose">Select the .csv file</label>
        <input type="submit" />
      </form>
    </div>
  );
};
