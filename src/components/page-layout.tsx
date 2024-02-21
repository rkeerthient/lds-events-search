import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";

type Props = {
  _site?: Site;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      <div className="py-8">
        <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
          {children}
        </SearchHeadlessProvider>{" "}
      </div>

      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
