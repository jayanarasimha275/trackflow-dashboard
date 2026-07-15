"use client";

export default function ClickHistory({ clicks }) {
  if (!clicks.length) {
    return (
      <div
        style={{
          marginTop: "24px",
          padding: "20px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
        }}
      >
        No click history available.
      </div>
    );
  }

  return (
    <section
      style={{
        marginTop: "24px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border)",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Recent Clicks
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>IP</th>
            <th>Browser</th>
            <th>OS</th>
            <th>Device</th>
            <th>Country</th>
            <th>City</th>
            <th>Unique</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {clicks.map((click) => (
            <tr key={click.id}>
              <td>{click.ipAddress}</td>
              <td>{click.browser}</td>
              <td>{click.operatingSystem}</td>
              <td>{click.deviceType}</td>
              <td>{click.country}</td>
              <td>{click.city}</td>
              <td>{click.isUnique ? "Yes" : "No"}</td>
              <td>{new Date(click.clickedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
