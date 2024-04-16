"use client";

import React, { useState, useEffect } from "react";
import Command from "@/app/command";

export default function Terminal() {
  const [blockList, setBlockList] = useState<React.ReactNode[]>([
    <Block id={1} name="guest" locate="~/website/home" />,
  ]);
  const currentId = blockList.length;

  // focus to the input block
  function handleClick() {
    const inputElement = document.getElementById(currentId.toString());
    if (inputElement) {
      inputElement.focus();
    }
  }

  // append new block on enter
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setBlockList([
        ...blockList,
        <Block id={currentId + 1} name="guest" locate="~/website/home" />,
      ]);
    }
  }

  return (
    <div
      id="terminal"
      className="font-mono text-sm flex flex-col items-start m-4 px-4 flex-grow"
      onClick={handleClick}
      onKeyDown={handleEnter}
    >
      {blockList}
    </div>
  );
}

function Block(BlockProps: { id: number; name: string; locate: string }) {
  const [readonly, setReadonly] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [respond, setRespond] = useState<React.ReactNode>();

  // get command input
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setReadonly(true);
      setRespond(<Respond value={value} />);
    }
  }

  // auto focus
  useEffect(() => {
    const inputElement = document.getElementById(BlockProps.id.toString());
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <div className="w-full leading-6">
      <div className="w-full flex flex-row gap-2">
        <text className="text-accent-300">{BlockProps.name} </text>
        <text className="text-accent2-300">{BlockProps.locate} </text>
        <text className="text-complementary">{">"} </text>
        <input
          className="flex-grow text-complementary bg-transparent focus:outline-none"
          readOnly={readonly}
          id={BlockProps.id.toString()}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleEnter}
          autoComplete="off"
        />
      </div>
      {respond}
    </div>
  );
}

// handle command
function Respond(RespondProps: { value: string }) {
  switch (RespondProps.value) {
    case "help":
      return <Command.Help />;
    default:
      if (RespondProps.value) {
        return <div>{RespondProps.value}: command not found</div>;
      } else {
        return null;
      }
  }
}
