import fetch from 'isomorphic-unfetch';
import { NextComponentType, NextPageContext } from 'next';
interface Props {
  users: {
    name: string;
  }[];
}

const Index: NextComponentType<NextPageContext, Props, Props> = ({ users }) => (
  <div>
    {users.map((user, i) => (
      <div key={i}>{user.name}</div>
    ))}
  </div>
);

Index.getInitialProps = async () => {
  const response = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: '{ users { name } }' }),
  });

  const {
    data: { users },
  } = await response.json();

  return { users };
};

export default Index;
