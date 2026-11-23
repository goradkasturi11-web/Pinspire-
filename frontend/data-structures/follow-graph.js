export class FollowGraph {
  constructor(edges = {}) {
    this.adjacency = new Map();
    Object.entries(edges).forEach(([from, to]) => this.adjacency.set(from, new Set(to)));
  }

  addEdge(from, to) {
    if (!this.adjacency.has(from)) this.adjacency.set(from, new Set());
    this.adjacency.get(from).add(to);
  }

  removeEdge(from, to) {
    if (this.adjacency.has(from)) this.adjacency.get(from).delete(to);
  }

  removeNode(user) {
    this.adjacency.delete(user);
    this.adjacency.forEach(edges => edges.delete(user));
  }

  neighbors(from) {
    return Array.from(this.adjacency.get(from) || []);
  }

  breadthFirst(start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];
    while (queue.length) {
      const node = queue.shift();
      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          result.push(neighbor);
        }
      }
    }
    return result;
  }

  toJSON() {
    const result = {};
    this.adjacency.forEach((edges, user) => { result[user] = Array.from(edges); });
    return result;
  }
}
