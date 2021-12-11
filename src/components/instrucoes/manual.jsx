import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import texto from './manual.md'

//função que lê o manual e o retorna como componente, utilizando o react-markdown

export default function Manual() {
  const [teste, setTeste] = useState('');

  fetch(texto).then((response) => response.text()).then((text) => { setTeste(text) })

  return (
    <ReactMarkdown>{teste}</ReactMarkdown>
  )
}