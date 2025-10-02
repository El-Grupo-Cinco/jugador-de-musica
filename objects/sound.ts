export class Sound {
  id: string;
  url: string;
  name: string;
  tags: Array<String>;
  description: string;
  category: string;
  duration: number;
  created: string;
  username: string;
  spectrogram: object;

  constructor(
    id: string,
    url: string,
    name: string,
    tags: Array<String>,
    description: string,
    category: string,
    duration: number,
    created: string,
    username: string,
    spectrogram: object
  ) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.tags = tags;
    this.description = description;
    this.category = category;
    this.duration = duration;
    this.created = created;
    this.username = username;
    this.spectrogram = spectrogram;
  }
}
