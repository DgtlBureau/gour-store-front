/* eslint no-irregular-whitespace: "off" */
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap' rel='stylesheet' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link href='https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src='https://checkout.cloudpayments.ru/checkout.js' />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    (function(a,m,o,c,r,m) {
                      a[m] = {
                        id:"117761",
                        hash:"78d744b05d391618671c168e7548fb9dd2cd804200d38f012f3e246ac1a880e1",
                        locale:"ru",
                        inline:false,
                        setMeta:function(p) {
                          this.params=(this.params||[]).concat([p])
                        }
                      };
                      a[o] = a[o] || function(){
                        (a[o].q=a[o].q||[]).push(arguments)
                      };
                      var d=a.document, s=d.createElement('script');
                      s.async=true;
                      s.id=m+'_script';
                      s.src='https://gso.amocrm.ru/js/button.js?1673980171';
                      d.head && d.head.appendChild(s)
                    }(window,0,'amoSocialButton',0,0,'amo_social_button'));
              `,
            }}
          />
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                 m[i].l=1*new Date();
                 for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                 k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                 (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                 ym(92190821, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                 });
            `,
            }}
          />

          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(93547510, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        ecommerce:"dataLayer"
   });
   window.dataLayer = window.dataLayer || [];
`,
            }}
          />
          <noscript>
            <div>
              <img src="https://mc.yandex.ru/watch/93547510" style={{position: 'absolute', left:'-9999px' }} alt="" />
            </div>
          </noscript>


          <noscript>
            <div>
              <img src='https://mc.yandex.ru/watch/92190821' style={{ position: 'absolute', left: '-9999px' }} alt='' />
            </div>
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
