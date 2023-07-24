import Layout from '../../components/layout';
// import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
// import { readCsvDataById, getAllIds } from '../../lib/csv-data';
import { findDataById,getAllIds } from '../../lib/mysql_dao';

export default function Post({ postData }) {
    return (
      <Layout>
              <Head>
              <Date dateString={postData.date} />
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
      </Layout>
    );
  }

// export async function getStaticPaths() {
//     const paths = getAllPostIds();
//     return {
//         paths,
//         fallback: false,
//     };
// }



// export async function getStaticProps({ params }) {
//     const postData = await getPostData(params.id);
//     return {
//       props: {
//         postData,
//       },
//     };
//   }

// csv get all ids
// export async function getStaticPaths() {
//     const paths = await getAllIds();
//     const pmap = paths.map(item => ({ params: {id: item}}));
//     console.log(`pmap: ${pmap}`);
//     return {
//         paths: pmap,
//         fallback: false,
//     };
// }


export async function getStaticPaths() {
    const paths = await getAllIds();
    const pmap = paths.map(item => ({ params: item }));
    console.log(`pmap: ${pmap}`);
    return {
        paths: pmap,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // const postData = await readCsvDataById(params.id);
    const postData = await findDataById(params.id);
    console.log(`postData: ${postData}`);
    return {
      props: {
        postData,
      },
    };
}