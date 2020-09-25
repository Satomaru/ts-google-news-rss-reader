import { stdio } from './stdio';
import { Topic } from './google-news';

const topic = new Topic();

const categoryList = [
  'WORLD',
  'NATION',
  'BUSINESS',
  'TECHNOLOGY',
  'ENTERTAINMENT',
  'SPORTS',
  'SCIENCE',
  'HEALTH'
];

function promptCategory(): void {
  categoryList.forEach((value: string, index: number) => console.log('%d..%s', index, value));
  process.stdout.write('\nchoose category> ');
}

function showTopicAndPrompt(): void {
  console.log(topic.describe());

  const prompt = (!topic.isEnd())
    ? `\nmore ${topic.remain} topic(s). q)uit or next when other key> `
    : '\nend of topics. quit when any key> ';

  process.stdout.write(prompt);
}

function onDataWhenDownloaded(input: string): void {
  if (input === 'q') {
    topic.reset();
    promptCategory();
  } else {
    if (topic.move(1)) {
      showTopicAndPrompt();
    } else {
      promptCategory();
    }
  }
}

function onDataWhenNotDownloaded(input: string): void {
  const index = parseInt(input);

  if (index >= 0 && index < categoryList.length) {
    topic.download(categoryList[index])
      .then(() => showTopicAndPrompt())
      .catch((error: any) => console.error(error));
  } else {
    promptCategory();
  }
}

promptCategory();

stdio.listenStdin((input: string) => {
  console.log();

  if (topic.isDownloaded()) {
    onDataWhenDownloaded(input);
  } else {
    onDataWhenNotDownloaded(input);
  }
})
