"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Icon from "@/app/icon";

export default function Terminal() {
  const [blockList, setBlockList] = useState<React.ReactNode[]>([
    <Welcome />,
    <Block id={1} name="guest" locate="~/website" />,
  ]);
  const currentId: number = Math.ceil(blockList.length / 2);

  const [reset, setReset] = useState(0);

  // set theme
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // focus to the input block
  function handleClick() {
    const inputElement = document.getElementById(currentId.toString());
    if (inputElement) {
      inputElement.focus();
    }
  }

  // handle enter press
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // get input value and set readonly
      const inputEle: HTMLInputElement = document.getElementById(
        currentId.toString()
      ) as HTMLInputElement;

      if (!inputEle) return;

      inputEle.readOnly = true;
      const inputValue: string = inputEle.value;

      // handle input
      const args: string[] = inputValue.split(" ");
      let Respond: React.ReactNode;
      switch (args[0]) {
        case "cat":
          switch (args[1]) {
            case "hobby":
              Respond = <text>hobby</text>;
              break;

            case "skill":
              Respond = <text>skill</text>;
              break;

            case "project":
              Respond = <text>project</text>;
              break;

            case "contact":
              Respond = <text>contact</text>;
              break;

            case "":
              Respond = null;
              break;

            default:
              Respond = <text>{args[1]}: file not found</text>;
          }
          break;

        case "clear":
          Respond = null;
          break;

        case "goto":
          break;

        case "help":
          Respond = (
            <text>
              cat
              <br />
              clear
              <br />
              goto
              <br />
              help
              <br />
              ls
              <br />
              sudo
              <br />
              theme
              <br />
              welcome
              <br />
              whoami
            </text>
          );
          break;

        case "ls":
          Respond = <text>contact hobby project skill</text>;
          break;

        case "sudo":
          Respond = (
            <div>
              <text>Don't even think about it</text>
              <img src="groot.png" className="my-2 size-40" />
            </div>
          );
          break;

        case "theme":
          setTheme(theme === "light" ? "dark" : "light");
          Respond = <text>Theme change to {theme}</text>;
          break;

        case "welcome":
          Respond = <Welcome />;
          break;

        case "whoami":

        default:
          if (args[0]) {
            Respond = <div>{args[0]}: command not found</div>;
          } else {
            Respond = null;
          }
      }

      // append response and new block to list
      if (args[0] === "clear") {
        setReset(reset + 1);
        setBlockList([
          <Block key={reset} id={1} name="guest" locate="~/website" />,
        ]);
      } else {
        setBlockList([
          ...blockList,
          Respond,
          <Block id={currentId + 1} name="guest" locate="~/website" />,
        ]);
      }
    }
  }

  return (
    <div
      id="terminal"
      className="font-mono text-sm flex flex-col items-start m-4 px-4 flex-grow leading-6"
      onClick={handleClick}
      onKeyDown={handleEnter}
    >
      {blockList}
    </div>
  );
}

function Block(BlockProps: { id: number; name: string; locate: string }) {
  const [value, setValue] = useState<string>("");

  // auto focus
  useEffect(() => {
    const inputElement = document.getElementById(BlockProps.id.toString());
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <div className="input w-full flex flex-row gap-2">
      <text className="text-accent-400">{BlockProps.name} </text>
      <text className="text-complementary dark:text-complementaryDark">
        {BlockProps.locate + " >"}{" "}
      </text>
      <input
        className="flex-grow text-complementary dark:text-complementaryDark bg-transparent focus:outline-none"
        id={BlockProps.id.toString()}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

function Welcome() {
  return (
    <div className="my-4 flex flex-row gap-4">
      <img src="Rin_org.png" className="size-40" />
      <div className="flex flex-col items-start justify-start gap-4">
        <text>
          Oh, Hello. I am Tanimal. Welcome to this terminal website.
          <br />
          you can know (almost) everything about me here, or maybe find
          something interesting.
          <br />
          this website is built with:
        </text>
        <div className="flex flex-row gap-4">
          <Icon size="size-8" name="react" />
          <Icon size="size-8" name="nextjs" />
          <Icon size="size-8" name="tailwind" />
        </div>
        <text>
          To see all avaliable commands run:
          <text className="text-accent-400"> help</text>
        </text>
      </div>
    </div>
  );
}
