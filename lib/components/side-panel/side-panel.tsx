import { useMemo, useState } from "react";
import {
  type SidePanelComponent,
  type SidePanelProps,
  DefaultSidePanelComponents,
} from "./side-panel.types";
import { Box, ClickAwayListener, IconButton, Stack } from "@mui/material";

import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";

export function SidePanel({ components, ...rest }: SidePanelProps) {
  const [pinned, setPinned] = useState<boolean>(true);
  const [active, setActive] = useState<string | undefined>();

  const sidePanelComponents = useMemo<SidePanelComponent[]>(() => {
    if (!components) {
      return DefaultSidePanelComponents;
    }

    return components;
  }, [components]);

  const panel = useMemo(() => {
    if (!active) {
      return null;
    }

    // Find the matching panel
    const foundPanel = sidePanelComponents.find((x) => x.name === active);

    if (!foundPanel) {
      return null;
    }

    return foundPanel.panel;
  }, [active, sidePanelComponents]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (pinned) {
          return;
        }

        setActive(undefined);
      }}
    >
      <Stack
        height="100%"
        width="auto"
        sx={{
          bgcolor: "primary.main",
        }}
        className="side-panel"
        flexDirection={"row"}
        {...rest}
      >
        <Stack height="100%" position={"relative"}>
          {sidePanelComponents.map(({ name, icon, label }) => {
            const selected = active === name;

            return (
              <Stack
                key={`side-panel-${name}`}
                width={"100%"}
                height={"3.5rem"}
                padding={"0.5rem"}
                justifyContent={"center"}
                alignItems={"center"}
                boxSizing={"border-box"}
                sx={[
                  {
                    cursor: "pointer",
                    color: "primary.contrastText",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    userSelect: "none",
                  },
                  selected && { bgcolor: "primary.dark" },
                ]}
                onClick={() => {
                  if (selected) {
                    // Close panel if user clicks on already active tab
                    setActive(undefined);
                    return;
                  }

                  setActive(name);
                }}
                title={name}
              >
                {icon}
                {label ? label : name}
              </Stack>
            );
          })}
        </Stack>
        <Box
          height={"100%"}
          position={"relative"}
          width={panel ? "24rem" : 0}
          sx={[
            {
              backgroundColor: "white",
              transitionProperty: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "200ms",
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            },
          ]}
        >
          {panel && (
            <Stack
              direction={"row"}
              sx={{
                position: "absolute",
                top: "0.25rem",
                right: "0.25rem",
              }}
            >
              <IconButton
                aria-label="close"
                onClick={() => {
                  setPinned((pre) => !pre);
                }}
                color={pinned ? "primary" : "default"}
              >
                <PushPinTwoToneIcon />
              </IconButton>
              <IconButton
                aria-label="close"
                onClick={() => {
                  setActive(undefined);
                }}
              >
                <CloseTwoToneIcon />
              </IconButton>
            </Stack>
          )}
          {panel}
        </Box>
      </Stack>
    </ClickAwayListener>
  );
}
