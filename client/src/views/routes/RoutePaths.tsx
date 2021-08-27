import ContractsView from "../contracts/ContractsView";
import GalleryView from "../gallery/GalleryView";
import Main from "../MainApp";

export const routePaths: { [path: string]: RoutePath } = {
  "home": { name: "Home", path: "/", container: Main, isExact: true },
  "gallery": { name: "Gallery", path: "/gallery", container: GalleryView, isExact: false },
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
