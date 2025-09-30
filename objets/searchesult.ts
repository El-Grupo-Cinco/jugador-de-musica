export class SoundSearchResult {
  id: string;
  name: string;
  tags: string[];
  license: string;
  username: string;

  constructor(
    id: string,
    name: string,
    tags: string[],
    license: string,
    username: string
  ) {
    this.id = id;
    this.name = name;
    this.tags = tags;
    this.license = license;
    this.username = username;
  }
}
