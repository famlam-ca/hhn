import { Button, Html, Text } from "@react-email/components";

interface EmailProps {
  data: {
    url?: string;
    username?: string;
  };
}

export const TestEmail = ({ data: { url, username } }: EmailProps) => {
  return (
    <Html lang="en">
      <Text>Hello, {username}!</Text>
      <Button href={url}>Click me</Button>
    </Html>
  );
};

export default TestEmail;
