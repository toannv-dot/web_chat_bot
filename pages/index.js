import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useEffect,useState} from 'react'
import axios from 'axios'


class ChannelService {
  constructor() {
    this.loadScript();
  }

  loadScript() {

    var w = window;
    if (w.ChannelIO) {
      return (window.console.error || window.console.log || function () { })('ChannelIO script included twice.');
    }
    var ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      console.log("document.readyState === 'complete'");
      l();
    } else if (window.attachEvent) {
      console.log("window.attachEvent");
      window.attachEvent('onload', l);
    } else {
      console.log("DOMContentLoaded");
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
    // document.getElementsByTagName("svg")[0].setAttribute('display', 'none')
    // location.replace("https://ljywn.channel.io/user-chats/638acb49922ae180abc0?mode=newTab&translate=true&sessionJWT=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZXMiLCJrZXkiOiIxMTQ2NjgtNjM4MjRlMDdmMWJmNDQ4NTUwMDIiLCJpYXQiOjE2NzAyNTkyMTgsImV4cCI6MTY3Mjg1MTIxOH0.Ih4LYRGlBf0NobimzFPU6rbK1v2y4eI4T8JGCcCA7nY&page=aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTgwODElMkZhc3NldHMlMkZzcmMlMkZtb2R1bGVzJTJGcHJpdmF0ZSUyRmNoYXQlMkZpbmRleC5odG1sJTNGcGxhdGZvcm0lM0Rpb3MlMjZoYXNoJTNEMjcwNTYwMDQzMjM2ZTcyYWY0OTY4OWU2OTQyMDZkZjg%3D")

  }

  boot(settings) {
    console.log('settings', settings);
    // window.ReactNativeWebView.postMessage(JSON.stringify(settings));
    window.ChannelIO('boot', settings, async function onBoot(error, user) {
      if (error) {
        console.log({ error })
        window.ReactNativeWebView.postMessage(JSON.stringify(error));
      } else {
        // console.log({ user })
        // window.ReactNativeWebView.postMessage(JSON.stringify(user));
        // chatID? chatID: undifi
        window.ChannelIO('setPage', 'https://localhost:8889/')
        window.ChannelIO('openChat', "638acaf83cb3e2626730", '');
        // document.getElementsByTagName("svg")[0].setAttribute('display', 'none')
      }
    });

    // window.ChannelIO('showMessenger');
  }

  shutdown() {
    window.ChannelIO('shutdown');
  }
}

export default function Home() {

  const crypto = require('crypto');
  const memberId = 'member002';
  const secretKey = '4629de5def93d6a2abea6afa9bd5476d9c6cbc04223f9a2f7e517b535dde3e25';
  const memberHash =
  '05ca1aeb4265fe79efe65c802f49bd962bedd211ce27592ea3b2288698548c07';
  
  const hash = crypto.createHmac('sha256', Buffer.from(secretKey, 'hex'))
                  .update(memberId)
                  .digest('hex');
  // console.log('hash',hash)
  const [user,setUser]=useState('')
  useEffect(() => {
    async function getDetailChatBot() {
      try {
        const myDataUser = await axios({
          method: 'GET',
          url: `https://api.channel.io/open/v5/users/@${memberId}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Access-Key': '638024635c899333cde9',
            'X-Access-Secret': '7006056e109b1070231e2c5544159239',
            withCredentials: false,
            crossdomain: true,
            'Content-Security-Policy': 'script-src https://*.channel.io'
          },
        });
        const idUser = await myDataUser;
        setUser(idUser.data.user.id)
        // if (idUser) {
        //   const responseDataUserChat = await axios({
        //     method: 'GET',
        //     url: `https://api.channel.io/open/v5/users/${idUser.data.user.id}/user-chats`,
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Accept: 'application/json',
        //       'X-Access-Key': '638024635c899333cde9',
        //       'X-Access-Secret': '7006056e109b1070231e2c5544159239',
        //     },
        //   });
        //   console.log(
        //     'responseDataUserChat',
        //     responseDataUserChat.data.messages,
        //   );
        //   if (responseDataUserChat.data.messages.length > 0) {
        //     console.log('data', responseDataUserChat.data.messages[0].chatId);
        //     setUrl(
        //       `https://ljywn.channel.io/user-chats/${responseDataUserChat.data.messages[0].chatId}?mode=newTab&translate=true`,
        //     );
        //     // location.replace(`https://ljywn.channel.io/user-chats/${idUserChat[0].id}?mode=newTab&translate=true`)
        //     // document.getElementsByTagName("svg")[0].setAttribute('display', 'none')
        //   }
        // }
      } catch (error) {
        console.log('error', error);
      }
    }
    setTimeout(() => {
      getDetailChatBot();
    }, 100);


    // 
    const channelService = new ChannelService();
    channelService.boot({
      "pluginKey": "d45e05be-644b-452e-bd07-e051299d51bd",
      "openChatDirectlyAsPossible": true, //please fill with your plugin key
      "memberId": "member001", //member001
      "memberHash": "4af89f3dc98067af39828e7c62637f946c434bd0849fc6fae21e8406ea8be071",//
      // "memberId": "member002", //member001
      // "memberHash": "05ca1aeb4265fe79efe65c802f49bd962bedd211ce27592ea3b2288698548c07",//
      "profile": {
        // "name": USER_NAME,
        // "mobileNumber": "01012345678"
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 id="header">Waiting get info user</h1>
      </main>

    </div>
  )
}
