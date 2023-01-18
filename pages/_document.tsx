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
        </body>
      </Html>
    );
  }
}

export default MyDocument;
