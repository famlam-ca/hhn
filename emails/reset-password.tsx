import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

const baseUrl = process.env.NEXT_URL
  ? `${process.env.NEXT_URL}`
  : "http://localhost:3000"

interface ResetPasswordEmailProps {
  data: {
    username?: string
    url?: string
  }
}

export const ResetPasswordEmail = ({
  data: { username, url },
}: ResetPasswordEmailProps) => {
  const year = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo} data-darkreader-inline-bgcolor="">
            <Img
              src={`${baseUrl}/logo/full/logo-full-dark-blue-s.png`}
              width={230}
              alt="HHN"
            />
          </Section>

          <Section style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={content} data-darkreader-inline-bgcolor="">
            <Heading data-darkreader-inline-color="">
              Reset Your Password
            </Heading>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              Hi, {username}. You recently requested to reset your password.
              <br />
              If you did not make this request, please ignore this email.
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Button
              href={url}
              style={{
                textTransform: "uppercase",
                padding: "15px 80px",
                borderRadius: "3px",
                backgroundColor: "#81c3fd",
                border: "none",
                color: "#363949",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              data-darkreader-inline-bgcolor=""
              data-darkreader-inline-border-top=""
              data-darkreader-inline-border-right=""
              data-darkreader-inline-border-bottom=""
              data-darkreader-inline-border-left=""
              data-darkreader-inline-color=""
            >
              Reset Password
            </Button>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              Or copy/paste this link into your browser:
            </Text>

            <Text style={link} data-darkreader-inline-color="">
              <Link href={url}>{url}</Link>
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              If you received this email by mistake or did not authorize the
              request, please&nbsp;
              <Link
                href={`${baseUrl}/contact/support`}
                style={link}
                data-darkreader-inline-color=""
              >
                contact support
              </Link>
            </Text>

            <Section style={{ height: "30px" }}>&nbsp;</Section>

            <Text data-darkreader-inline-color="">
              Sincerely,
              <br />
              The HHN Team
            </Text>
          </Section>

          <Section style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={footer}>
            <Section style={logo} data-darkreader-inline-bgcolor="">
              <Img
                src={`${baseUrl}/logo/full/logo-full-dark-blue-s.png`}
                width={120}
                alt="HHN"
              />
            </Section>

            <Row>
              <Column
                align="right"
                style={{ width: "50%", paddingRight: "8px" }}
              >
                <Link href="https://www.famlam.ca">
                  <Img
                    src={`${baseUrl}/logo/logo512-dark-s.png`}
                    alt="Website"
                    width={25}
                    height={25}
                  />
                </Link>
              </Column>
              <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
                <Link href="https://github.com/SlickYeet/famlam">
                  <Img
                    src={`${baseUrl}/github/github-mark.svg`}
                    alt="Github"
                    width={25}
                    height={25}
                  />
                </Link>
              </Column>
            </Row>

            <Text style={footerLinksWrapper}>
              <Link href={`${baseUrl}/about`} style={footerLinks}>
                About
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href={`${baseUrl}/about/projects`} style={footerLinks}>
                Projects
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href={`${baseUrl}/docs`} style={footerLinks}>
                Docs
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href={`${baseUrl}/contact`} style={footerLinks}>
                Contact
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href={`${baseUrl}/contact/support`} style={footerLinks}>
                Support
              </Link>
            </Text>

            <Text
              style={{
                textAlign: "center",
                color: "#363949",
                fontSize: "12px",
                lineHeight: "14px",
                paddingTop: "10px",
                paddingBottom: "30px",
              }}
            >
              © {year} HHN™, All Rights Reserved <br />
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ResetPasswordEmail.PreviewProps = {
  data: {
    username: "SlickYeet",
    url: `${baseUrl}/reset`,
  },
} as ResetPasswordEmailProps

export default ResetPasswordEmail

const fontFamily = "Inter,Inter,Arial,sans-serif"

const main = {
  backgroundColor: "#fffff",
  color: "#363949",
  fontWeight: 500,
  fontFamily,
}

const container = {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "500px",
}

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: "15px 30px",
  marginBottom: "10px",
  backgroundColor: "#f6f6f9",
}

const content = {
  padding: 30,
  marginBottom: 10,
  textAlign: "center" as const,
  backgroundColor: "#f6f6f9",
  fontSize: 16,
}

const footer = {
  backgroundColor: "#f6f6f9",
  maxWidth: "580px",
  margin: "0 auto",
}

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
}

const footerLinks = {
  color: "#363949",
}

const link = {
  textDecoration: "underline",
  color: "#81c3fd",
}

const sectionsBorders = {
  width: "100%",
  display: "flex",
}

const sectionBorder = {
  borderBottom: "1px solid rgb(228, 228, 231)",
  width: "249px",
}

const sectionCenter = {
  borderBottom: "1px solid rgb(129, 195, 253)",
  width: "102px",
}
