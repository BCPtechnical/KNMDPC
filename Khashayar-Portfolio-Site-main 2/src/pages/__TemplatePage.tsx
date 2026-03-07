import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import Metadata from '@/static/metadata/template-metadata.json';

export default function Page() {
  const isBrowser = typeof window !== `undefined`;

  return isBrowser ? (
    <Layout>
      <>
        This is a default page. Be sure to wrap everything inside the Layout
        object!
      </>
    </Layout>
  ) : null;
}

export function Head() {
  return <Seo metadataArray={Metadata} />;
}
