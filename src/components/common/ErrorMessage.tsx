export function ErrorMessage({ error }: { error: string }) {
  return (
    <div style={{
      color: "red",
      textAlign: "center",
      marginTop: "4rem",
      fontSize: "1.3rem"
    }}>
      Error: {error}
    </div>
  );
}