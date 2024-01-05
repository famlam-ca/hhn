interface PageProps {
  params: {
    username: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <div>{params.username}</div>;
};

export default Page;
