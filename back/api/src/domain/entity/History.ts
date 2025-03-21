export default class History {
  query: string;
  timestamp: Date;

  static create(query: string): History {
    return {
      query,
      timestamp: new Date(),
    };
  }
}
