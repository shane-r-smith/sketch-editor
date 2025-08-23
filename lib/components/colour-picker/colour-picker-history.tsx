import type { FunctionComponent } from "react";
import type { ColourPickerHistoryProps } from "./colour-picker.types";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const ColourPickerHistory: FunctionComponent<
  ColourPickerHistoryProps
> = ({ history, numHistoryToShow, onColourSelected }) => {
  const unique = Array.from(new Set(history));
  const historyItemsToShow =
    unique.length < numHistoryToShow
      ? [...unique, ...Array(numHistoryToShow - unique.length).fill(undefined)]
      : unique.slice(0, numHistoryToShow);

  return (
    <Grid container spacing={1}>
      {historyItemsToShow.map((colour, i) => {
        return (
          <Box
            key={`${colour}-colour-history-${i}`}
            sx={[
              {
                width: "1.75rem",
                height: "1.75rem",
                borderRadius: "0.25rem",
                backgroundColor: "grey.50",
              },
              colour && {
                cursor: "pointer",
                backgroundColor: colour,
                "&:hover": {
                  outlineWidth: 2,
                  outlineStyle: "solid",
                  outlineColor: "primary.main",
                },
              },
            ]}
            onClick={() => {
              if (!colour) {
                return;
              }

              onColourSelected(colour);
            }}
          />
        );
      })}
    </Grid>
  );
};

export default ColourPickerHistory;
