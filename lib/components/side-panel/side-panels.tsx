import type { SidePanelComponent } from "./side-panel.types";
import { SelectedToolsIcon, ToolsPanel } from "./tools";

export const SidePanelToolsComponent: SidePanelComponent = {
  name: "Tools",
  icon: <SelectedToolsIcon />,
  label: "Tools",
  panel: <ToolsPanel />,
};
