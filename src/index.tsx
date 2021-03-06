import React from "react";

/**
 * Test One: Find an ID in a simple tree
 * 
 * Given a tree of items with the interface `TreeNode` above,
 * Implement a method which returns the ID of the first node where `values`
 * in the node matches `value` passed into the method
 * 

Example tree:

const items = [
  {id: 1, values: [100, 101], children: [
    {id: 10, values: [1000, 1001]}
  ]},
  {id: 2, values: [200, 201]},
  {id: 3, values: [300, 301], children: [
    {id: 11, values: [1100, 1101]},
    {id: 9, values: [900, 901]},
    {id: 8, values: [800, 801], children: [
      {id: 7, values: [700, 701]},
      {id: 6, values: [600, 601]}
    ]}
  ]}
]

findIdInTreeByValue(items, 601) // => 6

 * See `index.spec.tsx` for basic test cases
 */

export interface TreeNode {
  id: number;
  values: number[];
  children?: TreeNode[];
}

export function findIdInTreeByValue(
  items: TreeNode[],
  value: number
): number | undefined {
  // ASSUME: returns first found value
  let todo = [...items];

  while (todo.length > 0) {
    const firstNode = todo.pop();

    if (firstNode["values"].includes(value)) {
      return firstNode["id"];
    } else {
      todo = firstNode.hasOwnProperty("children")
        ? [...todo, ...firstNode["children"]]
        : todo;
    }
  }

  // could not find
  return undefined;
}

/**
 * Test Two: Consecutive numbers in an array
 * Given an array of unsorted numbers, find the longest sequence
 * of consective numbers in the array

Examples:

consecutiveNumbersLength([8, 4, 2, 1, 6, 5]) // => 3 (4,5,6)
consecutiveNumbersLength([5, 5, 3, 1]) // => 1

 * See `index.spec.tsx` for basic test cases
 */

export function consecutive(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  const sortedNumbers = numbers.sort();

  let currConseq = 1;
  let longConseq = 1;
  let [prevNum, ...restNums] = sortedNumbers;

  restNums.forEach((num) => {
    if (prevNum === num) {
      // do nothing
    } else if (prevNum + 1 === num) {
      currConseq += 1;
    } else {
      longConseq = Math.max(longConseq, currConseq);
      currConseq = 1;
    }

    prevNum = num;
  });

  return Math.max(longConseq, currConseq);
}

/**
 * Test Three: Highlight a text match
 * Implement a method which highlights the portion of text which matches
 * a given substring (case-insensitive) by returning a ReactNode that
 * wraps the matches in <strong> tags
 * 

Example:
highlightMatch('Micheal Rosen', 'ros') =>

As JSX
<>
  Micheal <strong>Ros</strong>en
</>

As an array of JSX
[
  <React.Fragment key={0}>Micheal </React.Fragment>,
  <strong key={1}>Ros</strong>,
  <React.Fragment key={2}>en</React.Fragment>
]

 * See `index.spec.tsx` for test cases
 */

export function highlightMatch(
  text: string,
  matchString: string
): React.ReactNode {
  const pattern = new RegExp(matchString, "gi");
  const replaceFunc = (str) => `$SPLIT${str}$SPLIT`;
  const matchedText = text.replaceAll(pattern, replaceFunc);

  const arr = matchedText.split("$SPLIT").filter((str) => str !== "");

  return arr.map((str, index) =>
    str.toLowerCase() === matchString.toLowerCase() ? (
      <strong key={index}>{str}</strong>
    ) : (
      <React.Fragment key={index}>{str}</React.Fragment>
    )
  );
}
