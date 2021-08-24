import ContractsView from "../contracts/Contracts";
import Gallery from "../gallery/Gallery";
import Main from "../MainApp";

export const routePaths: { [path: string]: RoutePath } = {
  "home": { name: "Home", path: "/", container: Main, isExact: true },
  "gallery": { name: "Gallery", path: "/gallery", container: Gallery, isExact: false },
  "contracts": { name: "Contracts", path: "/contracts", container: ContractsView, isExact: true },
};

export const defaultRouteKey = "home";

export type RoutePath = {
  name: string;
  path: string;
  container: React.ComponentType<any>;
  isExact?: boolean;
  onSideMenu?: boolean;
};
