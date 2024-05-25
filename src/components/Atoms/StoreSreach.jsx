const PlaceSearchButton = (props) => {
  return (
    <button style={{
      backgroundColor:"#fff100",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "100vh",
      cursor: "pointer"
    }} type="button" onClick={props.onClick}>
      近くの二郎を検索
    </button>
  );
};
export default PlaceSearchButton;
