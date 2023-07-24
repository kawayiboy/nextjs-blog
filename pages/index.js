import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
// import { getSortedPostsData } from '../lib/posts';
import { readCsvData } from '../lib/csv-data';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Date from '../components/date';
import { useRouter } from 'next/navigation';


export async function getStaticProps() {
    // const allPostsData = getSortedPostsData();
    // console.log(allPostsData);
    const allPostsData = await readCsvData();
    console.log(allPostsData);
    return {
        props: {
            allPostsData,
        },
    };

}

const handleDelPost = async (id, onSuccess) => {
    try {
        const response = await fetch('/api/post', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            // alert('Delete successfully!');
            onSuccess();
        }
    } catch (error) {
        alert(`Something went wrong. Please try again later.${error}`);
    }
};

export default function Home({ allPostsData }) {
    const router = useRouter();
    const onSuccess=()=>{ router.push('/');}

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+6f06jrSpdz4qjVAxJDcjn5tAiDHWfiq2P6Y/Z4kPn7Ay" crossOrigin="anonymous" /> */}

            </Head>
            <section className={utilStyles.headingMd}>
                <p>[Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>

            {/* Add this <section> tag below the existing <section> tag */}
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 className={utilStyles.headingLg}>Blog</h2>
                    <Link href="/publish" style={{ textDecoration: 'underline'}}>
                        Publish post
                    </Link>
                    </div>

                {/* <p className={styles.description}>
                    <Link href="/posts/first-post">First post</Link>
                </p> */}
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (

                        <li className={utilStyles.listItem} key={id}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Link href={`/posts/${id}`}>{title}</Link>
                                <button type="button" className="btn btn-primary" onClick={() => handleDelPost(id, onSuccess)}>Delete</button>
                            </div>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}