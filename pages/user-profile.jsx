import React from 'react';

function UserProfilePage({ username }) {
  return <h1>{username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log('Server side code');
  //https://nodejs.org/api/http.html#http_class_http_incomingmessage
  //https://nodejs.org/api/http.html#http_class_http_serverresponse

  return {
    props: {
      username: 'Max',
    },
  };
}
