/**
 * Lays out the contract of the hash map.
 * There will be a counter store since we could have
 * an arbitrary number of news coming in.
 * The counter will be stored under News:${source}:COUNTER.
 * Data will be stored as News:${source} ${KEY}
 * Counter starts with 0.
 */
const NewsContract = {
  /**
   * Author of the article.
   */
  AUTHOR: "author",
  /**
   * Title of the article.
   */
  TITLE: "title",
  /**
   * Article synopsis.
   */
  DESC: "description",
  /**
   * URL to the article.
   */
  URL: "url",
  /**
   * URL of the article image.
   */
  URL_TO_IMG: "urlToImage",
  /**
   * Publish date of the article.
   */
  PUBLISH_DATE: "publishedAt",
  /**
   * The counter kept in Redis
   */
  COUNTER: "COUNTER",
  /**
   * News source list
   */
  SOURCES: "SOURCES"
}

module.exports = NewsContract;
