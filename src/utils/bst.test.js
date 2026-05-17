import { describe, expect, it } from "vitest";

import { createNode, getHeight, inOrder, insert, postOrder, preOrder, search } from "./bst";

describe("insert", () => {
  it("should place smaller values on the left", () => {
    let root = null;
    root = insert(root, 10);
    root = insert(root, 5);

    expect(root.left?.value).toBe(5);
  });

  it("should place larger values on the right", () => {
    let root = null;
    root = insert(root, 10);
    root = insert(root, 5);
    root = insert(root, 15);

    expect(root.left?.value).toBe(5);
    expect(root.right?.value).toBe(15);
  });

  it("should ignore duplicate values", () => {
    let root = null;
    root = insert(root, 10);
    root = insert(root, 10);

    expect(root.value).toBe(10);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });
});

describe("search", () => {
  it("should return null for non-existent values using strict equality", () => {
    const root = {
      value: 10,
      left: createNode(5),
      right: createNode(15),
    };

    expect(search(root, "5")).toBeNull();
  });

  it("should find existing value", () => {
    const root = {
      value: 10,
      left: createNode(5),
      right: createNode(15),
    };

    expect(search(root, 5)?.value).toBe(5);
  });

  it("should return null for value not in tree", () => {
    const root = {
      value: 10,
      left: createNode(5),
      right: createNode(15),
    };

    expect(search(root, 99)).toBeNull();
  });
});

describe("inOrder", () => {
  it("should return empty array for null node", () => {
    expect(inOrder(null)).toEqual([]);
  });

  it("should return single value for single node tree", () => {
    const root = createNode(42);
    expect(inOrder(root)).toEqual([42]);
  });

  it("should return values in ascending order for valid BST", () => {
    const root = {
      value: 10,
      left: { value: 5, left: createNode(3), right: createNode(7) },
      right: { value: 15, left: createNode(12), right: createNode(20) },
    };

    expect(inOrder(root)).toEqual([3, 5, 7, 10, 12, 15, 20]);
  });

  it("should handle tree with only left children", () => {
    const root = { value: 3, left: { value: 2, left: createNode(1), right: null }, right: null };

    expect(inOrder(root)).toEqual([1, 2, 3]);
  });

  it("should handle tree with only right children", () => {
    const root = { value: 1, left: null, right: { value: 2, left: null, right: createNode(3) } };

    expect(inOrder(root)).toEqual([1, 2, 3]);
  });
});

describe("preOrder", () => {
  it("should return empty array for null node", () => {
    expect(preOrder(null)).toEqual([]);
  });

  it("should return single value for single node tree", () => {
    const root = createNode(42);
    expect(preOrder(root)).toEqual([42]);
  });

  it("should visit root before children", () => {
    const root = {
      value: 10,
      left: { value: 5, left: createNode(3), right: createNode(7) },
      right: { value: 15, left: createNode(12), right: createNode(20) },
    };

    expect(preOrder(root)).toEqual([10, 5, 3, 7, 15, 12, 20]);
  });

  it("should handle tree with only left children", () => {
    const root = { value: 3, left: { value: 2, left: createNode(1), right: null }, right: null };

    expect(preOrder(root)).toEqual([3, 2, 1]);
  });

  it("should handle tree with only right children", () => {
    const root = { value: 1, left: null, right: { value: 2, left: null, right: createNode(3) } };

    expect(preOrder(root)).toEqual([1, 2, 3]);
  });
});

describe("postOrder", () => {
  it("should return empty array for null node", () => {
    expect(postOrder(null)).toEqual([]);
  });

  it("should return single value for single node tree", () => {
    const root = createNode(42);
    expect(postOrder(root)).toEqual([42]);
  });

  it("should visit root after children", () => {
    const root = {
      value: 10,
      left: { value: 5, left: createNode(3), right: createNode(7) },
      right: { value: 15, left: createNode(12), right: createNode(20) },
    };

    expect(postOrder(root)).toEqual([3, 7, 5, 12, 20, 15, 10]);
  });

  it("should handle tree with only left children", () => {
    const root = { value: 3, left: { value: 2, left: createNode(1), right: null }, right: null };

    expect(postOrder(root)).toEqual([1, 2, 3]);
  });

  it("should handle tree with only right children", () => {
    const root = { value: 1, left: null, right: { value: 2, left: null, right: createNode(3) } };

    expect(postOrder(root)).toEqual([3, 2, 1]);
  });
});

describe("getHeight", () => {
  it("should return 0 for null node (empty tree)", () => {
    expect(getHeight(null)).toBe(0);
  });

  it("should return 1 for single node tree", () => {
    const root = createNode(10);
    expect(getHeight(root)).toBe(1);
  });

  it("should return correct height for balanced tree", () => {
    const root = {
      value: 10,
      left: { value: 5, left: createNode(3), right: createNode(7) },
      right: { value: 15, left: createNode(12), right: createNode(20) },
    };

    expect(getHeight(root)).toBe(3);
  });

  it("should return correct height for unbalanced tree (left-skewed)", () => {
    const root = {
      value: 10,
      left: {
        value: 5,
        left: {
          value: 3,
          left: createNode(1),
          right: null,
        },
        right: null,
      },
      right: null,
    };

    expect(getHeight(root)).toBe(4);
  });

  it("should return correct height for unbalanced tree (right-skewed)", () => {
    const root = {
      value: 1,
      left: null,
      right: {
        value: 2,
        left: null,
        right: {
          value: 3,
          left: null,
          right: createNode(4),
        },
      },
    };

    expect(getHeight(root)).toBe(4);
  });

  it("should return correct height for tree with mixed depths", () => {
    const root = {
      value: 10,
      left: createNode(5),
      right: {
        value: 15,
        left: createNode(12),
        right: {
          value: 20,
          left: null,
          right: createNode(25),
        },
      },
    };

    expect(getHeight(root)).toBe(4);
  });
});