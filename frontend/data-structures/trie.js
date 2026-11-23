class TrieNode {
  constructor() {
    this.children = new Map();
    this.words = new Set();
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
    this.words = new Set();
  }

  insert(word) {
    const normalized = word.trim().toLowerCase();
    if (normalized.length < 2 || this.words.has(normalized)) return;
    this.words.add(normalized);
    this.size += 1;

    let node = this.root;
    for (const char of normalized) {
      if (!node.children.has(char)) node.children.set(char, new TrieNode());
      node = node.children.get(char);
      node.words.add(normalized);
    }
  }

  search(prefix, limit = 7) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      node = node.children.get(char);
      if (!node) return [];
    }
    return Array.from(node.words).slice(0, limit);
  }
}
