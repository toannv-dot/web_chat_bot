import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect } from "react";
import axios from "axios";
export default function Home() {
  const memberId = "member001";

  class ChannelService {
    constructor() {
      this.loadScript();
    }

    loadScript() {
      var w = window;
      if (w.ChannelIO) {
        return (window.console.error || window.console.log || function () { })(
          "ChannelIO script included twice."
        );
      }
      var ch = function () {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      window.history.forward();
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        s.charset = "UTF-8";
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      }
      if (document.readyState === "complete") {
        console.log("document.readyState === 'complete'");
        l();
      } else if (window.attachEvent) {
        console.log("window.attachEvent");
        window.attachEvent("onload", l);
      } else {
        console.log("DOMContentLoaded");
        window.addEventListener("DOMContentLoaded", l, false);
        window.addEventListener("load", l, false);
      }
    }

    boot(settings) {
      window.ChannelIO("boot", settings, async function onBoot(error, user) {
        if (error) {
          console.log({ error });
        } else {
          // console.log({ user })
          // window.ReactNativeWebView.postMessage(JSON.stringify(user));
          // window.ChannelIO('openChat', "638acaf83cb3e2626730", '');
          window.ChannelIO("openChat", settings.chatId, "");
          window?.ReactNativeWebView?.postMessage(
            JSON.stringify(settings.chatId)
          );
          // window.ChannelIO('openChat', "6390b563346c31563866", '');
          setTimeout(() => {
            document
              .getElementsByTagName("iframe")
            [
              "ch-plugin-script-iframe"
            ].contentDocument.getElementsByClassName(
              "Layoutstyled__MobileAppContent-ch-front__sc-19rvneg-3 khYvGR"
            )[0].style.borderRadius = 0;
            document
              .getElementsByTagName("iframe")
            [
              "ch-plugin-script-iframe"
            ].contentDocument.getElementsByClassName(
              "Layoutstyled__MobileAppLayout-ch-front__sc-19rvneg-2 kGtLCD"
            )[0].style.paddingTop = 0;

            document
              .getElementsByTagName("iframe")
            [
              "ch-plugin-script-iframe"
            ].contentDocument.getElementsByClassName(
              "BaseHeaderstyled__Wrapper-ch-front__sc-aselju-0 ldZhJL Layoutstyled__HeaderLayout-ch-front__sc-19rvneg-6 bkXnnX FixedHeaderstyled__FixedHeader-ch-front__sc-2bbfri-0 gDVRur"
            )[0].style.backgroundColor = "white";
            document
              .getElementsByTagName("iframe")
            [
              "ch-plugin-script-iframe"
            ].contentDocument.getElementsByClassName(
              "BaseHeaderstyled__BackButtonWrapper-ch-front__sc-aselju-1 eeIupr"
            )[0].style.visibility = "hidden";
            document
              .getElementsByTagName("iframe")
            [
              "ch-plugin-script-iframe"
            ].contentDocument.getElementsByClassName(
              "Buttonsstyled__Button-ch-front__sc-1ym1uvv-0 bHwPlI"
            )[0].style.visibility = "hidden";
            document
              .getElementsByTagName("iframe")
            [
              "ch-plugin-script-iframe"
            ].contentDocument.getElementsByClassName(
              "Buttonsstyled__Button-ch-front__sc-1ym1uvv-0 bHwPlI"
            )[1].style.visibility = "hidden";
          }, 2000);
        }
      });
    }

    shutdown() {
      window.ChannelIO("shutdown");
    }
  }

  useEffect(() => {
    const crypto = require("crypto");
    const secretKey =
      "49064200dcbda42cfd91fe14dad200752d6e2141106a13d84324dd6c85b104c2";

    //
    const channelService = new ChannelService();
    // channelService.boot({
    //   pluginKey: "d45e05be-644b-452e-bd07-e051299d51bd",
    //   openChatDirectlyAsPossible: true, //please fill with your plugin key
    //   mobileMessengerMode: "iframe",
    //   memberId: "member001", //member001
    //   memberHash:
    //     "4af89f3dc98067af39828e7c62637f946c434bd0849fc6fae21e8406ea8be071", //
    //   // "memberId": "member002", //member001
    //   // "memberHash": "05ca1aeb4265fe79efe65c802f49bd962bedd211ce27592ea3b2288698548c07",//
    //   // "memberId": "ztaz31197@gmail.com", //member001
    //   // "memberHash": "4d8f0e60d1bbe7eb77f26981cf3c5f2e814df36d9761d7f7de053ee49e186a66",//
    //   profile: {
    //     // "name": USER_NAME,
    //     // "mobileNumber": "01012345678"
    //   },
    // });
    window.addEventListener(
      "message",
      async function (event) {
        console.log("Received post message", event);
        // alert(event.data)
        await window.ReactNativeWebView.postMessage(event.data);
        let data = JSON.parse(event.data);
        if (data !== undefined && data.email !== undefined) {
          const hash = await crypto
            .createHmac("sha256", Buffer.from(secretKey, "hex"))
            .update(data.email)
            .digest("hex");
          channelService.boot({
            chatId: data.chatId,
            pluginKey: "d45e05be-644b-452e-bd07-e051299d51bd",
            openChatDirectlyAsPossible: true, //please fill with your plugin key
            mobileMessengerMode: "iframe",
            // "memberId": "member001", //member001
            // "memberHash": "4af89f3dc98067af39828e7c62637f946c434bd0849fc6fae21e8406ea8be071",//
            // "memberId": "member002", //member001
            // "memberHash": "05ca1aeb4265fe79efe65c802f49bd962bedd211ce27592ea3b2288698548c07",//
            memberId: data.email, //member001
            memberHash: hash, //
            profile: {
              // "name": data.chatId,
              // "mobileNumber": "01012345678"
            },
          });
        }
      },
      false
    );
    document.addEventListener(
      "message",
      async function (event) {
        console.log("Received post message", event);
        // alert(event.data)
        await window.ReactNativeWebView.postMessage(event.data);
        let data = JSON.parse(event.data);
        if (data !== undefined && data.email !== undefined) {
          const hash = await crypto
            .createHmac("sha256", Buffer.from(secretKey, "hex"))
            .update(data.email)
            .digest("hex");
          channelService.boot({
            chatId: data.chatId,
            pluginKey: "d45e05be-644b-452e-bd07-e051299d51bd",
            openChatDirectlyAsPossible: true, //please fill with your plugin key
            mobileMessengerMode: "iframe",
            // "memberId": "member001", //member001
            // "memberHash": "4af89f3dc98067af39828e7c62637f946c434bd0849fc6fae21e8406ea8be071",//
            // "memberId": "member002", //member001
            // "memberHash": "05ca1aeb4265fe79efe65c802f49bd962bedd211ce27592ea3b2288698548c07",//
            memberId: data.email, //member001
            memberHash: hash, //
            profile: {
              // "name": data.chatId,
              // "mobileNumber": "01012345678"
            },
          });
        }
      },
      false
    );
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 id="header">Waiting get info user...</h1> */}
      </main>
    </div>
  );
}
