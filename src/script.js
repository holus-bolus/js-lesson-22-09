const createUser = (name, lastName) => {
  return {
    name,
    lastName,
    getFullName() {
      return `${this.name} ${this.lastName}`;
    },
  };
};

const oleksii = createUser('Oleksii', 'Ustinov');

//Створимо функцію конструктор. Конструктори називаються з великої літери

/**
 *
 * @param {string} name
 * @param {string} lastName
 * @constructor
 * @property {string} name
 * @property {string} lastName
 * @property {Channel[]} channels
 * @property {Channel[]} subscriptions
 * @property {function} subscribe
 */

function User(name, lastName) {
  this.name = name;
  this.lastName = lastName;
  this.channels = [];
  this.subscriptions = [];
  /**
   * @param {Channel} channel
   */
  this.subscribe = function (channel) {
    if (!(channel instanceof Channel)) throw new Error('Something went wrong');
    channel.subscribers.push(this);
    this.subscriptions.push(channel);
  };
  /**
   *
   * @param {Video} video
   * @param{string} text
   */
  this.comment = function (video, text) {
    video.comments.push({
      user: this,
      text,
    });
  };
}

//console.log(user.getFullName());
//Check an object if this object is instance of smth
const newObject = {};
// console.log(newObject instanceof Object);
//console.log(user instanceof User);
function Developer() {
  this.goCode = () => {
    throw new Error();
  };
}

const dev = new Developer();

// console.log(dev instanceof Developer);
/**
 * @param {string} name
 * @param {User} author
 * @constructor
 * @property {string} name
 * @property {User} author
 * @property {User[]} subscribers
 *@property {Video[]} videos
 */
function Channel(name, author) {
  this.name = name;
  this.author = author;
  this.subscribers = [];
  this.videos = [];
  author.channels.push(this);
  this.banUser = function (user) {
    if (!(user instanceof User)) throw new Error('There is no such user');
    this.videos.forEach((video) => {
      video.comments = video.comments.filter((comment) => {
        return comment.user !== user;
      });
    });
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== user
    );
    user.subscriptions = user.subscriptions.filter(
      (subscription) => subscription !== this
    );
  };
}

/**
 *
 * @param {string} name
 * @param {Channel} channel
 * @constructor
 * @property {string} name
 * @property {Channel} channel
 * @property{{user: User, text: string}[]} comments
 */
function Video(name, channel) {
  this.name = name;
  this.channel = channel;
  channel.videos.push(this);
  this.comments = [];
}

const holusbolus = new User('holus-', 'bolus');
const development = new Channel('Development', holusbolus);
const comedies = new Channel('Comedies and death', holusbolus);
const oleksiiUstinov = new User('oleksii', 'ustinov');
const justAFan = new User('Freddie', 'Kruger');
oleksiiUstinov.subscribe(development);
oleksiiUstinov.subscribe(comedies);
const howTo = new Video('How to create a website', development);
new Video('How to add an image to a website', development);
new Video('How to make a website responsive', development);
const firstStandUp = new Video('How I create a standup', comedies);
const escape = new Video('How I escaped from a bear', comedies);
oleksiiUstinov.comment(firstStandUp, 'This is bullshit');
justAFan.comment(firstStandUp, 'It was great');
oleksiiUstinov.comment(escape, 'What a douche');
comedies.banUser(oleksiiUstinov);
