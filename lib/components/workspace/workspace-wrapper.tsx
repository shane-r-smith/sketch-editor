import Stack from "@mui/material/Stack";
import type { PropsWithChildren } from "react";

export function WorkspaceWrapper({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
  return (
    <Stack
      flex={1}
      position="relative"
      overflow="hidden"
      width="100%"
      height="100%"
      className="workspace-wrapper"
      {...rest}
    >
      {children}
    </Stack>
  );
}
