'use client';

import React from 'react';
import commonStyles from '../../common-page.module.css';
import fizzbuzzStyles from './fizzbuzz.module.css';
import { useState, useEffect, useRef, MutableRefObject } from 'react';

export default function Fizzbuzz() {
  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>Fizzbuzz</h1>
      <div className={commonStyles.pageContent}>
        <FizzbuzzUI />
      </div>
    </div>
  );
}

const fizzbuzzOutputs = ['number', 'fizz', 'buzz', 'fizzbuzz'] as const;
type FizzbuzzOutput = (typeof fizzbuzzOutputs)[number];

const keyToActionMap = {
  'a': 'number',
  's': 'fizz',
  'd': 'buzz',
  'f': 'fizzbuzz',
} as const;

function FizzbuzzUI() {
  const [number, setNumber] = useState(1);
  const [isCorrect, setIsCorrect] = useState(true);
  const [count, setCount] = useState(2);
  
  const handleChange = (input: FizzbuzzOutput) => {
    const expected = getExpectedOutput(number);
    const isCorrect = input === expected;
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setNumber(number + 1);
      setCount(2);
    }
  };

  const reset = () => {
    setNumber(1);
    setIsCorrect(true);
    setCount(2);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.toLowerCase() === 'r') {
        reset();
        return;
      }

      const inputKey = e.key.toLowerCase();
      if (!((['a', 's', 'd', 'f']).includes(inputKey))) return;
      const action = keyToActionMap[inputKey as keyof typeof keyToActionMap];
      if (isCorrect) {
        handleChange(action);
      }
    };


    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  
  useEffect(() => {
    if (number === 1) return;
    if (!isCorrect) return;
    if (count <= 0) {
      setCount(0);
      return;
    }
    const timer = setTimeout(() => {
    setCount(count - 0.01);
    }, 10);
    return () => clearTimeout(timer);
  }, [count, isCorrect, number]);

  const isTimeUp = count <= 0;


  const content = (() => {
    if (isCorrect && !isTimeUp) {
      return (
        <div>
          <button onClick={() => handleChange('number')} className={fizzbuzzStyles.button} key='number'>{number} (A)</button>
          <button onClick={() => handleChange('fizz')} className={fizzbuzzStyles.button} key='fizz'>Fizz (S)</button>
          <button onClick={() => handleChange('buzz')} className={fizzbuzzStyles.button} key='buzz'>Buzz (D)</button>
          <button onClick={() => handleChange('fizzbuzz')} className={fizzbuzzStyles.button} key='fizzbuzz'>FizzBuzz (F)</button>

        </div>
      );
    } else {
      return (
        <div>
          <p>残念！記録: {number - 1}</p>
          <button onClick={() => reset()} className={fizzbuzzStyles.button}>Reset (R)</button>
        </div>
      );
    }
  })();

  return (
    <div>
      遊び方: Currentが15の倍数ならFizzBuzz、3の倍数ならFizz、5の倍数ならBuzz、それ以外は数字を押してください。
      失敗するとゲームオーバーです。ASDFキーで選択、Rキーでリセットできます。
      <br />
      <h2>Current: {number}, Time: {count.toFixed(2)}</h2>
      <div>{content}</div>
    </div>
  )
  
}

function getExpectedOutput(num: number): FizzbuzzOutput {
  if (num % 15 === 0) return 'fizzbuzz';
  if (num % 3 === 0) return 'fizz';
  if (num % 5 === 0) return 'buzz';
  return 'number';
}