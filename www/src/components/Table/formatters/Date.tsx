import React from "react";
import clsx from "clsx";
import withCustomCell, { CustomCellProps } from "./withCustomCell";

import { makeStyles, createStyles } from "@material-ui/core";
import { FieldType, DateIcon, DateTimeIcon } from "constants/fields";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "constants/dates";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

import { useFiretableContext } from "contexts/firetableContext";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "100%",
    },
    inputBase: { height: "100%" },

    inputAdornment: {
      height: "100%",
      marginLeft: theme.spacing(1) + 1,
      marginRight: theme.spacing(0.25),
    },

    input: {
      ...theme.typography.body2,
      fontSize: "0.75rem",
      color: theme.palette.text.secondary,
      height: "100%",
      padding: theme.spacing(1.5, 0),
    },
  })
);

function Date({ rowIdx, column, value, onSubmit }: CustomCellProps) {
  const classes = useStyles();
  const { setSelectedCell } = useFiretableContext();

  const transformedValue = value && "toDate" in value ? value.toDate() : null;

  const fieldType = (column as any).type;
  const Picker =
    fieldType === FieldType.date ? KeyboardDatePicker : KeyboardDateTimePicker;
  const Icon = fieldType === FieldType.date ? DateIcon : DateTimeIcon;

  const handleDateChange = (date: Date | null) => onSubmit(date);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Picker
        value={transformedValue}
        onChange={handleDateChange}
        onClick={e => {
          e.stopPropagation();
          setSelectedCell!({ row: rowIdx, column: column.key });
        }}
        format={fieldType === FieldType.date ? DATE_FORMAT : DATE_TIME_FORMAT}
        fullWidth
        keyboardIcon={<Icon />}
        className={clsx("cell-collapse-padding", classes.root)}
        InputProps={{
          disableUnderline: true,
          classes: { root: classes.inputBase, input: classes.input },
        }}
        InputAdornmentProps={{
          position: "start",
          classes: { root: classes.inputAdornment },
        }}
        KeyboardButtonProps={{
          size: "small",
          classes: { root: "row-hover-iconButton" },
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default withCustomCell(Date);