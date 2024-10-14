export interface SignalLike<T> {
  peek(id: string): T;
  subscribe(fn: (value: T) => void, id: string): () => void;
}
