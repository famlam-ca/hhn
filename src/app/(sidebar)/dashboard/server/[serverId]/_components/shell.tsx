"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { AttachAddon } from "@xterm/addon-attach";

const Shell = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new Terminal({
        fontFamily: "Cascade Code, monospace",
        rows: 27,
      });

      const socket = new WebSocket("ws://localhost:3000");
      const attachAddon = new AttachAddon(socket);
      term.loadAddon(attachAddon);

      term.open(terminalRef.current);
      term.focus();

      terminalInstanceRef.current = term;

      socket.addEventListener("close", () => {
        if (terminalInstanceRef.current) {
          terminalInstanceRef.current.writeln("Connection closed.");
        }
      });
    }

    return () => {
      if (terminalInstanceRef.current) {
        terminalInstanceRef.current.dispose();
      }
    };
  }, []);

  return <div ref={terminalRef} />;
};

export default Shell;
