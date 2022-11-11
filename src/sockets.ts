import Rete from "rete";

export const numSocket = new Rete.Socket("Number value");
export const textSocket = new Rete.Socket("Text value");
export const exceptionSocket = new Rete.Socket("Exception");
export const astSocket = new Rete.Socket("AST");

export const anythingSocket = new Rete.Socket("Anything");
exceptionSocket.combineWith(anythingSocket);
astSocket.combineWith(anythingSocket);