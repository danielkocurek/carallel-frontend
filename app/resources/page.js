'use client'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import useSWR from 'swr'
import Link from 'next/link';
import { fetcher } from '@/app/api/utils';
import styles from './page.module.css';

function ResourcesPage() {
  // Fetch and display the articles
  const { data, error } = useSWR(['/articles'], fetcher);
 
    if (error) return <div>Failed to load articles</div>
    if (!data) return <div>Loading...</div>
   
    return (
        <div>
            <h1>Resources</h1>
            <div>
                {data.map((article) => (
                    <li key={article.id} className={styles.article}>
                        <Link href={`/resources/article/${article.id}`}>
                            {article.title}
                        </Link>
                    </li>
                ))}
                {
                    data.length === 0 ? <div>No articles.</div> : null
                }
            </div>
        </div>
    );
}

export default withPageAuthRequired(ResourcesPage);
