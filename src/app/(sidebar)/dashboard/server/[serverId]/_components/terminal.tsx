interface TerminalProps {
  sshConfig: {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKey?: string;
  };
}

export const Terminal = ({ sshConfig }: TerminalProps) => {
  return <div></div>;
};
