/** @format */

import { cn } from "@/utils/cn";
import { Button, Input } from "@mui/material";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-10 ",
        props.className
      )}
    >
      <Input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location.."
      />
      <Button variant="outlined" className="h-full" type="submit">
        <IoSearch />
      </Button>
    </form>
  );
}
