import React from "react";
import { useNavigate } from "react-router-dom";
export default function Solutions() {
  return (
    <div style={{ padding: "50px", background: "#f8fafc", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "700" }}>
          Solutions
        </h1>
        <p style={{ color: "#555", marginTop: "10px" }}>
          Explore how Pravah solves real business problems
        </p>
      </div>

      {/* SECTION CARD WRAPPER */}
      <Section title="Department Solutions" items={[
        "Marketing", "Sales", "Support", "HR", "Operations", "Project Management"
      ]} />

      <Section title="Industry Solutions" items={[
        "SaaS", "E-commerce", "Healthcare", "Education", "Finance", "Real Estate"
      ]} />

      <Section title="AI Solutions" items={[
        "AI Agents", "Chatbots", "Lead Qualification",
        "Content Generation", "Support Automation", "Data Processing"
      ]} />
      <WorkflowSection />
      <CTASection />

    </div>
  );
}
function WorkflowSection() {
  const workflows = [
    {
      from: "Form Submission",
      to: "Slack Notification",
    },
    {
      from: "Lead Capture",
      to: "CRM Sync",
    },
    {
      from: "Support Ticket",
      to: "AI Classification",
    },
    {
      from: "Customer Purchase",
      to: "WhatsApp Follow-up",
    },
  ];

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Workflow Examples</h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "15px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {workflows.map((item) => (
          <div
            key={item.from}
            style={{
              padding: "15px",
              background: "white",
              borderRadius: "10px",
              border: "1px solid #eee",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ fontWeight: 600 }}>{item.from}</div>
            <div style={{ margin: "8px 0" }}>⬇</div>
            <div style={{ fontWeight: 600 }}>{item.to}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function CTASection() {
  const navigate = useNavigate();

  return (
    <div style={{
      marginTop: "50px",
      padding: "30px",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
      textAlign: "center",
      borderRadius: "12px"
    }}>
      <h2>Ready to Automate Your Business?</h2>
      <p>Start building workflows in minutes with Pravah</p>

      <button
        onClick={() => navigate("/signup")}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Get Started
      </button>
    </div>
  );
}

// Reusable component
function Section({ title, items }: { title: string, items: string[] }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ marginBottom: "15px", fontSize: "22px" }}>{title}</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "15px"
      }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              border: "1px solid #eee",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}