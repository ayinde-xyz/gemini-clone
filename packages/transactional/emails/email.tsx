import {
  Button,
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Link,
} from "@react-email/components";
import * as React from "react";

// export default function Email() {
//   return (
//     <Html>
//       <Head />
//       <Body>
//         <Button
//           href="https://example.com"
//           style={{ background: "#000", color: "#fff", padding: "12px 20px" }}>
//           Click me
//         </Button>
//       </Body>
//     </Html>
//   );
// }

interface EmailProps {
  description?: string;
  link?: string;
}

export default function Email({ description, link }: EmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f8fafc",
          padding: "20px",
        }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              padding: "30px 20px",
              textAlign: "center",
            }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>🤖</div>
            <Heading
              style={{
                color: "#ffffff",
                margin: "0",
                fontSize: "28px",
                fontWeight: "bold",
              }}>
              Neuralis AI
            </Heading>
          </div>

          {/* Content */}
          <div style={{ padding: "40px 30px" }}>
            <Heading
              style={{
                color: "#1f2937",
                fontSize: "24px",
                marginBottom: "20px",
                textAlign: "center",
              }}>
              Reset Your Password
            </Heading>

            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "30px",
                textAlign: "center",
              }}>
              {description}
            </Text>

            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <Button
                href={link}
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "inline-block",
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                  transition: "all 0.3s ease",
                }}>
                Reset Password
              </Button>
            </div>

            <Text
              style={{
                color: "#6b7280",
                fontSize: "14px",
                textAlign: "center",
                marginBottom: "20px",
              }}>
              If the button doesn't work, copy and paste this link into your
              browser:
            </Text>

            <Link
              href={link}
              style={{
                color: "#3b82f6",
                fontSize: "14px",
                wordBreak: "break-all",
                textAlign: "center",
                display: "block",
              }}>
              {link}
            </Link>
          </div>

          {/* Footer */}
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "20px 30px",
              textAlign: "center",
              borderTop: "1px solid #e5e7eb",
            }}>
            <Text style={{ color: "#6b7280", fontSize: "12px", margin: "0" }}>
              This link will expire in 24 hours for security reasons.
            </Text>
            <Text
              style={{
                color: "#6b7280",
                fontSize: "12px",
                margin: "10px 0 0 0",
              }}>
              If you didn't request this password reset, please ignore this
              email.
            </Text>
          </div>
        </Container>
      </Body>
    </Html>
  );
}
