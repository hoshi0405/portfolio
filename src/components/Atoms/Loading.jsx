const LoadingArea = (props) => {
  return (
    <div id="loading-area" className={props.loading ? "is-show" : ""}></div>
  );
};
export default LoadingArea;
