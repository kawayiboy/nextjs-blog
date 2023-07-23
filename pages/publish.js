import Head from 'next/head';
import Form from '../components/form';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router';

export default function Publish() {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Publish a Post</title>
                <meta name="description" content="Publish a new blog post" />
            </Head>

            <main className="container text-center">
                <h1 className="mb-4">Publish a Post</h1>
                <Form apiUrl={'/api/post'} onSuccess={()=>{ router.push('/'); }}/>
            </main>
        </div>
    );
}