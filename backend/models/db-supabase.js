// Supabase database adapter
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const db = {
  User: {
    findOne: async (query) => {
      try {
        let queryBuilder = supabase.from('users').select('*');

        if (query.$or) {
          // Handle OR queries (for email or username)
          const conditions = query.$or;
          const { data, error } = await queryBuilder;
          
          if (error) throw error;
          
          for (const condition of conditions) {
            const user = data.find(
              u => u.email === condition.email || u.username === condition.username
            );
            if (user) return user;
          }
          return null;
        } else if (query.email) {
          const { data, error } = await queryBuilder.eq('email', query.email);
          if (error) throw error;
          return data && data.length > 0 ? data[0] : null;
        } else if (query.username) {
          const { data, error } = await queryBuilder.eq('username', query.username);
          if (error) throw error;
          return data && data.length > 0 ? data[0] : null;
        }
        return null;
      } catch (error) {
        console.error('Error in User.findOne:', error);
        throw error;
      }
    },

    create: async (data) => {
      try {
        const userData = {
          username: data.username,
          email: data.email,
          password: data.password,
          full_name: data.fullName,
          avatar: data.avatar || null,
          region: data.region || 'US',
          language: data.language || 'en',
          is_active: true,
          created_at: new Date().toISOString(),
          last_login: null
        };

        const { data: user, error } = await supabase
          .from('users')
          .insert([userData])
          .select()
          .single();

        if (error) throw error;
        return user;
      } catch (error) {
        console.error('Error in User.create:', error);
        throw error;
      }
    },

    findById: async (id) => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (error && error.code === 'PGRST116') return null; // No rows returned
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in User.findById:', error);
        throw error;
      }
    },

    update: async (id, updates) => {
      try {
        const updateData = {};
        if (updates.fullName) updateData.full_name = updates.fullName;
        if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
        if (updates.language) updateData.language = updates.language;
        if (updates.region) updateData.region = updates.region;
        if (updates.lastLogin) updateData.last_login = updates.lastLogin;

        const { data, error } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in User.update:', error);
        throw error;
      }
    }
  },

  Conversation: {
    find: async (query) => {
      try {
        let queryBuilder = supabase.from('conversations').select('*');

        if (query.userId) {
          queryBuilder = queryBuilder.eq('user_id', query.userId);
        }
        if (query.isCrisisSession !== undefined) {
          queryBuilder = queryBuilder.eq('is_crisis_session', query.isCrisisSession);
        }
        if (query.startedAt && query.startedAt.$gte) {
          queryBuilder = queryBuilder.gte('started_at', query.startedAt.$gte);
        }

        const { data, error } = await queryBuilder;
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error in Conversation.find:', error);
        throw error;
      }
    },

    create: async (data) => {
      try {
        const convData = {
          user_id: data.userId,
          messages: data.messages || [],
          is_crisis_session: data.isCrisisSession || false,
          crisis_alert: data.crisisAlert || null,
          suggested_strategies: data.suggestedStrategies || [],
          session_summary: data.session_summary || null,
          started_at: new Date().toISOString(),
          ended_at: null
        };

        const { data: conversation, error } = await supabase
          .from('conversations')
          .insert([convData])
          .select()
          .single();

        if (error) throw error;
        return conversation;
      } catch (error) {
        console.error('Error in Conversation.create:', error);
        throw error;
      }
    },

    findById: async (id) => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .eq('id', id)
          .single();

        if (error && error.code === 'PGRST116') return null;
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in Conversation.findById:', error);
        throw error;
      }
    },

    updateMessages: async (id, messages) => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .update({ messages })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in Conversation.updateMessages:', error);
        throw error;
      }
    },

    updateCrisisAlert: async (id, crisisAlert, isCrisisSession) => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .update({
            crisis_alert: crisisAlert,
            is_crisis_session: isCrisisSession
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in Conversation.updateCrisisAlert:', error);
        throw error;
      }
    },

    updateSuggestedStrategies: async (id, strategies) => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .update({ suggested_strategies: strategies })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in Conversation.updateSuggestedStrategies:', error);
        throw error;
      }
    },

    updateSessionSummary: async (id, summary) => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .update({ session_summary: summary, ended_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in Conversation.updateSessionSummary:', error);
        throw error;
      }
    }
  },

  MoodEntry: {
    find: async (query) => {
      try {
        let queryBuilder = supabase.from('mood_entries').select('*');

        if (query.userId) {
          queryBuilder = queryBuilder.eq('user_id', query.userId);
        }
        if (query.date && query.date.$gte) {
          queryBuilder = queryBuilder.gte('date', query.date.$gte);
        }
        if (query.date && query.date.$lte) {
          queryBuilder = queryBuilder.lte('date', query.date.$lte);
        }

        const { data, error } = await queryBuilder;
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error in MoodEntry.find:', error);
        throw error;
      }
    },

    create: async (data) => {
      try {
        const entryData = {
          user_id: data.userId,
          mood_score: data.moodScore,
          emotion: data.emotion,
          activities: data.activities || [],
          notes: data.notes || null,
          triggers: data.triggers || [],
          coping_strategies_used: data.copingStrategiesUsed || [],
          sleep_quality: data.sleepQuality || null,
          physical_activity: data.physicalActivity || false,
          meal_times: data.mealTimes || null,
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
        };

        const { data: entry, error } = await supabase
          .from('mood_entries')
          .insert([entryData])
          .select()
          .single();

        if (error) throw error;
        return entry;
      } catch (error) {
        console.error('Error in MoodEntry.create:', error);
        throw error;
      }
    },

    findById: async (id) => {
      try {
        const { data, error } = await supabase
          .from('mood_entries')
          .select('*')
          .eq('id', id)
          .single();

        if (error && error.code === 'PGRST116') return null;
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error in MoodEntry.findById:', error);
        throw error;
      }
    }
  }
};

module.exports = { supabase, db };
