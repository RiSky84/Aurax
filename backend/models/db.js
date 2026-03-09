const users = new Map();
const conversations = new Map();
const moodEntries = new Map();

let userIdCounter = 1;
let conversationIdCounter = 1;
let moodEntryIdCounter = 1;

class User {
  constructor(username, email, password, fullName) {
    this._id = String(userIdCounter++);
    this.username = username;
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.avatar = null;
    this.region = 'US';
    this.language = 'en';
    this.createdAt = new Date();
    this.lastLogin = null;
    this.isActive = true;
  }

  async comparePassword(plainPassword) {
    return this.password === plainPassword;
  }
}

class Conversation {
  constructor(userId) {
    this._id = String(conversationIdCounter++);
    this.userId = userId;
    this.messages = [];
    this.startedAt = new Date();
    this.endedAt = null;
    this.isCrisisSession = false;
    this.crisisAlert = null;
    this.suggestedStrategies = [];
    this.session_summary = null;
  }
}

class MoodEntry {
  constructor(userId, moodScore, emotion, activities, notes, triggers, copingStrategies, sleepQuality, physicalActivity, mealTimes) {
    this._id = String(moodEntryIdCounter++);
    this.userId = userId;
    this.date = new Date();
    this.moodScore = moodScore;
    this.emotion = emotion;
    this.activities = activities;
    this.notes = notes;
    this.triggers = triggers;
    this.copingStrategiesUsed = copingStrategies;
    this.sleepQuality = sleepQuality;
    this.physicalActivity = physicalActivity;
    this.mealTimes = mealTimes;
  }
}

const db = {
  User: {
    findOne: async (query) => {
      for (const user of users.values()) {
        if (query.$or) {
          for (const condition of query.$or) {
            if (condition.email === user.email || condition.username === user.username) {
              return user;
            }
          }
        } else if (query.email === user.email) {
          return user;
        } else if (query.username === user.username) {
          return user;
        }
      }
      return null;
    },
    create: async (data) => {
      const user = new User(data.username, data.email, data.password, data.fullName);
      users.set(user._id, user);
      return user;
    },
    findById: async (id) => {
      return users.get(String(id)) || null;
    }
  },
  
  Conversation: {
    find: async (query) => {
      const results = [];
      for (const conv of conversations.values()) {
        let matches = true;
        if (query.userId && conv.userId !== query.userId) matches = false;
        if (query.isCrisisSession && conv.isCrisisSession !== query.isCrisisSession) matches = false;
        if (query.startedAt && query.startedAt.$gte) {
          if (conv.startedAt < new Date(query.startedAt.$gte)) matches = false;
        }
        if (matches) results.push(conv);
      }
      return results.sort((a, b) => b.startedAt - a.startedAt);
    },
    create: async (data) => {
      const conv = new Conversation(data.userId);
      conversations.set(conv._id, conv);
      return conv;
    },
    findById: async (id) => {
      return conversations.get(String(id)) || null;
    },
    updateById: async (id, data) => {
      const conv = conversations.get(String(id));
      if (conv) {
        Object.assign(conv, data);
      }
      return conv;
    }
  },

  MoodEntry: {
    find: async (query) => {
      const results = [];
      for (const entry of moodEntries.values()) {
        let matches = true;
        if (query.userId && entry.userId !== query.userId) matches = false;
        if (query.date && query.date.$gte) {
          if (entry.date < new Date(query.date.$gte)) matches = false;
        }
        if (matches) results.push(entry);
      }
      return results.sort((a, b) => b.date - a.date);
    },
    create: async (data) => {
      const entry = new MoodEntry(
        data.userId,
        data.moodScore,
        data.emotion,
        data.activities,
        data.notes,
        data.triggers,
        data.copingStrategiesUsed,
        data.sleepQuality,
        data.physicalActivity,
        data.mealTimes
      );
      moodEntries.set(entry._id, entry);
      return entry;
    }
  }
};

module.exports = { db };
