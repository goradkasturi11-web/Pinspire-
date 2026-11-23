class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    values.forEach(value => this.append(value));
  }

  append(value) {
    const node = new ListNode(value);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length += 1;
  }

  remove(value) {
    let previous = null;
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (previous) previous.next = current.next;
        else this.head = current.next;
        if (this.tail === current) this.tail = previous;
        this.length -= 1;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }

  has(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  toArray() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}
