function Error({ message, color }) {
  return (
    <p
      style={{
        color: color,
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
