import { Helmet } from '@modern-js/runtime/head';
import './index.css';
import type { PageData } from '@/routes/page.data';
import { useLoaderData } from '@modern-js/runtime/router';
import Provider from 'provider';

const Index = () => (
  <div className="container-box">
    <Helmet>
      <link
        rel="icon"
        type="image/x-icon"
        href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
      />
    </Helmet>

    <p>Installed plugins</p>
    {useLoaderData<PageData>().plugins.map((plugin, index) => (
      <p key={`${plugin.name}-${index}`}>{plugin.name}</p>
    ))}

    <div className="landing-page">
      <Provider />
    </div>
  </div>
);

export default Index;
