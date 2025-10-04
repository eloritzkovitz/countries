export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "4rem",
      fontSize: "1.3rem",
      color: "#555"
    }}>
      <div className="spinner" style={{
        margin: "0 auto 1rem auto",
        width: 32,
        height: 32,
        border: "4px solid #eee",
        borderTop: "4px solid #0078d4",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      {message}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}