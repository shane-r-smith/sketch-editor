import Stack from "@mui/material/Stack";
import type { PropsWithChildren } from "react";

export function SketchEditor({
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
      maxWidth="100vw"
      maxHeight="100vw"
      {...rest}
    >
      <Stack
        flex={1}
        flexDirection="column"
        position="relative"
        overflow="hidden"
        width="100%"
        height="100%"
      >
        {children}
      </Stack>
    </Stack>
  );
}
