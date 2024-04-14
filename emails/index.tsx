import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.NEXT_URL
  ? `https://${process.env.NEXT_URL}`
  : "http://localhost:3000";

interface EmailProps {
  data: {
    username?: string;
  };
}

export const Email = ({ data: { username } }: EmailProps) => {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Verify Your Email Address</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logo} data-darkreader-inline-bgcolor="">
            <Img
              src={`${baseUrl}/logo/full/logo-full-dark-blue-s.png`}
              width={230}
              alt="HHN"
            />
          </Section>

          {/* Divider */}
          <Row style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Column style={sectionBorder} />
            <Column style={sectionCenter} />
            <Column style={sectionBorder} />
          </Row>

          {/* Content */}
          <Section style={content} data-darkreader-inline-bgcolor="">
            <Text data-darkreader-inline-color="">
              Hi, {username}!
              <br />
              Content goes here
            </Text>
          </Section>

          {/* Divider */}
          <Row style={sectionsBorders} data-darkreader-inline-bgcolor="">
            <Column style={sectionBorder} />
            <Column style={sectionCenter} />
            <Column style={sectionBorder} />
          </Row>

          {/* Footer */}
          <Section style={footer}>
            {/* Logo */}
            <Section style={logo} data-darkreader-inline-bgcolor="">
              <Img
                src={`${baseUrl}/logo/full/logo-full-dark-blue-s.png`}
                width={120}
                alt="HHN"
              />
            </Section>
            {/* Socials */}
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

            {/* Other links */}
            <Text style={footerLinksWrapper}>
              <Link href="https://www.famlam.ca/" style={footerLinks}>
                About
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://www.famlam.ca/projects/" style={footerLinks}>
                Projects
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://www.famlam.ca/docs/" style={footerLinks}>
                Docs
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://www.famlam.ca/contact/" style={footerLinks}>
                Contact
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://www.famlam.ca/terms/" style={footerLinks}>
                Terms
              </Link>
            </Text>

            {/* © */}
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
  );
};

Email.PreviewProps = {
  data: {
    username: "SlickYeet",
  },
} as EmailProps;

export default Email;

const fontFamily = "Inter,Inter,Arial,sans-serif";

const main = {
  backgroundColor: "#fffff",
  color: "#363949",
  fontWeight: 500,
  fontFamily,
};

const container = {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "500px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: "15px 30px",
  marginBottom: "10px",
  backgroundColor: "#f6f6f9",
};

const content = {
  padding: 30,
  marginBottom: 10,
  textAlign: "center" as const,
  backgroundColor: "#f6f6f9",
  fontSize: 16,
};

const footer = {
  backgroundColor: "#f6f6f9",
  maxWidth: "580px",
  margin: "0 auto",
};

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
};

const footerLinks = {
  color: "#363949",
};

const link = {
  textDecoration: "underline",
  color: "#81c3fd",
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(228, 228, 231)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(129, 195, 253)",
  width: "102px",
};
