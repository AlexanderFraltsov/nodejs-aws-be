const DELAY = 2 * 60 * 1000;

class Cache {
  constructor(cache) {
    this.cache = cache;
  }

  showDate(ms) {
    return new Date(ms).toUTCString();
  }

  set(response) {
    const time = Date.now();
    this.cache = { time, response };
    console.log('cache saved: ', this.showDate(time));
  }

  get() {
    const actualTime = Date.now();
    console.log('actualTime', this.showDate(actualTime));
    const { time, response } = this.cache;
    if (time) {
      console.log('expire time', this.showDate(time + DELAY));
    }
    if (!time || !response || time + DELAY < actualTime) {
      this.cache = {};
      return;
    }
    return response;
  }
}

const cache = new Cache({});

module.exports = cache;
