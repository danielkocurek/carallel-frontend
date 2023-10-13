'use client'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import useSWR from 'swr'
import { fetcher } from '@/app/api/utils';
import styles from './page.module.css';

function HistoryPage() {
    // Fetch and display the link history
    const { data, error } = useSWR(['/history'], fetcher);
 
    if (error) return <div>Failed to load history</div>
    if (!data) return <div>Loading...</div>
   
    return (
        <div>
            <h1>Link History</h1> {/* Render the user ID */}
            <table className={styles.historyTable}>
                <thead>
                    <tr>
                        <th>Article ID</th>
                        <th>User ID</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((record) => (
                        <tr key={record.uuid}>
                            <td>{record.articleId}</td>
                            <td>{record.userId}</td>
                            <td>{new Date(record.time).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && <div>No history records found.</div>}
        </div>
    );
}

export default withPageAuthRequired(HistoryPage);
