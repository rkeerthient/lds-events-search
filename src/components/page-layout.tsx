import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import {
  HeadlessConfig,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";
import { useState } from "react";
import { ChatHeadlessProvider, ChatConfig } from "@yext/chat-headless-react";
import "@yext/chat-ui-react/bundle.css";
import { ChatPopUp } from "@yext/chat-ui-react";
type Props = {
  _site?: Site;
  children?: React.ReactNode;
};
// const chatConfig: ChatConfig = {
//   apiKey: import.meta.env.YEXT_PUBLIC_CHAT_APIKEY,
//   botId: import.meta.env.YEXT_PUBLIC_CHAT_BOTID,
// };
const PageLayout = ({ _site, children }: Props) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      <div className="py-8">
        <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
          {children}
        </SearchHeadlessProvider>
      </div>
      <Footer _site={_site}></Footer>
      {/* <ChatHeadlessProvider config={chatConfig}>
        <ChatPopUp
          title="LDS Chat"
          stream={false}
          customCssClasses={{
            buttonIcon: "text-white",
            button: "!bg-none !bg-[#027da5]",
            panelCssClasses: {
              messageBubbleCssClasses: {
                message: "text-base",
                message__user: "!bg-none !bg-[#027da5]",
                bubble__user: "!bg-none !bg-[#027da5]",
              },

              inputCssClasses: {
                sendButton: "!bg-none !bg-[#027da5]",
                textArea:
                  "border border-gray-300 focus:ring-sky-500 focus:border-sky-500 text-base",
              },
            },
            headerCssClasses: {
              container: "!bg-none !bg-[#027da5]",
              title: "overflow-hidden",
            },
          }}
        />
      </ChatHeadlessProvider> */}
    </div>
  );
};

export default PageLayout;
