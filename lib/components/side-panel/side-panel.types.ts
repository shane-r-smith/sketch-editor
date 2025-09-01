import type { ReactNode } from "react";
import { SidePanelToolsComponent } from "./side-panels";

export interface SidePanelComponent {
  name: string;
  icon: ReactNode;
  label?: string;
  panel: ReactNode;
}

export interface SidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  components?: SidePanelComponent[];
}

export const DefaultSidePanelComponents: SidePanelComponent[] = [
  SidePanelToolsComponent,
  // TODO: Layers
  // TODO: Pages
  // TODO: Sketch Settings
];
