"use client";

export default function FilteredNotesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24, maxWidth: 560, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12 }}>Помилка при завантаженні списку</h2>
      <p style={{ color: "#6c757d", marginBottom: 16 }}>{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          padding: "8px 16px",
          fontSize: 16,
          color: "#fff",
          backgroundColor: "#0d6efd",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Спробувати знову
      </button>
    </div>
  );
}
