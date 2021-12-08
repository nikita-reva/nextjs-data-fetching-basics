import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastCommentsPage(props) {
  const [comments, setComments] = useState(props.comments);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    'https://agv-project-docs-default-rtdb.europe-west1.firebasedatabase.app/comments/0.json',
    (url) => fetch(url).then((response) => response.json())
  );

  if (!error) {
    return <p>Failed to load data</p>;
  }

  // if (!data || !sales) {
  //   return <p>Loading...</p>;
  // }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    const transformedData = [];

    for (const key in data) {
      transformedData.push({ id: key, displayName: data[key].displayName });
    }

    setComments(transformedData);
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const data = fetch(
  //     'https://agv-project-docs-default-rtdb.europe-west1.firebasedatabase.app/comments/0.json'
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedData = [];

  //       for (const key in data) {
  //         transformedData.push({ id: key, displayName: data[key].displayName });
  //       }

  //       setComments(transformedData);
  //       setIsLoading(false);
  //     });
  // }, []);
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (!comments) {
  //   return <p>No data yet</p>;
  // }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.displayName}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    'https://agv-project-docs-default-rtdb.europe-west1.firebasedatabase.app/comments/0.json'
  );
  const data = response.json();

  const transformedData = [];

  for (const key in data) {
    transformedData.push({ id: key, displayName: data[key].displayName });
  }

  return {
    props: {
      comments: transformedData,
    },
    revalidate: 10,
  };
}

export default LastCommentsPage;
