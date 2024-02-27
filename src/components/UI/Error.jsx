function Error({ message }) {
  return (
    <p
      style={{
        color: "tomato",
        fontWeight: "900",
        backgroundColor: "black",
        width: "fit-content",
        padding: "1rem",
      }}
    >
      {message}
    </p>
  );
}

export default Error;
