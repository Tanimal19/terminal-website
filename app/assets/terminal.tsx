"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Icon from "@/app/assets/icon";

export default function Terminal() {
  const [blockList, setBlockList] = useState<React.ReactNode[]>([
    <Banner key={0} />,
    <Block key={1} id={1} name="guest" locate="~/website" />,
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
  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
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
        case "banner":
          Respond = <Banner />;
          break;

        case "cat":
          switch (args[1]) {
            case "hobby":
              Respond = <Hobby />;
              break;

            case "skill":
              Respond = <Skill />;
              break;

            case "project":
              Respond = <Project />;
              break;

            case "":
              Respond = null;
              break;

            default:
              Respond = (
                <text>
                  <span className="text-error-400">
                    {args[1]}: No such file or directory
                  </span>
                  <br />
                  maybe use <span className="text-accent-400">ls</span> to list
                  all files?
                </text>
              );
          }
          break;

        case "clear":
          Respond = null;
          break;

        case "goto":
          switch (args[1]) {
            case "portfolio":
              window.open(urlList[0], "_blank");
              Respond = <text>goto home</text>;
              break;

            case "github":
              window.open(urlList[1], "_blank");
              Respond = <text>goto github...</text>;
              break;

            case "linkedin":
              window.open(urlList[2], "_blank");
              Respond = <text>goto linkedin...</text>;
              break;

            default:
              Respond = (
                <text>
                  <span className="text-error-400">
                    {args[1]}: Invalid parameter
                  </span>
                  <br />
                  please specify valid parameter:{" "}
                  <span className="text-accent-400">
                    portfolio, github, linkedin
                  </span>
                </text>
              );
          }
          break;

        case "help":
          Respond = (
            <text>
              banner
              <br />
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
              mailme
              <br />
              sudo
              <br />
              theme
            </text>
          );
          break;

        case "ls":
          Respond = <text className="text-teal-400">hobby project skill</text>;
          break;

        case "mailme":
          window.open("mailto:poyuncheng.bob@gmail.com", "_blank");
          Respond = <text>opening mail...</text>;
          break;

        case "sudo":
          Respond = (
            <div className="my-2">
              <text className="text-error-400">
                {"Don't even think about it"}
              </text>
              <Image
                src="/groot.png"
                width={200}
                height={200}
                alt="picture of root"
              />
            </div>
          );
          break;

        case "theme":
          setTheme(theme === "light" ? "dark" : "light");
          Respond = (
            <text>change to {theme === "light" ? "dark" : "light"} theme</text>
          );
          break;

        default:
          if (args[0]) {
            Respond = (
              <text className="text-error-400">
                {args[0]}: command not found
              </text>
            );
          } else {
            Respond = null;
          }
      }

      // append response and new block to list
      if (args[0] === "clear") {
        setReset(reset - 1);
        setBlockList([
          <Block key={reset} id={1} name="guest" locate="~/website" />,
        ]);
      } else {
        setBlockList([
          ...blockList,
          Respond,
          <Block
            key={currentId + 1}
            id={currentId + 1}
            name="guest"
            locate="~/website"
          />,
        ]);
      }
    }
  }

  return (
    <div
      id="terminal"
      className="font-mono text-sm flex flex-col items-start m-4 px-4 flex-grow leading-6"
      onClick={handleClick}
      onKeyDown={handleKey}
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
  }, [BlockProps.id]);

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
        spellCheck="false"
      />
    </div>
  );
}

function Banner() {
  return (
    <div className="my-2 flex flex-row gap-4">
      <Image
        src="/pikachu.png"
        width={200}
        height={200}
        alt="picture of root"
      />
      <div className="flex flex-col items-start justify-start gap-4">
        <text>
          Oh, Hello. I am Tanimal. Welcome to this terminal website.
          <br />
          this website is built with:
        </text>
        <div className="flex flex-row gap-4">
          <Icon size="size-8" name="react" />
          <Icon size="size-8" name="nextjs" />
          <Icon size="size-8" name="tailwind" />
        </div>
        <text>
          To see all the source code go to:{" "}
          <a
            href="https://github.com/Tanimal19/terminal-website"
            className="text-accent-400 underline"
          >
            repo
          </a>
          <br />
          To see all avaliable commands run:
          <span className="text-accent-400"> help</span>
        </text>
      </div>
    </div>
  );
}

const urlList = [
  "https://www.google.com",
  "https://www.github.com",
  "https://www.linkedin.com",
];

function Hobby() {
  return (
    <div>
      <ul>
        <li>💻 coding: especially front-end</li>
        <li>🎮 video games: APEX for 2000 hrs</li>
        <li>🏀 basketball: super fan of Curry</li>
        <li>🎵 music: mainly Jpop & Kpop</li>
        <li>blah, blah, blah</li>
      </ul>
    </div>
  );
}

function Skill() {
  return (
    <div>
      <text className="text-accent-400">😉 All right</text>
      <ul>
        <li>C, Python</li>
        <li>Html, CSS, Javascript</li>
      </ul>
      <br />
      <text className="text-accent-400">🫠 Only basic</text>
      <ul>
        <li>Next.js, React, Tailwind</li>
        <li>Electron, Node.js</li>
        <li>Figma</li>
      </ul>
    </div>
  );
}

function Project() {
  return (
    <div>
      <ul>
        <li>- this terminal website!!!</li>
        <li>- Victor - markdown editor</li>
      </ul>
      <br />
      <text>
        see more run: <span className="text-accent-400">goto github</span>
      </text>
    </div>
  );
}
