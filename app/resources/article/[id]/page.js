'use client'

import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import useSWR from 'swr'
import { fetcher } from '@/app/api/utils';

function ArticlePage({ params }) {
  const { id } = params;
  const { user } = useUser();

  // Fetch and display the article with the given ID
  const { data, error } = useSWR([`/articles/${id}`, user.sub], fetcher);
 
  if (error) return <div>Failed to load article</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export default withPageAuthRequired(ArticlePage);
