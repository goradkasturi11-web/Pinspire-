export class MaxHeap {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
    let index = this.items.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.items[parent].score >= item.score) break;
      this.items[index] = this.items[parent];
      index = parent;
    }
    this.items[index] = item;
  }

  pop() {
    if (!this.items.length) return null;
    const top = this.items[0];
    const last = this.items.pop();
    if (this.items.length) {
      let index = 0;
      while (true) {
        const left = index * 2 + 1;
        const right = left + 1;
        let largest = index;
        if (left < this.items.length && this.items[left].score > this.items[largest].score) largest = left;
        if (right < this.items.length && this.items[right].score > this.items[largest].score) largest = right;
        if (largest === index) break;
        this.items[index] = this.items[largest];
        index = largest;
      }
      this.items[index] = last;
    }
    return top;
  }
}
